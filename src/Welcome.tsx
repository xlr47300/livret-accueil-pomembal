import { ArrowRight, BookOpen, Globe2, GraduationCap, Leaf, MapPin } from "lucide-react";

export default function Welcome({ onStart }: { onStart: () => void }) {
  return <main className="welcome-v2" id="main-content" tabIndex={-1} lang="fr" dir="ltr">
    <nav className="welcome-nav" aria-label="Accueil">
      <a href="#main-content" className="welcome-wordmark"><span className="brand-apple" aria-hidden="true"><i /></span>POMEMBAL<span className="wordmark-partner">TRADIPOM</span></a>
      <span className="welcome-nav-note">L’espace des équipes</span>
      <button className="welcome-nav-button" onClick={onStart}><Globe2 size={17} /> Choisir ma langue <ArrowRight size={16} /></button>
    </nav>
    <section className="welcome-hero">
      <img src="/images/site-pomembal.webp" alt="Vue aérienne de la station Pomembal entourée de ses vergers" className="welcome-hero-photo" fetchPriority="high" />
      <div className="welcome-hero-shade" />
      <div className="welcome-hero-text"><p className="welcome-overline">POMEMBAL & TRADIPOM · BIENVENUE</p>
        <h1>Vos premiers pas.<br /><em>Notre équipe.</em></h1>
        <p>Tout pour prendre vos repères, découvrir la station et commencer votre travail en confiance.</p>
        <button className="welcome-main-button" onClick={onStart}>Commencer <ArrowRight size={21} /></button>
        <span className="welcome-languages">Français · Polski · Português · العربية</span>
      </div>
      <span className="welcome-location"><MapPin size={16} /> Bias, Lot-et-Garonne</span>
    </section>
    <section className="welcome-path" aria-labelledby="path-title">
      <div className="welcome-section-heading"><p className="welcome-overline">VOTRE ARRIVÉE, SIMPLEMENT</p><h2 id="path-title">Un point de départ.<br />Tous vos repères.</h2><p>Choisissez votre langue, puis le contenu dont vous avez besoin. Vous pourrez revenir à cet accueil à tout moment.</p></div>
      <div className="welcome-path-cards">
        <button className="welcome-feature" onClick={onStart}><span className="feature-number">01 / DÉCOUVRIR</span><BookOpen size={30} /><h3>Le livret d’accueil</h3><p>Vos contacts, les lieux, la vie dans la station et les informations de votre premier jour.</p><span className="feature-bottom">Disponible en français <ArrowRight size={19} /></span></button>
        <button className="welcome-feature welcome-feature-green" onClick={onStart}><span className="feature-number">02 / APPRENDRE</span><GraduationCap size={32} /><h3>Hygiène & sécurité</h3><p>Huit thèmes concrets et un quiz pour connaître les bons réflexes au quotidien.</p><span className="feature-bottom">4 langues disponibles <ArrowRight size={19} /></span></button>
      </div>
    </section>
    <section className="welcome-team"><img src="/images/equipe-pomembal.webp" alt="Photo d’équipe présente dans le livret d’accueil Pomembal" loading="lazy" /><div><p className="welcome-overline">DERRIÈRE CHAQUE FRUIT</p><h2>Des métiers.<br />Une équipe.</h2><p>Du verger à l’emballage, chacun contribue à la qualité des pommes. Vous avez une question ou un doute ? Votre responsable est là pour vous accompagner.</p><span className="welcome-values"><Leaf size={19} /> Respect · Qualité · Entraide</span></div></section>
    <footer className="welcome-footer"><strong>POMEMBAL · TRADIPOM</strong><span>1270–1274 route de Lalandette · 47300 Bias</span><button onClick={onStart}>Accéder à mon espace <ArrowRight size={16} /></button></footer>
  </main>;
}
