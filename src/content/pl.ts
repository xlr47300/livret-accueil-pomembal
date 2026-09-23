import type { LocaleContent } from "./types";

export const plCopy = {
  header: { back: "Wstecz", language: "Zmień język", progress: "Postęp ogólny" },
  welcome: {
    kicker: "Szkolenie obowiązkowe",
    title: "Higiena i bezpieczeństwo",
    subtitle: "Dobre nawyki chroniące owoce, współpracowników i konsumentów.",
    duration: "Około 10–15 minut",
    start: "Rozpocznij",
  },
  languages: {
    kicker: "Witamy",
    title: "Wybierz język",
    intro: "Wybierz język szkolenia.",
    available: "Dostępny",
    soon: "Wkrótce dostępny",
    note: "Wszystkie cztery języki są dostępne.",
  },
  themes: {
    kicker: "Najważniejsze zasady",
    title: "8 tematów",
    intro: "Ucz się we własnym tempie. W każdej chwili możesz wrócić do tematu lub ponownie przeczytać zasadę.",
    notStarted: "Nierozpoczęty",
    inProgress: "W toku · Kontynuuj",
    completed: "Ukończony · Powtórz",
    coming: "Wkrótce",
    quizTitle: "Quiz z dobrych nawyków",
    quizMeta: "8 pytań · natychmiastowa odpowiedź",
    quizButton: "Sprawdź swoją wiedzę",
  },
  theme: {
    kicker: "Najważniejsza zasada",
    understood: "Rozumiem",
    backToThemes: "Wróć do 8 tematów",
    completed: "Temat zrozumiany",
    next: "Przejdź do następnego tematu",
    quiz: "Przejdź do quizu końcowego",
  },
  quiz: {
    question: "Pytanie",
    choose: "Wybierz prawidłową odpowiedź",
    correct: "Prawidłowa odpowiedź",
    incorrect: "Nie całkiem",
    next: "Następne pytanie",
    finish: "Zobacz podsumowanie",
  },
  recap: {
    kicker: "Szkolenie ukończone",
    title: "Znasz już właściwe zasady.",
    subtitle: "Pamiętaj o tych prostych zasadach przy każdym rozpoczęciu pracy.",
    remember: "Zapamiętaj",
    reflexes: "8 najważniejszych zasad",
    motto: "WIDZĘ.\nDZIAŁAM.\nZGŁASZAM.",
    doubt: "Masz wątpliwości? Nie improwizuj.",
    ask: "Zapytaj przełożonego.",
    review: "Powtórz zasady",
    themes: "Wróć do 8 tematów",
  },
};

