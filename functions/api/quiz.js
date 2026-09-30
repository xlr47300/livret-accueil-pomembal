// Same-origin proxy: the Apps Script URL is a Cloudflare server environment variable.
export async function onRequest({ request, env }) {
  const reply = (data, status = 200) => new Response(JSON.stringify(data), {
    status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
  });
  if (!['GET', 'POST'].includes(request.method)) return reply({ ok: false, error: 'METHOD' }, 405);
  const target = env.APPS_SCRIPT_URL;
  if (!target || !/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(target)) {
    return reply({ ok: false, error: 'CONFIGURATION' }, 503);
  }
  try {
    const url = new URL(target);
    let body;
    if (request.method === 'GET') {
      const params = new URL(request.url).searchParams;
      if (!['listQuizzes', 'getQuiz'].includes(params.get('action'))) return reply({ ok: false, error: 'ACTION' }, 400);
      for (const key of ['action', 'language', 'quizId', 'version']) {
        if (params.has(key)) url.searchParams.set(key, params.get(key));
      }
    } else {
      const origin = request.headers.get('Origin');
      if (origin && origin !== new URL(request.url).origin) return reply({ ok: false, error: 'ORIGIN' }, 403);
      body = await request.text();
      if (body.length > 250000) return reply({ ok: false, error: 'SIZE' }, 413);
      const parsed = JSON.parse(body);
      if (parsed.action !== 'submitAttempt') return reply({ ok: false, error: 'ACTION' }, 400);
    }
    const upstream = await fetch(url.toString(), {
      method: request.method, redirect: 'follow',
      headers: body ? { 'Content-Type': 'text/plain;charset=utf-8' } : undefined,
      body, signal: AbortSignal.timeout(55000)
    });
    if (!upstream.ok) throw new Error('UPSTREAM');
    const data = await upstream.json();
    if (typeof data.ok !== 'boolean') throw new Error('INVALID_RESPONSE');
    return reply(data, data.ok ? 200 : 400);
  } catch {
    return reply({ ok: false, error: 'NETWORK' }, 502);
  }
}
