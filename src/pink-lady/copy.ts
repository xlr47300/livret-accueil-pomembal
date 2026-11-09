import type { LanguageCode } from "../content";

type Lesson = readonly [title: string, status: string, text: string, firstPhoto: string, secondPhoto?: string];

type ModuleCopy = {
  card: string;
  subtitle: string;
  title: string;
  previous: string;
  next: string;
  finish: string;
  step: string;
  lessons: readonly Lesson[];
};

export const photos = [
  ["carte-8"],
  ["coloration"],
  ["pourriture", "scald"],
  ["carte-4", "machure"],
  ["cracking", "piqure-evolutive"],
  ["carte-36", "boisage"],
  ["grele", "russeting"],
  ["fruit-sale"],
  ["carte-8", "carte-4"],
  ["fente"],
] as const;

export const pinkLadyCopy: Record<LanguageCode, ModuleCopy> = {
  FR: {
    card: "Formation Pink Lady®",
    subtitle: "Reconnaître les principaux défauts et appliquer les critères de conditionnement.",
    title: "Pink Lady® – Reconnaître les défauts de conditionnement",
    previous: "Précédent", next: "Suivant", finish: "Retour au portail", step: "Étape",
    lessons: [
      ["Pourquoi bien trier ?", "Conforme sur cet exemple", "Un tri homogène aide à garantir la conformité des fruits conditionnés. Avant de décider, examinez la coloration, l’état de la peau et la propreté du fruit.", "Carte 8 du jeu n° 1 · aucun défaut"],
      ["Vérifier la coloration", "Coloration insuffisante à écarter", "Sur la face la plus colorée, l’intensité I4 doit couvrir au moins 40 % de cette face. Pour Finest, le minimum est de 50 %. Comparez avec le repère I4 au poste de tri.", "Exemple du guide · coloration insuffisante"],
      ["Pourriture et scald", "Défauts majeurs à écarter", "Écartez un fruit présentant de la pourriture ou du scald dès que le défaut est visible, quelle que soit sa taille. Le guide prévoit des règles spécifiques pour la tavelure, la fumagine et l’échaudure pédonculaire.", "Pourriture", "Scald · brunissement de la peau"],
      ["Repérer les blessures", "Défauts majeurs à écarter", "Écartez les fruits percés et les fruits avec un coup profond. Une mâchure brune est également à écarter, quelle que soit sa taille.", "Carte 4 du jeu n° 1 · fruit percé", "Mâchure brune"],
      ["Fentes et piqûres évolutives", "Défauts majeurs à écarter", "Écartez le fruit en présence d’une fente profonde, d’un cracking laissant apparaître la chair ou d’une piqûre évolutive.", "Cracking avec chair apparente", "Piqûre évolutive"],
      ["Appliquer la limite du défaut", "Défauts mineurs tolérés sous conditions", "Le guide fixe un maximum de 1 cm² pour un coup léger, de 1 cm² pour le boisage et de 3 mm pour une piqûre sèche. Au-delà de la limite du défaut observé, écartez le fruit.", "Carte 36 du jeu n° 1 · piqûre sèche admise sur cet exemple", "Boisage · exemple hors cahier des charges"],
      ["Reconnaître les défauts d’aspect à écarter", "Défauts mineurs non admis", "Écartez les exemples du guide avec un impact de grêle proéminent, du russeting pédonculaire sur la joue ou une déformation importante. Les griffures ont leur propre limite de 3 maximum.", "Impact de grêle proéminent", "Russeting pédonculaire sur la joue"],
      ["Contrôler la propreté", "Fruit sale à écarter", "Écartez les fruits avec de la terre, du calcaire, un cocon ou un autre corps étranger. Regardez aussi autour du pédoncule et dans la cavité opposée.", "Fruit sale · exemple du guide"],
      ["S’exercer avec le formateur", "Activité en salle de conditionnement", "Sur le tableau, classez les cartes en distinguant les fruits conformes, les défauts mineurs admis et les fruits à écarter. Expliquez votre décision. Le formateur reprend les réponses avec le groupe à l’aide du corrigé du jeu utilisé, n° 1 ou n° 2.", "Carte 8 du jeu n° 1 · conforme", "Carte 4 du jeu n° 1 · à écarter"],
      ["Le réflexe au poste de tri", "En cas de doute, demander un avis", "Vérifiez la coloration, les défauts et la propreté. Appliquez la limite propre au défaut mineur observé. Si vous hésitez, mettez le fruit de côté et vérifiez le guide affiché avec le formateur ou le responsable.", "Fente profonde · fruit à écarter"],
    ],
  },
  PT: {
    card: "Formação Pink Lady®",
    subtitle: "Reconhecer os principais defeitos e aplicar os critérios de acondicionamento.",
    title: "Pink Lady® – Reconhecer os defeitos no acondicionamento",
    previous: "Anterior", next: "Seguinte", finish: "Voltar ao portal", step: "Etapa",
    lessons: [
      ["Porquê selecionar bem?", "Conforme neste exemplo", "Uma seleção uniforme ajuda a garantir a conformidade dos frutos acondicionados. Antes de decidir, observe a coloração, o estado da casca e a limpeza do fruto.", "Carta 8 do jogo n.º 1 · sem defeitos"],
      ["Verificar a coloração", "Excluir frutos com coloração insuficiente", "Na face mais corada, a intensidade I4 deve abranger pelo menos 40 % dessa face. Para Finest, o mínimo é 50 %. Compare com a referência I4 no posto de seleção.", "Exemplo do guia · coloração insuficiente"],
      ["Podridão e escaldão superficial", "Excluir por defeito grave", "Exclua os frutos com podridão ou escaldão superficial assim que o defeito for visível, independentemente do tamanho. O guia prevê regras específicas para o pedrado, a fumagina e o escaldão peduncular.", "Podridão", "Escaldão superficial · acastanhamento da casca"],
      ["Identificar lesões", "Excluir por defeito grave", "Exclua os frutos perfurados ou com uma pancada profunda. Exclua também os que apresentem uma nódoa castanha, independentemente do tamanho.", "Carta 4 do jogo n.º 1 · fruto perfurado", "Nódoa castanha"],
      ["Fendas e picadas que evoluem", "Excluir por defeito grave", "Exclua o fruto se apresentar uma fenda profunda, uma fissura com polpa exposta ou uma picada que evolui.", "Fissura com polpa exposta", "Picada que evolui"],
      ["Aplicar o limite de cada defeito", "Defeitos ligeiros aceites sob condições", "O guia fixa um máximo de 1 cm² para uma pancada ligeira, 1 cm² para uma zona de cortiça superficial e 3 mm para uma picada seca. Exclua o fruto se ultrapassar o limite do defeito observado.", "Carta 36 do jogo n.º 1 · picada seca aceite neste exemplo", "Zona de cortiça superficial · exemplo fora da especificação"],
      ["Reconhecer defeitos de aspeto a excluir", "Defeitos ligeiros não aceites", "Exclua os exemplos do guia com uma marca saliente de granizo, russeting peduncular que se estende à face lateral ou deformação acentuada. Para os riscos, o limite é de 3.", "Marca saliente de granizo", "Russeting peduncular na face lateral"],
      ["Verificar a limpeza", "Excluir frutos sujos", "Exclua os frutos com terra, calcário, casulos ou outros corpos estranhos. Observe também a zona do pedúnculo e a cavidade oposta.", "Fruto sujo · exemplo do guia"],
      ["Praticar com o formador", "Atividade na sala de acondicionamento", "No quadro, separe as cartas dos frutos conformes, dos defeitos ligeiros aceites e dos frutos a excluir. Explique a sua decisão. O formador revê as respostas com o grupo usando a ficha de correção do jogo n.º 1 ou n.º 2.", "Carta 8 do jogo n.º 1 · conforme", "Carta 4 do jogo n.º 1 · a excluir"],
      ["O que fazer no posto de seleção", "Em caso de dúvida, peça ajuda", "Verifique a coloração, os defeitos e a limpeza. Aplique o limite do defeito ligeiro observado. Em caso de dúvida, ponha o fruto de lado e consulte o guia afixado com o formador ou o responsável.", "Fenda profunda · fruto a excluir"],
    ],
  },
  PL: {
    card: "Szkolenie Pink Lady®",
    subtitle: "Rozpoznawanie głównych wad i stosowanie kryteriów pakowania.",
    title: "Pink Lady® – Rozpoznawanie wad przy pakowaniu",
    previous: "Wstecz", next: "Dalej", finish: "Powrót do portalu", step: "Etap",
    lessons: [
      ["Dlaczego dokładnie sortujemy?", "Przykład owocu zgodnego", "Jednolite sortowanie pomaga zapewnić zgodność pakowanych owoców. Przed decyzją sprawdź wybarwienie, stan skórki i czystość owocu.", "Karta 8 z gry nr 1 · brak wad"],
      ["Sprawdź wybarwienie", "Odrzuć owoce o niedostatecznym wybarwieniu", "Po najbardziej wybarwionej stronie owocu intensywność I4 musi obejmować co najmniej 40% tej strony. Dla Finest minimum to 50%. Porównaj z wzorcem I4 na stanowisku sortowania.", "Przykład z przewodnika · niedostateczne wybarwienie"],
      ["Zgnilizna i oparzelizna powierzchniowa", "Wady poważne wymagające odrzucenia", "Odrzuć owoce, gdy tylko zauważysz zgniliznę lub oparzeliznę powierzchniową, niezależnie od wielkości zmiany. Dla parcha, sadzaków i oparzelizny przy szypułce przewodnik podaje osobne zasady.", "Zgnilizna", "Oparzelizna powierzchniowa · brunatnienie skórki"],
      ["Rozpoznaj uszkodzenia", "Wady poważne wymagające odrzucenia", "Odrzuć owoce z przebitą skórką lub głębokim obiciem. Odrzuć także owoce z brunatnym odgnieceniem, niezależnie od jego wielkości.", "Karta 4 z gry nr 1 · przebita skórka", "Brunatne odgniecenie"],
      ["Pęknięcia i postępujące nakłucia", "Wady poważne wymagające odrzucenia", "Odrzuć owoc z głębokim pęknięciem, pęknięciem odsłaniającym miąższ lub postępującą zmianą w miejscu nakłucia.", "Pęknięcie z widocznym miąższem", "Postępująca zmiana w miejscu nakłucia"],
      ["Sprawdź limit dla danej wady", "Drobne wady dopuszczalne warunkowo", "Przewodnik określa maksymalnie 1 cm² dla lekkiego obicia, 1 cm² dla skorkowacenia i 3 mm dla suchego nakłucia. Odrzuć owoc, jeśli wada przekracza właściwy limit.", "Karta 36 z gry nr 1 · suche nakłucie dopuszczalne w tym przykładzie", "Skorkowacenie · przykład niezgodny z wymaganiami"],
      ["Rozpoznaj niedopuszczalne wady wyglądu", "Drobne wady niedopuszczalne", "Odrzuć owoce z wypukłym śladem po gradzie, ordzawieniem od szypułki sięgającym boku owocu lub znaczną deformacją, jak w przykładach z przewodnika. Dopuszczalne są maksymalnie 3 rysy.", "Wypukły ślad po gradzie", "Ordzawienie od szypułki sięgające boku owocu"],
      ["Sprawdź czystość", "Odrzuć brudne owoce", "Odrzuć owoce z ziemią, osadem wapiennym, kokonem lub innym ciałem obcym. Sprawdź też zagłębienie przy szypułce i zagłębienie po przeciwnej stronie.", "Brudny owoc · przykład z przewodnika"],
      ["Ćwicz z prowadzącym", "Ćwiczenie w hali pakowania", "Ułóż karty na tablicy według kategorii: owoce zgodne, dopuszczalne drobne wady i owoce do odrzucenia. Uzasadnij decyzję. Prowadzący omawia odpowiedzi z grupą według klucza do gry nr 1 lub nr 2.", "Karta 8 z gry nr 1 · owoc zgodny", "Karta 4 z gry nr 1 · owoc do odrzucenia"],
      ["Postępowanie przy sortowaniu", "W razie wątpliwości zapytaj", "Sprawdź wybarwienie, wady i czystość. Zastosuj limit właściwy dla zauważonej drobnej wady. W razie wątpliwości odłóż owoc i sprawdź wywieszony przewodnik z prowadzącym lub osobą odpowiedzialną.", "Głębokie pęknięcie · owoc do odrzucenia"],
    ],
  },
  AR: {
    card: "تدريب Pink Lady®",
    subtitle: "التعرّف على العيوب الرئيسية وتطبيق معايير التعبئة.",
    title: "Pink Lady® – التعرّف على عيوب الثمار عند التعبئة",
    previous: "السابق", next: "التالي", finish: "العودة إلى البوابة", step: "الخطوة",
    lessons: [
      ["لماذا نفرز الثمار بعناية؟", "مثال على ثمرة مطابقة", "يساعد الفرز الموحّد على ضمان مطابقة الثمار المعبّأة للمواصفات. قبل اتخاذ القرار، افحص لون الثمرة وحالة قشرتها ونظافتها.", "البطاقة ٨ من اللعبة الأولى · ثمرة بلا عيوب"],
      ["افحص التلوّن", "استبعد الثمار غير الكافية التلوّن", "يجب أن تغطي شدة اللون I4 ما لا يقل عن ٤٠٪ من مساحة الجانب الأكثر تلوّناً. الحد الأدنى لفئة Finest هو ٥٠٪. قارن اللون بالمرجع I4 في محطة الفرز.", "مثال من الدليل · تلوّن غير كافٍ"],
      ["التعفّن ولفحة القشرة", "عيوب جسيمة تستوجب الاستبعاد", "استبعد الثمرة فور ظهور التعفّن أو لفحة القشرة مهما كان حجم الإصابة. يحدد الدليل قواعد خاصة لجرب التفاح والعفن الهبابي واللفحة حول العنق.", "تعفّن", "لفحة سطحية · اسمرار القشرة"],
      ["تعرّف على الجروح", "عيوب جسيمة تستوجب الاستبعاد", "استبعد الثمار المثقوبة أو المصابة برضّة عميقة. استبعد أيضاً أي ثمرة فيها كدمة بنّية مهما كان حجمها.", "البطاقة ٤ من اللعبة الأولى · ثمرة مثقوبة", "كدمة بنّية"],
      ["الشقوق والوخزات المتفاقمة", "عيوب جسيمة تستوجب الاستبعاد", "استبعد الثمرة إذا وجدت شقاً عميقاً أو تشققاً يكشف اللب أو وخزة يتفاقم أثرها.", "تشقق يكشف اللب", "وخزة يتفاقم أثرها"],
      ["طبّق الحد الخاص بكل عيب", "عيوب طفيفة مقبولة بشروط", "الحد الأقصى في الدليل هو ١ سم² للرضّة الخفيفة و١ سم² للبقعة الفلّينية و٣ مم للوخزة الجافة. استبعد الثمرة إذا تجاوز العيب الحد الخاص به.", "البطاقة ٣٦ من اللعبة الأولى · وخزة جافة مقبولة في هذا المثال", "بقعة فلّينية · مثال غير مطابق للمواصفات"],
      ["تعرّف على عيوب المظهر المرفوضة", "عيوب طفيفة غير مقبولة", "استبعد الأمثلة الواردة في الدليل التي فيها أثر بارز لحبّات البَرَد أو خشونة ممتدّة من العنق إلى جانب الثمرة أو تشوّه واضح. الحد الأقصى للخدوش هو ٣.", "أثر بارز لحبّات البَرَد", "خشونة ممتدّة من العنق إلى جانب الثمرة"],
      ["افحص نظافة الثمرة", "ثمرة متّسخة يجب استبعادها", "استبعد الثمار التي عليها تراب أو ترسّبات كلسية أو شرنقة أو جسم غريب آخر. افحص أيضاً المنطقة حول العنق والتجويف المقابل له.", "ثمرة متّسخة · مثال من الدليل"],
      ["تدرّب مع المدرّب", "نشاط في قاعة التعبئة", "صنّف البطاقات على اللوحة إلى ثمار مطابقة وعيوب طفيفة مقبولة وثمار يجب استبعادها. اشرح سبب قرارك. يراجع المدرّب الإجابات مع المجموعة باستخدام ورقة تصحيح اللعبة الأولى أو الثانية.", "البطاقة ٨ من اللعبة الأولى · ثمرة مطابقة", "البطاقة ٤ من اللعبة الأولى · ثمرة يجب استبعادها"],
      ["طريقة العمل في محطة الفرز", "اطلب رأياً عند الشكّ", "افحص التلوّن والعيوب والنظافة. طبّق الحد الخاص بالعيب الطفيف الذي تراه. عند الشكّ، ضع الثمرة جانباً وراجع الدليل المعلّق مع المدرّب أو المسؤول.", "شقّ عميق · ثمرة يجب استبعادها"],
    ],
  },
};