export const pl: LocaleContent = {
  code: "PL",
  direction: "ltr",
  themes: [
    {
      id: "entree", number: "01", title: "Przed wejściem", description: "Bądź czysty, odpowiednio wyposażony i gotowy.", color: "green", available: true,
      image: "/images/tenue.png", imageAlt: "Pracownica w czystym fartuchu i z całkowicie zakrytymi włosami",
      sections: [
        { eyebrow: "Odzież robocza", title: "Czysta. Kompletna. Zapięta.", items: ["Czysty, kompletny, zapięty i odpowiedni fartuch", "Włosy całkowicie zakryte", "Czyste, zakryte i odpowiednie obuwie"] },
        { eyebrow: "Bezpieczne dłonie", title: "Usuń wszystko, co może zanieczyścić produkt", items: ["Krótkie, czyste i naturalne paznokcie", "Bez lakieru i sztucznych paznokci", "Bez biżuterii, z wyjątkiem prostej obrączki", "Zegarki i bransoletki są zabronione"] },
        { eyebrow: "Rzeczy osobiste", title: "Odłóż telefon", statement: "Telefony są zabronione w hali sortowni i w warsztacie.", tone: "navy" },
        { eyebrow: "Fartuch", title: "Zdejmij go poza produkcją", items: ["Toaleta, przerwa i palarnia: zdejmij fartuch", "Załóż go ponownie przed powrotem na produkcję", "Pierz w temperaturze co najmniej 60°C, minimum raz w tygodniu"] },
      ],
    },
    {
      id: "mains", number: "02", title: "Czyste ręce", description: "Prawidłowe mycie we właściwym czasie.", color: "teal", available: true,
      image: "/images/lavage-mains.png", imageAlt: "Pracownica myjąca ręce przy umywalce w sortowni",
      sections: [
        { eyebrow: "Przed", title: "Umyj ręce", items: ["Po przyjściu na produkcję", "Przy każdym powrocie do pracy", "Przed każdym kontaktem z owocami"] },
        { eyebrow: "Po", title: "Umyj ręce ponownie", items: ["Po toalecie, posiłku lub papierosie", "Po wydmuchaniu nosa lub kontakcie z odpadami", "Po kontakcie z brudną powierzchnią lub czynności powodującej zanieczyszczenie"] },
        { eyebrow: "Jak?", title: "Postępuj zgodnie z wywieszoną instrukcją", items: ["Wykonaj wszystkie etapy mycia rąk", "Osusz ręce jednorazowym ręcznikiem papierowym", "Nie dezynfekuj rąk rutynowo"] },
        { eyebrow: "Rękawice", title: "Nie noś ich rutynowo", items: ["Używaj wyłącznie rękawic Pomembal", "Nie używaj własnych rękawic", "Rękawice nigdy nie zastępują mycia rąk"], tone: "navy" },
      ],
    },
    {
      id: "sante", number: "03", title: "Zdrowie i skaleczenia", description: "Zgłoś problem, zanim dojdzie do zanieczyszczenia.", color: "red", available: true,
      sections: [
        { eyebrow: "Skaleczenie", title: "Zgłoś natychmiast", items: ["Użyj wykrywalnego niebieskiego plastra", "Plaster nie oznacza, że rękawica jest zawsze obowiązkowa"], tone: "warning" },
        { eyebrow: "Objawy", title: "Zgłoś je przed każdym kontaktem", items: ["Choroba zakaźna lub gorączka", "Biegunka lub wymioty", "Zakażona rana lub nietypowa wydzielina"] },
        { eyebrow: "Leki", title: "Tylko w pomieszczeniu socjalnym", statement: "Nie wolno wnosić leków do hali sortowni ani do warsztatu.", tone: "navy" },
        { eyebrow: "Wypadek lub zasłabnięcie", title: "Alarmuj natychmiast", statement: "Powiadom liderkę zespołu, jej zastępczynię SST lub przełożonego." },
      ],
    },
    {
      id: "allergenes", number: "04", title: "Posiłki i alergeny", description: "Na produkcji nie wolno jeść ani pić.", color: "orange", available: true,
      sections: [
        { eyebrow: "Na produkcji", title: "Nic nie jedz ani nie pij", items: ["Zakaz jedzenia i picia", "Zakaz cukierków i gumy do żucia"], tone: "warning" },
        { eyebrow: "Przerwa", title: "Tylko w pomieszczeniu socjalnym", statement: "Przed jedzeniem lub piciem zdejmij fartuch." },
        { eyebrow: "Alergeny", title: "Ryzyko pochodzi z zewnątrz", items: ["Pomembal pakuje jabłka", "W procesie nie wykorzystuje się żadnych alergenów spożywczych", "Nie wnoś żadnej żywności do strefy produkcji"] },
        { eyebrow: "Przed powrotem", title: "Wróć bez żadnych produktów", items: ["Załóż ponownie fartuch", "Umyj ręce"], tone: "navy" },
      ],
    },
    {
      id: "fruits", number: "05", title: "Chroń owoce", description: "Zapobiegaj, izoluj, zgłaszaj.", color: "orange", available: true,
      sections: [
        { eyebrow: "Drobne wyposażenie", title: "Tylko sprzęt Pomembal", items: ["Długopisy, noże i nożyczki muszą być ponumerowane i ujęte w ewidencji", "Nie używaj własnych zamienników"] },
        { eyebrow: "Przedmiot zgubiony lub uszkodzony", title: "Zgłoś. Odszukaj. Zabezpiecz.", statement: "Każdy niekompletny przedmiot należy natychmiast zgłosić.", tone: "warning" },
        { eyebrow: "Szkło lub twardy plastik", title: "Odizoluj strefę", items: ["W razie potrzeby zatrzymaj pracę i zaalarmuj", "Odizoluj produkty, których dotyczy zagrożenie", "Nie zbieraj niczego bez polecenia"] },
        { eyebrow: "Owoc, który upadł na podłogę", title: "Nigdy nie wkładaj go z powrotem do obiegu", statement: "Odizoluj go i postępuj zgodnie z poleceniem przełożonego.", tone: "navy" },
      ],
    },
    {
      id: "nettoyage", number: "06", title: "Czyszczenie i szkodniki", description: "Właściwy sprzęt we właściwej strefie.", color: "teal", available: true,
      sections: [
        { eyebrow: "Podstawowa zasada", title: "Obowiązuje karta strefy", items: ["Używaj wskazanego sprzętu i środka", "Przestrzegaj dawkowania i instrukcji", "W razie wątpliwości zapytaj przełożonego"] },
        { eyebrow: "Kod kolorów", title: "Jeden sprzęt = jedna strefa", colorGroups: [
          { title: "Gąbki", entries: [{ label: "Zielony: hala sortowni", color: "#2f9156" }, { label: "Niebieski: umywalki", color: "#2f80c9" }, { label: "Żółty: muszle klozetowe", color: "#f2c94c" }, { label: "Różowy: pomieszczenie socjalne", color: "#e88baa" }] },
          { title: "Narzędzia", entries: [{ label: "Pomarańczowy: hala sortowni", color: "#ef8b32" }, { label: "Żółty: pomieszczenie socjalne", color: "#f2c94c" }, { label: "Biały: pomieszczenia sanitarne", color: "#ffffff", border: true }] },
        ] },
        { eyebrow: "Środki chemiczne", title: "Tylko zatwierdzone", items: ["Przestrzegaj oznaczeń i dawkowania", "Nigdy nie mieszaj środków", "Nie pozostawiaj niczego w warsztacie", "Przechowuj wszystko w wyznaczonej strefie"], tone: "navy" },
        { eyebrow: "Szkodniki", title: "Nie dotykaj. Zgłoś.", statement: "Każdą obecność szkodnika, ślad lub odchody należy natychmiast zgłosić.", tone: "warning" },
        { eyebrow: "Odpady", title: "Segreguj i regularnie usuwaj", items: ["Przestrzegaj zasad segregacji", "Nie zostawiaj niczego na podłodze", "Zgłaszaj każdą nieprawidłowość"] },
      ],
    },
    {
      id: "securite", number: "07", title: "Pracuj bezpiecznie", description: "Dziel przestrzeń bezpiecznie i zatrzymaj maszynę przed interwencją.", color: "red", available: true,
      image: "/images/circulation.png", imageAlt: "Oznakowane przejście dla pieszych w sortowni",
      sections: [
        { eyebrow: "Ruch", title: "Poruszaj się wyznaczoną drogą", items: ["Pozostawaj w dozwolonych strefach", "Korzystaj z ciągów pieszych i przestrzegaj oznakowania", "Nie wchodź na tor jazdy pojazdu", "Zachowaj bezpieczną odległość"] },
        { eyebrow: "Zablokowanie lub zagrożenie", title: "Zatrzymaj i zaalarmuj", items: ["W razie potrzeby użyj wyłącznika awaryjnego", "Powiadom przełożonego lub dział utrzymania ruchu", "Nigdy nie ingeruj we wnętrze maszyny"] },
        { eyebrow: "Ponowne uruchomienie", title: "Poczekaj na zgodę", statement: "Nie uruchamiaj ponownie bez sprawdzenia i zezwolenia.", tone: "warning" },
      ],
    },
    {
      id: "urgence", number: "08", title: "Sytuacja awaryjna i ewakuacja", description: "Ewakuuj się szybko i nie zawracaj.", color: "green", available: true,
      sections: [
        { eyebrow: "Alarm", title: "Ewakuuj się natychmiast", items: ["Nie kończ wykonywanej pracy", "Nie zabieraj swoich rzeczy"], tone: "warning" },
        { eyebrow: "Wyjście", title: "Idź wyznaczoną drogą", items: ["Korzystaj ze wskazanych wyjść", "Nigdy nie zawracaj"] },
        { eyebrow: "Po ewakuacji", title: "Poczekaj na zezwolenie", statement: "Nie wracaj do budynku bez zgody przełożonego." },
        { eyebrow: "Miejsce zbiórki", title: "Parking dla gości", statement: "Obowiązuje oficjalny plan ewakuacji Pomembal wywieszony w zakładzie.", tone: "navy" },
      ],
    },
  ],
  quizQuestions: [
    { question: "Po przerwie, przed wznowieniem pracy:", answers: ["Od razu wracam do pracy", "Myję ręce", "Zakładam własne rękawice"], correct: 1, explanation: "Ręce należy umyć przed każdym powrotem do pracy." },
    { question: "Jaka biżuteria jest dozwolona w Pomembal?", answers: ["Zegarek", "Prosta obrączka", "Cienka bransoletka"], correct: 1, explanation: "Biżuteria jest zabroniona, z wyjątkiem prostej obrączki." },
    { question: "Gdzie można jeść lub pić?", answers: ["W pomieszczeniu socjalnym, po zdjęciu fartucha", "Na końcu linii", "W szatni, w fartuchu"], correct: 0, explanation: "Jeść i pić można tylko w pomieszczeniu socjalnym, po zdjęciu fartucha." },
    { question: "Długopis Pomembal jest uszkodzony lub niekompletny. Co robisz?", answers: ["Wyrzucam go i pracuję dalej", "Zgłaszam, szukam i zabezpieczam", "Biorę własny długopis"], correct: 1, explanation: "Każdy zgubiony, uszkodzony lub niekompletny przedmiot należy zgłosić, odnaleźć i zabezpieczyć." },
    { question: "Widzisz ślad obecności szkodnika. Co należy zrobić?", answers: ["Nie dotykam i zgłaszam", "Sprzątam bez zgłaszania", "Dotykam, aby sprawdzić"], correct: 0, explanation: "Nie dotykaj. Natychmiast zgłoś każdą obecność szkodnika, ślad lub odchody." },
    { question: "Podczas używania środków chemicznych należy:", answers: ["Mieszać je, aby wzmocnić działanie", "Przestrzegać oznaczeń i dawkowania", "Zostawić środek przy linii"], correct: 1, explanation: "Używaj wyłącznie zatwierdzonych środków, przestrzegaj dawkowania i nigdy ich nie mieszaj." },
    { question: "Przedmiot utknął w maszynie. Co robisz?", answers: ["Wkładam rękę do maszyny", "W razie potrzeby zatrzymuję maszynę i alarmuję", "Uruchamiam ponownie, aby go usunąć"], correct: 1, explanation: "Nigdy nie ingeruj we wnętrze maszyny. W razie potrzeby zatrzymaj ją i zaalarmuj." },
    { question: "Włącza się alarm. Co robisz?", answers: ["Kończę wykonywaną pracę", "Zabieram swoje rzeczy", "Ewakuuję się na parking dla gości"], correct: 2, explanation: "Ewakuuj się natychmiast i udaj się do miejsca zbiórki na parkingu dla gości." },
  ],
  essentialReflexes: ["Prawidłowa odzież", "Umyte ręce", "Nic na produkcji", "Odizoluj nieprawidłowość", "Właściwy sprzęt do czyszczenia", "Zgłaszaj szkodniki", "Przestrzegaj ciągów komunikacyjnych", "Ewakuuj się po alarmie"],
};
