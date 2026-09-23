import type { LocaleContent } from "./types";

export const ptCopy = {
  header: { back: "Voltar", language: "Mudar de idioma", progress: "Progresso geral" },
  welcome: {
    kicker: "Formação essencial",
    title: "Higiene e Segurança",
    subtitle: "Os bons comportamentos para proteger a fruta, os colegas e os consumidores.",
    duration: "Cerca de 10 a 15 minutos",
    start: "Começar",
  },
  languages: {
    kicker: "Bem-vindo",
    title: "Escolha o seu idioma",
    intro: "Selecione o idioma que pretende utilizar na formação.",
    available: "Disponível",
    soon: "Brevemente disponível",
    note: "Os quatro idiomas estão disponíveis.",
  },
  themes: {
    kicker: "Percurso essencial",
    title: "Os 8 temas",
    intro: "Avance ao seu ritmo. Pode retomar um tema ou rever uma regra a qualquer momento.",
    notStarted: "Não iniciado",
    inProgress: "Em curso · Retomar",
    completed: "Concluído · Rever",
    coming: "Em breve",
    quizTitle: "Questionário dos bons comportamentos",
    quizMeta: "8 perguntas · correção imediata",
    quizButton: "Testar os meus conhecimentos",
  },
  theme: {
    kicker: "Regra essencial",
    understood: "Compreendi",
    backToThemes: "Voltar aos 8 temas",
    completed: "Tema compreendido",
    next: "Continuar para o tema seguinte",
    quiz: "Passar ao questionário final",
  },
  quiz: {
    question: "Pergunta",
    choose: "Escolha a resposta correta",
    correct: "Resposta correta",
    incorrect: "Não é bem assim",
    next: "Pergunta seguinte",
    finish: "Ver o resumo",
  },
  recap: {
    kicker: "Formação concluída",
    title: "Os bons comportamentos foram adquiridos.",
    subtitle: "Tenha estas regras simples presentes sempre que iniciar o trabalho.",
    remember: "A reter",
    reflexes: "Os 8 comportamentos essenciais",
    motto: "VEJO.\nAJO.\nALERTO.",
    doubt: "Tem dúvidas? Não improvise.",
    ask: "Pergunte ao responsável.",
    review: "Rever as regras",
    themes: "Voltar aos 8 temas",
  },
};

