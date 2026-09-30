import type { LanguageCode } from '../content';
type Labels = { title:string; description:string; loading:string; empty:string; error:string; retry:string;
  name:string; pseudo:string; start:string; next:string; submit:string; restart:string; finish:string;
  valid:string; review:string; saved:string; saving:string; failed:string; pending:string; localError:string;
  provisional:string; choose:string; attempt:string; back:string; correct:string; position:(n:number,total:number)=>string };
export const dynamicCopy: Record<LanguageCode, Labels> = {
  FR: { title:'Quiz & évaluations', description:'Testez vos connaissances et validez vos acquis.', loading:'Chargement…',
    empty:'Aucun quiz disponible dans cette langue pour le moment.', error:'Impossible de charger les quiz. Réessayez dans un instant.',
    retry:'Réessayer l’enregistrement', name:'Nom et prénom', pseudo:'Pseudo', start:'Commencer', next:'Suivant', submit:'Voir mon résultat',
    restart:'Recommencer', finish:'Terminer', valid:'Validé', review:'À revoir', saved:'Tentative enregistrée.', saving:'Enregistrement en cours…',
    failed:'Enregistrement impossible. Vos réponses sont conservées sur cet appareil.', pending:'Tentatives à enregistrer',
    localError:'Le stockage local est indisponible ou plein. Vos réponses restent ouvertes ici. Autorisez le stockage avant de terminer.',
    provisional:'Résultat provisoire, en attente d’enregistrement.', choose:'Choisissez une réponse.', attempt:'Tentative', back:'Retour aux quiz',
    correct:'Bonnes réponses', position:(n,total)=>`Question ${n} sur ${total}` },
  PL: { title:'Quizy i oceny', description:'Sprawdź swoją wiedzę i potwierdź zdobyte umiejętności.', loading:'Ładowanie…',
    empty:'Na razie nie ma quizów dostępnych w tym języku.', error:'Nie można wczytać quizów. Spróbuj ponownie za chwilę.',
    retry:'Ponów zapis', name:'Imię i nazwisko', pseudo:'Pseudonim', start:'Rozpocznij', next:'Dalej', submit:'Zobacz wynik',
    restart:'Spróbuj ponownie', finish:'Zakończ', valid:'Zaliczone', review:'Do powtórzenia', saved:'Próba została zapisana.', saving:'Zapisywanie…',
    failed:'Nie udało się zapisać. Odpowiedzi są zachowane na tym urządzeniu.', pending:'Próby oczekujące na zapis',
    localError:'Pamięć lokalna jest niedostępna lub pełna. Odpowiedzi pozostają na ekranie. Włącz pamięć przed zakończeniem.',
    provisional:'Wynik tymczasowy, oczekuje na zapis.', choose:'Wybierz jedną odpowiedź.', attempt:'Próba', back:'Powrót do quizów',
    correct:'Prawidłowe odpowiedzi', position:(n,total)=>`Pytanie ${n} z ${total}` },
  PT: { title:'Questionários e avaliações', description:'Teste os seus conhecimentos e confirme o que aprendeu.', loading:'A carregar…',
    empty:'Ainda não existem questionários disponíveis neste idioma.', error:'Não foi possível carregar os questionários. Tente novamente dentro de instantes.',
    retry:'Tentar guardar novamente', name:'Nome e apelido', pseudo:'Pseudónimo', start:'Começar', next:'Seguinte', submit:'Ver o meu resultado',
    restart:'Recomeçar', finish:'Terminar', valid:'Aprovado', review:'A rever', saved:'Tentativa guardada.', saving:'A guardar…',
    failed:'Não foi possível guardar. As respostas estão conservadas neste dispositivo.', pending:'Tentativas por guardar',
    localError:'O armazenamento local está indisponível ou cheio. As respostas continuam abertas aqui. Ative o armazenamento antes de terminar.',
    provisional:'Resultado provisório, a aguardar gravação.', choose:'Escolha uma resposta.', attempt:'Tentativa', back:'Voltar aos questionários',
    correct:'Respostas corretas', position:(n,total)=>`Pergunta ${n} de ${total}` },
  AR: { title:'الاختبارات والتقييمات', description:'اختبر معلوماتك وتأكد مما تعلمته.', loading:'جارٍ التحميل…',
    empty:'لا توجد اختبارات متاحة بهذه اللغة حاليًا.', error:'تعذر تحميل الاختبارات. حاول مجددًا بعد قليل.',
    retry:'إعادة محاولة الحفظ', name:'الاسم الكامل', pseudo:'اسم مستعار', start:'ابدأ', next:'التالي', submit:'عرض نتيجتي',
    restart:'إعادة الاختبار', finish:'إنهاء', valid:'ناجح', review:'بحاجة إلى مراجعة', saved:'تم حفظ المحاولة.', saving:'جارٍ الحفظ…',
    failed:'تعذر الحفظ. إجاباتك محفوظة على هذا الجهاز.', pending:'محاولات بانتظار الحفظ',
    localError:'التخزين المحلي غير متاح أو ممتلئ. تبقى إجاباتك مفتوحة هنا. فعّل التخزين قبل الإنهاء.',
    provisional:'نتيجة مؤقتة بانتظار الحفظ.', choose:'اختر إجابة واحدة.', attempt:'المحاولة', back:'العودة إلى الاختبارات',
    correct:'الإجابات الصحيحة', position:(n,total)=>`السؤال ${n} من ${total}` }
};
