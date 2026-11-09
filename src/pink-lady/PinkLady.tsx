import { useEffect, useRef } from "react";
import type { LanguageCode } from "../content";
import { photos, pinkLadyCopy } from "./copy";

type Props = {
  language: LanguageCode;
  index: number;
  onStep: (index: number) => void;
  onExit: () => void;
};

const tones = ["ok", "reject", "reject", "reject", "reject", "limit", "reject", "reject", "neutral", "neutral"];

export default function PinkLady({ language, index, onStep, onExit }: Props) {
  const copy = pinkLadyCopy[language];
  const [title, status, text, firstPhoto, secondPhoto] = copy.lessons[index];
  const last = index === copy.lessons.length - 1;
  const heading = useRef<HTMLHeadingElement>(null);
  const number = new Intl.NumberFormat(language === "AR" ? "ar-u-nu-arab" : language.toLowerCase());
  const count = number.format(copy.lessons.length);
  const current = number.format(index + 1);

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [index]);

  return (
    <main className="page-shell pink-lesson">
      <div className="pink-lesson-progress">
        <span>{copy.title}</span>
        <span>{copy.step} <bdi>{current} / {count}</bdi></span>
      </div>
      <progress aria-label={copy.step} max={copy.lessons.length} value={index + 1} />
      <article className="pink-lesson-panel" aria-labelledby="pink-title">
        <p className={`pink-status pink-status-${tones[index]}`}>{status}</p>
        <h1 id="pink-title" ref={heading} tabIndex={-1}>{title}</h1>
        <p className="pink-lesson-text">{text}</p>
        <div className={`pink-photos ${secondPhoto ? "pink-photos-pair" : ""}`}>
          {photos[index].map((photo, position) => (
            <figure key={photo}>
              <img src={`/images/pink-lady/${photo}.webp`} alt="" aria-describedby={`pink-photo-${position}`} />
              <figcaption id={`pink-photo-${position}`}>{position === 0 ? firstPhoto : secondPhoto}</figcaption>
            </figure>
          ))}
        </div>
      </article>
      <div className="pink-lesson-actions">
        <button className="secondary-button" disabled={index === 0} onClick={() => onStep(index - 1)}>{copy.previous}</button>
        <button className="primary-button" onClick={last ? onExit : () => onStep(index + 1)}>
          {last ? copy.finish : copy.next}
        </button>
      </div>
    </main>
  );
}
