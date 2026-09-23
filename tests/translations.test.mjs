import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const MASTER_FR_SHA256 = "da7fe2d227597c6e2cd5f35f32118158618fcce1d9c377264ab8255d824ffd45";

async function loadTypeScriptModule(path) {
  const source = await readFile(path, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

function shape(value) {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, shape(child)]));
  }
  return typeof value;
}

function collectStrings(value, strings = []) {
  if (typeof value === "string") strings.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, strings));
  else if (value && typeof value === "object") Object.values(value).forEach((item) => collectStrings(item, strings));
  return strings;
}

test("le contenu français maître reste strictement intact", async () => {
  const source = await readFile("src/content/fr.ts");
  assert.equal(createHash("sha256").update(source).digest("hex"), MASTER_FR_SHA256);
});

test("PL, PT et AR gardent exactement la structure métier française", async () => {
  const { fr, frCopy } = await loadTypeScriptModule("src/content/fr.ts");
  const targets = [
    ["PL", "pl", "plCopy", "ltr"],
    ["PT", "pt", "ptCopy", "ltr"],
    ["AR", "ar", "arCopy", "rtl"],
  ];

  for (const [code, exportName, copyName, direction] of targets) {
    const module = await loadTypeScriptModule(`src/content/${exportName}.ts`);
    const content = module[exportName];
    const copy = module[copyName];

    assert.equal(content.code, code);
    assert.equal(content.direction, direction);
    assert.deepEqual(content.themes.map(({ id }) => id), fr.themes.map(({ id }) => id));
    assert.deepEqual(content.themes.map(({ number }) => number), fr.themes.map(({ number }) => number));
    assert.deepEqual(content.themes.map(({ color }) => color), fr.themes.map(({ color }) => color));
    assert.deepEqual(content.themes.map(({ available }) => available), fr.themes.map(({ available }) => available));
    assert.deepEqual(content.themes.map(({ sections }) => sections?.length), fr.themes.map(({ sections }) => sections?.length));
    assert.deepEqual(content.quizQuestions.map(({ correct }) => correct), fr.quizQuestions.map(({ correct }) => correct));
    assert.deepEqual(content.quizQuestions.map(({ answers }) => answers.length), fr.quizQuestions.map(({ answers }) => answers.length));
    assert.equal(content.essentialReflexes.length, fr.essentialReflexes.length);
    assert.deepEqual(shape(copy), shape(frCopy));
    assert.equal(collectStrings({ content, copy }).some((text) => text.trim() === ""), false);
  }
});