export const pt: LocaleContent = {
  code: "PT",
  direction: "ltr",
  themes: [
    {
      id: "entree", number: "01", title: "Antes de entrar", description: "Estar limpo, equipado e preparado.", color: "green", available: true,
      image: "/images/tenue.png", imageAlt: "Trabalhadora com bata limpa e cabelo totalmente coberto",
      sections: [
        { eyebrow: "O seu vestuário", title: "Limpo. Completo. Fechado.", items: ["Bata limpa, completa, fechada e adequada", "Cabelo totalmente coberto", "Calçado limpo, fechado e adequado"] },
        { eyebrow: "Mãos sem riscos", title: "Retire tudo o que possa contaminar", items: ["Unhas curtas, limpas e naturais", "Sem verniz nem unhas artificiais", "Nenhuma joia, exceto uma aliança simples", "Relógios e pulseiras são proibidos"] },
        { eyebrow: "Objetos pessoais", title: "Guarde o telemóvel", statement: "É proibido usar ou ter o telemóvel na central de acondicionamento ou na oficina.", tone: "navy" },
        { eyebrow: "A sua bata", title: "Retire-a fora da produção", items: ["Instalações sanitárias, pausa e zona de fumadores: retire a bata", "Volte a vesti-la antes de regressar à produção", "Lave-a a uma temperatura mínima de 60°C, pelo menos uma vez por semana"] },
      ],
    },
    {
      id: "mains", number: "02", title: "Mãos limpas", description: "A lavagem correta, no momento certo.", color: "teal", available: true,
      image: "/images/lavage-mains.png", imageAlt: "Trabalhadora a lavar as mãos no lavatório da central de acondicionamento",
      sections: [
        { eyebrow: "Antes", title: "Lave as mãos", items: ["À entrada na produção", "Sempre que retomar o trabalho", "Antes de qualquer contacto com a fruta"] },
        { eyebrow: "Depois", title: "Volte a lavar as mãos", items: ["Depois de ir às instalações sanitárias, comer ou fumar", "Depois de se assoar ou tocar em resíduos", "Depois de tocar numa superfície suja ou realizar uma ação contaminante"] },
        { eyebrow: "Como?", title: "Siga o procedimento afixado", items: ["Cumpra todas as etapas indicadas no lavatório", "Seque com papel de mãos de utilização única", "Não desinfete as mãos de forma sistemática"] },
        { eyebrow: "Luvas", title: "Não use luvas de forma sistemática", items: ["Use apenas luvas Pomembal", "Não use luvas pessoais", "As luvas nunca substituem a lavagem das mãos"], tone: "navy" },
      ],
    },
    {
      id: "sante", number: "03", title: "Saúde e ferimentos", description: "Prevenir antes de contaminar.", color: "red", available: true,
      sections: [
        { eyebrow: "Ferimento", title: "Avise imediatamente", items: ["Use um penso rápido azul detetável", "O penso não torna automaticamente obrigatório o uso de uma luva"], tone: "warning" },
        { eyebrow: "Sintomas", title: "Comunique antes de qualquer contacto", items: ["Doença contagiosa ou febre", "Diarreia ou vómitos", "Ferida infetada ou corrimento anormal"] },
        { eyebrow: "Medicamentos", title: "Apenas na sala de pausa", statement: "É proibido ter medicamentos na central de acondicionamento ou na oficina.", tone: "navy" },
        { eyebrow: "Acidente ou indisposição", title: "Alerte de imediato", statement: "Avise a chefe de equipa, a substituta SST ou um responsável." },
      ],
    },
    {
      id: "allergenes", number: "04", title: "Refeições e alergénios", description: "Não comer nem beber na produção.", color: "orange", available: true,
      sections: [
        { eyebrow: "Na produção", title: "Não consuma nada", items: ["Não é permitido comer nem beber", "Não são permitidos rebuçados nem pastilhas elásticas"], tone: "warning" },
        { eyebrow: "Pausa", title: "Apenas na sala de pausa", statement: "Retire a bata antes de comer ou beber." },
        { eyebrow: "Alergénios", title: "O risco vem do exterior", items: ["A Pomembal acondiciona maçãs", "Não é manipulado nenhum alergénio alimentar no processo", "Não introduza alimentos na zona de produção"] },
        { eyebrow: "Antes de regressar", title: "Regresse sem trazer nada", items: ["Volte a vestir a bata", "Lave as mãos"], tone: "navy" },
      ],
    },
    {
      id: "fruits", number: "05", title: "Proteger a fruta", description: "Evitar, isolar, comunicar.", color: "orange", available: true,
      sections: [
        { eyebrow: "Pequeno material", title: "Apenas material Pomembal", items: ["Canetas, facas e tesouras numeradas e inventariadas", "Não use nenhum equivalente pessoal"] },
        { eyebrow: "Objeto perdido ou partido", title: "Alerte. Procure. Proteja.", statement: "Qualquer objeto incompleto deve ser comunicado imediatamente.", tone: "warning" },
        { eyebrow: "Vidro ou plástico rígido", title: "Isole a zona", items: ["Pare, se necessário, e dê o alerta", "Isole os produtos afetados", "Não apanhe nada sem instruções"] },
        { eyebrow: "Fruta caída no chão", title: "Nunca a volte a colocar no circuito", statement: "Isole-a e siga as instruções do responsável.", tone: "navy" },
      ],
    },
    {
      id: "nettoyage", number: "06", title: "Limpeza e pragas", description: "O material correto, na zona correta.", color: "teal", available: true,
      sections: [
        { eyebrow: "Regra básica", title: "A ficha da zona é a referência", items: ["Utilize o material e o produto indicados", "Respeite a dosagem e as instruções", "Em caso de dúvida, pergunte ao responsável"] },
        { eyebrow: "Código de cores", title: "Um material = uma zona", colorGroups: [
          { title: "Esponjas", entries: [{ label: "Verde: central de acondicionamento", color: "#2f9156" }, { label: "Azul: lavatórios", color: "#2f80c9" }, { label: "Amarelo: sanitas", color: "#f2c94c" }, { label: "Cor-de-rosa: sala de pausa", color: "#e88baa" }] },
          { title: "Utensílios", entries: [{ label: "Laranja: central de acondicionamento", color: "#ef8b32" }, { label: "Amarelo: sala de pausa", color: "#f2c94c" }, { label: "Branco: instalações sanitárias", color: "#ffffff", border: true }] },
        ] },
        { eyebrow: "Produtos químicos", title: "Apenas produtos autorizados", items: ["Respeite a informação afixada e a dosagem", "Nunca misture os produtos", "Não deixe nenhum produto na oficina", "Guarde tudo na zona prevista"], tone: "navy" },
        { eyebrow: "Pragas", title: "Não toque. Comunique.", statement: "Qualquer presença, vestígio ou excremento deve ser comunicado imediatamente.", tone: "warning" },
        { eyebrow: "Resíduos", title: "Separe e retire regularmente", items: ["Respeite a separação dos resíduos", "Não deixe nada no chão", "Comunique qualquer anomalia"] },
      ],
    },
    {
      id: "securite", number: "07", title: "Trabalhar em segurança", description: "Partilhar o espaço e parar antes de intervir.", color: "red", available: true,
      image: "/images/circulation.png", imageAlt: "Percurso pedonal assinalado numa central de acondicionamento",
      sections: [
        { eyebrow: "Circulação", title: "Siga o percurso", items: ["Permaneça nas zonas autorizadas", "Utilize as zonas pedonais e respeite a sinalização", "Não atravesse a trajetória de um veículo", "Mantenha uma distância segura"] },
        { eyebrow: "Bloqueio ou perigo", title: "Pare e dê o alerta", items: ["Use a paragem de emergência, se necessário", "Avise o responsável ou a manutenção", "Nunca intervenha dentro da máquina"] },
        { eyebrow: "Reinício", title: "Aguarde autorização", statement: "Não reinicie sem verificação e autorização.", tone: "warning" },
      ],
    },
    {
      id: "urgence", number: "08", title: "Emergência e evacuação", description: "Evacuar rapidamente, sem voltar atrás.", color: "green", available: true,
      sections: [
        { eyebrow: "Alarme", title: "Evacue imediatamente", items: ["Não termine a tarefa", "Não vá buscar os seus pertences"], tone: "warning" },
        { eyebrow: "Saída", title: "Siga os percursos indicados", items: ["Utilize as saídas assinaladas", "Nunca volte atrás"] },
        { eyebrow: "Após a evacuação", title: "Aguarde autorização", statement: "Não volte a entrar nas instalações sem autorização de um responsável." },
        { eyebrow: "Ponto de encontro", title: "Parque de estacionamento dos visitantes", statement: "O plano oficial de evacuação Pomembal afixado nas instalações é a referência.", tone: "navy" },
      ],
    },
  ],
  quizQuestions: [
    { question: "Depois de uma pausa, antes de retomar o trabalho:", answers: ["Retomo imediatamente", "Lavo as mãos", "Coloco luvas pessoais"], correct: 1, explanation: "As mãos devem ser lavadas sempre antes de retomar o trabalho." },
    { question: "Que joia é permitida na Pomembal?", answers: ["Um relógio", "Uma aliança simples", "Uma pulseira fina"], correct: 1, explanation: "Não é permitida nenhuma joia, exceto uma aliança simples." },
    { question: "Onde se pode comer ou beber?", answers: ["Na sala de pausa, depois de retirar a bata", "No fim da linha", "Nos vestiários, com a bata vestida"], correct: 0, explanation: "Só é permitido comer e beber na sala de pausa, depois de retirar a bata." },
    { question: "Uma caneta Pomembal está partida ou incompleta. O que faz?", answers: ["Deito-a fora e continuo", "Dou o alerta, procuro e protejo", "Uso uma caneta pessoal"], correct: 1, explanation: "Qualquer objeto perdido, partido ou incompleto deve ser comunicado, procurado e protegido." },
    { question: "Vê um vestígio de uma praga. Qual é o comportamento correto?", answers: ["Não toco e comunico", "Limpo sem dizer nada", "Toco para verificar"], correct: 0, explanation: "Não toque. Comunique imediatamente qualquer presença, vestígio ou excremento." },
    { question: "Ao utilizar produtos químicos, deve:", answers: ["Misturá-los para reforçar o efeito", "Seguir a informação afixada e a dosagem", "Deixar o produto junto à linha"], correct: 1, explanation: "Utilize apenas produtos autorizados, respeite a dosagem e nunca os misture." },
    { question: "Um objeto está preso numa máquina. O que faz?", answers: ["Coloco a mão dentro da máquina", "Paro, se necessário, e dou o alerta", "Reinicio para o fazer sair"], correct: 1, explanation: "Nunca intervenha dentro da máquina. Pare, se necessário, e dê o alerta." },
    { question: "O alarme toca. O que faz?", answers: ["Termino a tarefa", "Vou buscar os meus pertences", "Evacuo para o parque de estacionamento dos visitantes"], correct: 2, explanation: "Evacue imediatamente e dirija-se ao ponto de encontro no parque de estacionamento dos visitantes." },
  ],
  essentialReflexes: ["Vestuário conforme", "Mãos lavadas", "Nada na produção", "Isolar uma anomalia", "Material de limpeza correto", "Comunicar as pragas", "Respeitar os percursos", "Evacuar ao ouvir o alarme"],
};
