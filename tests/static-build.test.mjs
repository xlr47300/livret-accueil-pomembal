import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const requiredAssets = [
  "dist/index.html",
  "dist/favicon.svg",
  "dist/images/hero-station.png",
  "dist/images/site-pomembal.jpg",
  "dist/images/site-pomembal.webp",
  "dist/images/equipe-pomembal.webp",
  "dist/images/verger-pomembal.webp",
  "dist/images/plan-station.webp",
  "dist/images/tenue.webp",
  "dist/images/lavage-mains.webp",
  "dist/images/circulation.webp",
  "dist/images/arret-urgence.webp",
  "dist/images/tenue.png",
  "dist/images/lavage-mains.png",
  "dist/images/circulation.png",
  "dist/images/arret-urgence.png",
  "dist/fonts/geist-001175b1.woff2",
  "dist/fonts/geist-98bbbccb.woff2",
];

test("le build statique contient la page et tous les assets utilisés", async () => {
  await Promise.all(requiredAssets.map((path) => access(path)));
  const html = await readFile("dist/index.html", "utf8");
  assert.match(html, /<title>Accueil et formations Pomembal<\/title>/);
  assert.match(html, /<div id="root"><\/div>/);
});
