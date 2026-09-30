import { ArrowRight } from "lucide-react";
export default function Welcome({ onStart }: { onStart: () => void }) {
  return <main className="welcome-cover" id="main-content" tabIndex={-1} lang="fr" dir="ltr">
    <img src="/images/site-pomembal.webp" alt="Station Pomembal et ses vergers" fetchPriority="high" />
    <div className="welcome-cover-shade" />
    <div className="welcome-cover-content"><p>POMEMBAL · TRADIPOM</p><h1>Bienvenue dans l’équipe.</h1>
      <button className="primary-button" onClick={onStart}>Démarrer <ArrowRight size={21} /></button>
      <span>Français · Polski · Português · العربية</span>
    </div>
  </main>;
}
