import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronUp, Expand, GraduationCap, Lightbulb, MapPin, Phone, Printer, X } from "lucide-react";
import { bookletText } from "./content/booklet";
import type { LanguageCode, ThemeId } from "./content";

const chapterIds = ["bienvenue", "arrivee", "contacts", "horaires", "tenue", "securite", "emballage", "environnement", "collectif", "idees"];
const contactNames = ["Vincent et Sandrine Carrère-Loustaunau", "Dina", "Romain", "Laetitia", "Dina", "Xavier"];
const directionEmails = ["tradipom@gmail.com", "sandrine.tradipom@gmail.com"];
const documentLabels = {
  FR: { created: "Date de création", updated: "Mise à jour" },
  PL: { created: "Data utworzenia", updated: "Data aktualizacji" },
  PT: { created: "Data de criação", updated: "Data de atualização" },
  AR: { created: "تاريخ الإنشاء", updated: "تاريخ التحديث" },
};

type Props = { language: LanguageCode; onTraining: () => void; onTheme: (id: ThemeId, returnToId: string) => void };

export default function Booklet({ language, onTraining, onTheme }: Props) {
  const t = bookletText[language];
  const documentLabel = documentLabels[language];
  const [active, setActive] = useState(chapterIds[0]);
  const dialog = useRef<HTMLDialogElement>(null);
  const planButton = useRef<HTMLButtonElement>(null);
  const sectionLabel = (index: number) => <span className="chapter-number">{String(index + 1).padStart(2, "0")} — {t.sectionLabels[index]}</span>;
  const rules = (items: string[]) => <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>;
  const trainingLink = (id: ThemeId, label: string, returnToId: string) => (
    <button className="handbook-training-link" onClick={() => onTheme(id, returnToId)}>
      <GraduationCap size={18} />{label}<ArrowRight size={17} aria-hidden="true" />
    </button>
  );

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-90px 0px -55% 0px" });
    document.querySelectorAll(".handbook-section").forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main id="main-content" tabIndex={-1} className="handbook" lang={language.toLowerCase()} dir={language === "AR" ? "rtl" : "ltr"}>
      <header className="handbook-cover">
        <img src="/images/site-pomembal.webp" alt="" />
        <div><p className="welcome-overline">{t.cover[0]}</p><h1>{t.cover[1]}</h1><p>{t.cover[2]}</p>
          <button className="handbook-print" onClick={() => window.print()}><Printer size={17} />{t.cover[3]}</button></div>
      </header>
      <div className="handbook-layout">
        <aside className="handbook-sidebar">
          <p>{t.nav[0]}</p>
          <nav aria-label={t.nav[1]}>{chapterIds.map((id, index) => (
            <a href={`#${id}`} key={id} aria-current={active === id ? "location" : undefined}>
              <span>{String(index + 1).padStart(2, "0")}</span>{t.chapters[index]}
            </a>
          ))}</nav>
          <a className="handbook-help" href="tel:112"><Phone size={18} /><span>{t.nav[2]}<strong dir="ltr">112</strong></span></a>
        </aside>
        <div className="handbook-body">
          <section className="handbook-section" id="bienvenue">
            {sectionLabel(0)}<h2>{t.welcome.title}</h2>
            <div className="handbook-editorial"><div>{t.welcome.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
              <figure><img src="/images/verger-pomembal.webp" alt={t.welcome.alt} loading="lazy" /><figcaption>{t.welcome.picture}</figcaption></figure></div>
          </section>
          <section className="handbook-section" id="arrivee">
            {sectionLabel(1)}<h2>{t.arrival.title}</h2>
            <div className="arrival-address"><MapPin size={24} /><div><strong dir="ltr">1270–1274 route de Lalandette</strong><span>{t.arrival.parking}</span></div></div>
            <p>{t.arrival.intro}</p><p className="arrival-reminder"><strong>{t.arrival.reminderLabel}</strong> {t.arrival.reminder}</p>
            <figure className="handbook-plan"><button ref={planButton} onClick={() => dialog.current?.showModal()} aria-label={t.arrival.planButton}>
              <img src="/images/plan-station.webp" alt={t.arrival.planAlt} loading="lazy" /><span><Expand size={17} />{t.arrival.planButton}</span>
            </button><figcaption>{t.arrival.planCaption}</figcaption></figure>
          </section>
          <section className="handbook-section" id="contacts">
            {sectionLabel(2)}<h2>{t.contacts.title}</h2>
            <dl className="handbook-contacts">{t.contacts.roles.map((role, index) => (
              <div key={index}><dt>{role}</dt><dd><bdi>{contactNames[index]}</bdi></dd></div>
            ))}</dl>
            <div className="handbook-contact-email"><h3>{t.contacts.emailTitle}</h3>{directionEmails.map(email => (
              <a key={email} href={`mailto:${email}`} dir="ltr">{email}</a>
            ))}</div>
          </section>
          <section className="handbook-section" id="horaires">
            {sectionLabel(3)}<h2>{t.hours.title}</h2><p>{t.hours.limits}</p>
            <div className="handbook-hours"><div><span>{t.hours.weekdays}</span><strong dir="ltr">7 h 50 – 12 h</strong><strong dir="ltr">13 h – 18 h</strong></div>
              <div><span>{t.hours.saturday}</span><strong dir="ltr">7 h 50 – 12 h</strong></div></div>
            <h3>{t.hours.breakTitle}</h3>{rules(t.hours.rules)}<p>{t.hours.apples}</p>
          </section>
          <section className="handbook-section" id="tenue">
            {sectionLabel(4)}<h2>{t.hygiene.title}</h2>
            <div className="handbook-visual-row"><img src="/images/tenue.webp" alt={t.hygiene.imageAlt} loading="lazy" /><div>{rules(t.hygiene.rules)}</div></div>
            <div className="handbook-key-rule"><span dir="ltr">60 °C</span><p><strong>{t.hygiene.washLead}</strong><br />{t.hygiene.washSoon}</p></div>
            <h3>{t.hygiene.handsTitle}</h3><p>{t.hygiene.hands}</p>
            {trainingLink("entree", t.hygiene.linkClothes, "tenue")}{trainingLink("mains", t.hygiene.linkHands, "tenue")}
          </section>
          <section className="handbook-section" id="securite">
            {sectionLabel(5)}<h2>{t.safety.title}</h2>
            <div className="handbook-visual-row"><img src="/images/circulation.webp" alt={t.safety.imageAlt} loading="lazy" /><div>{rules(t.safety.rules)}</div></div>
            <div className="handbook-emergency"><Phone size={26} /><div><h3>{t.safety.emergencyTitle}</h3>
              <p>{t.safety.alert} <a href="tel:112" dir="ltr">112</a>.</p><p>{t.safety.evacuation}</p></div></div>
            {trainingLink("securite", t.safety.linkSafety, "securite")}{trainingLink("urgence", t.safety.linkEmergency, "securite")}
          </section>
          <section className="handbook-section" id="emballage">
            {sectionLabel(6)}<h2>{t.packing.title}</h2>{rules(t.packing.rules)}
            <p className="handbook-motto">{t.packing.motto}</p>{trainingLink("fruits", t.packing.link, "emballage")}
          </section>
          <section className="handbook-section" id="environnement">
            {sectionLabel(7)}<h2>{t.environment.title}</h2><div className="eco-grid">{t.environment.items.map((item, index) => (
              <div key={index}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.text}</p></div>
            ))}</div>
          </section>
          <section className="handbook-section" id="collectif">
            {sectionLabel(8)}<h2>{t.team.title}</h2>
            <figure className="handbook-team"><img src="/images/equipe-pomembal.webp" alt={t.team.imageAlt} loading="lazy" /><figcaption>{t.team.picture}</figcaption></figure>
            <p>{t.team.intro}</p><h3>{t.team.rightsTitle}</h3><p>{t.team.rights}</p><p>{t.team.duties}</p>
          </section>
          <section className="handbook-section handbook-ideas" id="idees">
            <Lightbulb size={35} />{sectionLabel(9)}<h2>{t.ideas.title}</h2><p>{t.ideas.anonymous}</p><p>{t.ideas.paper}</p>
            <div className="idea-contact"><h3>{t.ideas.emailTitle}</h3><p>{t.ideas.email} <strong>{t.ideas.emailWarning}</strong></p>
              {directionEmails.map(email => <a key={email} dir="ltr" href={`mailto:${email}?subject=${encodeURIComponent(t.ideas.emailSubject)}`}>{email}</a>)}</div>
            <p>{t.ideas.urgent}</p>
          </section>
          <section className="handbook-next"><GraduationCap size={32} /><div><span className="chapter-number">{t.next.label}</span>
            <h2>{t.next.title}</h2><p>{t.next.intro}</p>
            <button className="primary-button" onClick={onTraining}>{t.next.button}<ArrowRight size={19} aria-hidden="true" /></button></div></section>
          <a href="#main-content" className="handbook-top"><ChevronUp size={17} />{t.nav[3]}</a>
          <footer className="handbook-document-info" aria-label="DOC 25">
            <strong dir="ltr">POMEMBAL · DOC 25 · V2</strong>
            <span>{documentLabel.created} : <time dateTime="2025-03-17" dir="ltr">17/03/2025</time></span>
            <span>{documentLabel.updated} : <time dateTime="2026-09-23" dir="ltr">23/09/2026</time></span>
          </footer>
        </div>
      </div>
      <dialog className="plan-dialog" ref={dialog} onClose={() => planButton.current?.focus()}
        onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} aria-labelledby="plan-title">
        <div><h2 id="plan-title">{t.arrival.planTitle}</h2><button onClick={() => dialog.current?.close()} aria-label={t.arrival.planClose}><X /></button></div>
        <p>{t.arrival.planVersion}</p><img src="/images/plan-station.webp" alt={t.arrival.planAlt} />
        <a href="/images/plan-station.webp" target="_blank" rel="noreferrer">{t.arrival.planOpen}</a>
      </dialog>
    </main>
  );
}
