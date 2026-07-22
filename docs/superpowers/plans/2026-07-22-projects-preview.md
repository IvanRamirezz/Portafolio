# Projects Preview Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Axoloop project with two new live-website projects (NeoCodes, Actipulse), give LabVR a link to its live dashboard, and make any project card with a `url` open the real site in a new tab — using a static screenshot thumbnail, not an iframe/modal (rejected during brainstorming: many sites block being embedded and that failure isn't reliably detectable client-side).

**Architecture:** Pure data + presentational change. `src/data/project.ts` gains an optional `url` field per project. `ProjectCard.astro` picks its root element (`a` vs `div`) at build time based on whether `url` is present — no client-side JS added. The dead `initProjectModal` script in `Projects.astro` (calls a function that was never defined, imports a nonexistent path) is deleted as part of the same cleanup.

**Tech Stack:** Astro 6 (`.astro` components, frontmatter TypeScript), no test framework in this repo — verification is `npx astro check` + `npm run build` + manual screenshot review via a one-off Playwright script (not added as a project dependency).

## Global Constraints

- Node >= 22.12.0 (see `package.json` engines).
- No test framework exists in this repo — do not add one. Verification is type-check + build + visual screenshot check.
- Any asset/link path must use the `${import.meta.env.BASE_URL}/...` template pattern (see `src/data/project.ts` existing entries) — never a hardcoded root-relative path.
- Playwright is a one-off local tool for generating screenshots in Task 1. Do not add it to `package.json` (`npm install --no-save`).
- Keep the existing visual language: dark background, cyan `#38bdf8` / green `#22c55e` accents, scoped per-component `<style>` blocks (see `src/components/ui/ProjectCard.astro`).

---

### Task 1: Capture screenshots for NeoCodes and Actipulse

**Files:**
- Create: `public/images/neocodes.png`
- Create: `public/images/actipulse.png`
- Create (temporary, deleted at end of task): `_tmp_capture.cjs`

**Interfaces:**
- Produces: two PNG files under `public/images/` that Task 2 references by path (`neocodes.png`, `actipulse.png`).

- [ ] **Step 1: Ensure Playwright + Chromium are available**

Run from the repo root:

```bash
npm install --no-save playwright
npx playwright install chromium
```

Expected: no errors. This does not modify `package.json` (only `--no-save` installs into `node_modules`, which is gitignored).

- [ ] **Step 2: Write the capture script**

Create `_tmp_capture.cjs` at the repo root:

```javascript
const { chromium } = require('playwright');

const targets = [
  { url: 'https://family-manager-eight.vercel.app/tienda', out: 'public/images/neocodes.png' },
  { url: 'https://actipulse.com', out: 'public/images/actipulse.png' },
];

(async () => {
  const browser = await chromium.launch();
  for (const { url, out } of targets) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.screenshot({ path: out });
    console.log('captured', url, '->', out);
    await page.close();
  }
  await browser.close();
})();
```

- [ ] **Step 3: Run the capture script**

Run: `node _tmp_capture.cjs`

Expected output:
```
captured https://family-manager-eight.vercel.app/tienda -> public/images/neocodes.png
captured https://actipulse.com -> public/images/actipulse.png
```

- [ ] **Step 4: Verify the screenshots visually**

Read both `public/images/neocodes.png` and `public/images/actipulse.png` (e.g. with the Read tool) and confirm each shows real page content (not a blank page, not an error/blocked screen, not a cookie-consent overlay covering everything). If either looks wrong, re-run Step 3 for that target — if a cookie banner covers the page, add `await page.waitForTimeout(1500)` before the screenshot call for that target and retry.

- [ ] **Step 5: Delete the temporary capture script**

```bash
rm _tmp_capture.cjs
```

- [ ] **Step 6: Confirm the two PNGs are tracked as new files**

```bash
git status --porcelain public/images/neocodes.png public/images/actipulse.png
```

Expected: both listed as `??` (untracked, ready to be added later — do not commit yet, no test framework/build step depends on committing per-task in this repo).

---

### Task 2: Update project data

**Files:**
- Modify: `src/data/project.ts`

**Interfaces:**
- Produces: `projects` array (same export name/shape as today — array of object literals with `id`, `title`, `description`, `image`, `tags`, and now optionally `url`) consumed by `src/components/sections/Projects.astro` and, per-item, by `ProjectCard.astro` (Task 3).

- [ ] **Step 1: Replace the file contents**

Replace the full contents of `src/data/project.ts` with:

```typescript
export const projects = [
{
id:"wireguard",
title:"VPN con Wireguard en Raspi 4",
description:"Configuración de una VPN utilizando WireGuard en Raspberry Pi 4 para acceso remoto seguro a servicios y red privada.",
image:`${import.meta.env.BASE_URL}/images/raspi.jpg`,
tags:["docker","linux","vpn","raspberrypi"],
},

{
id:"nextcloud",
title:"Nube privada con Nextcloud",
description:"Servidor de nube privada con Nextcloud en Raspberry Pi utilizando Docker para almacenamiento y sincronización segura de archivos.",
image:`${import.meta.env.BASE_URL}/images/nextcloud.jpg`,
tags:["docker","linux","cloud","networking"],
},

{
id:"LabVR",
title:"Laboratorio RV de Redes Ópticas",
description:"Simulador en realidad virtual para el aprendizaje de dispersión y atenuación en fibras ópticas.",
image:`${import.meta.env.BASE_URL}/images/Logo.png`,
tags:["unity","sql","astro","supabase"],
url:"https://dashboard-web-six-umber.vercel.app",
},

{
id:"app-script",
title:"Data Cleaning con Apps Script",
description:"Automatización de limpieza y validación de datos desde Google Forms, generando archivos CSV para el registro masivo de estudiantes en plataforma educativa.",
image:`${import.meta.env.BASE_URL}/images/Appscrit.png`,
tags:["javascript","google sheet","csv"]
},

{
id:"neocodes",
title:"NeoCodes — Tienda de códigos digitales",
description:"Tienda de códigos digitales desarrollada como freelance, conectada a un bot de Telegram para automatizar ventas y con panel administrativo para subir juegos y administrar el sitio.",
image:`${import.meta.env.BASE_URL}/images/neocodes.png`,
tags:["freelance","ecommerce","telegram-bot","admin-panel"],
url:"https://family-manager-eight.vercel.app/tienda",
},

{
id:"actipulse",
title:"Actipulse Neuroscience",
description:"Sitio web corporativo de Actipulse Neuroscience, desarrollado durante mi práctica profesional como Web Development Intern.",
image:`${import.meta.env.BASE_URL}/images/actipulse.png`,
tags:["astro","css","tailwind"],
url:"https://actipulse.com",
}
];
```

Note what changed vs. the current file: the `Axoloop` entry is gone; `LabVR` gained the `url` line; two new entries (`neocodes`, `actipulse`) were appended.

- [ ] **Step 2: Type-check**

Run: `npx astro check`

Expected: `0 errors` (the `projects` array has no explicit type annotation today, so adding `url` to some object literals does not break anything — TypeScript infers a union of shapes).

- [ ] **Step 3: Confirm Axoloop is gone and new ids are present**

```bash
grep -c "Axoloop" src/data/project.ts; grep -c '"neocodes"\|"actipulse"' src/data/project.ts
```

Expected: first command prints `0`, second prints `2`.

- [ ] **Step 4: Commit**

```bash
git add src/data/project.ts public/images/neocodes.png public/images/actipulse.png
git commit -m "feat: replace Axoloop with NeoCodes and Actipulse projects, link LabVR dashboard"
```

---

### Task 3: Make `ProjectCard` clickable when a `url` is present

**Files:**
- Modify: `src/components/ui/ProjectCard.astro`

**Interfaces:**
- Consumes: `projects` array items from Task 2 (`title`, `description`, `image`, `tags`, `id`, optional `url`), spread as props via `<ProjectCard {...project} />` in `Projects.astro` (unchanged call site).
- Produces: a card that renders as `<a href={url} target="_blank" rel="noopener noreferrer">` when `url` is set, or `<div>` (current behavior) when it is not. No new exports.

- [ ] **Step 1: Replace the full file contents**

```astro
---
interface Props {
  title:string;
  description:string;
  image:string;
  tags:string[];
  id:string;
  url?:string;
}

const { title, description, image, tags, url } = Astro.props;
const Wrapper = url ? "a" : "div";
---

<Wrapper
  class="project-card"
  href={url}
  target={url ? "_blank" : undefined}
  rel={url ? "noopener noreferrer" : undefined}
>

  <div class="thumb">

    <img src={image} alt={title} />

    {url && <span class="preview-badge">↗ Ver sitio</span>}

  </div>

  <div class="content">

    <h3>{title}</h3>

    <p>{description}</p>

    <div class="tags">

      {tags.map(tag => (

        <span>#{tag}</span>

      ))}

    </div>

  </div>

</Wrapper>

<style>

.project-card{

  background:rgba(2,6,23,0.7);

  border-radius:18px;

  border:1px solid rgba(56,189,248,0.15);

  overflow:hidden;

  cursor:pointer;

  transition:.25s;

  height:100%;

  display:flex;

  flex-direction:column;

  color:inherit;

  text-decoration:none;

}

.project-card:hover{

  transform:translateY(-6px);

  border-color:#38bdf8;

}

.thumb{

  position:relative;

}

.thumb img{

  width:100%;

  height:160px;

  object-fit:cover;

  display:block;

}

.preview-badge{

  position:absolute;

  inset:0;

  display:flex;

  align-items:center;

  justify-content:center;

  background:rgba(2,6,23,0.55);

  color:#22c55e;

  font-size:13px;

  font-weight:600;

  opacity:0;

  transition:.2s;

}

.project-card:hover .preview-badge{

  opacity:1;

}

.content{

  padding:8px;

  display:flex;

  flex-direction:column;

  gap:5px;

  flex:1;

}

.content h3{

  font-size:18px;

}

.content p{

  font-size:13px;

  line-height:1.45;

  color:#94a3b8;

}

.tags{

  margin-top:auto;

  display:flex;

  gap:8px;

  flex-wrap:wrap;

}

.tags span{

  font-size:12px;

  padding:4px 8px;

  border-radius:6px;

  background:rgba(148,163,184,0.15);

}

/* mobile */
@media (max-width:600px){

  .thumb img{

    height:150px;

  }

}

</style>
```

Note the two deliberate removals vs. the current file: `data-project-id={id}` is dropped (it only existed for the dead modal script being deleted in Task 4 — `id` is destructured out of `Astro.props` unused otherwise, so it's also removed from the destructure), and `.project-card img` becomes `.thumb img` because the image is now wrapped in a `.thumb` div (needed to absolutely-position `.preview-badge` over it).

- [ ] **Step 2: Type-check**

Run: `npx astro check`

Expected: `0 errors`.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/ProjectCard.astro
git commit -m "feat: make project cards with a url open the live site in a new tab"
```

---

### Task 4: Remove the dead modal script from `Projects.astro`

**Files:**
- Modify: `src/components/sections/Projects.astro`

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing new — this is a deletion only.

- [ ] **Step 1: Delete the broken script block**

In `src/components/sections/Projects.astro`, remove this block (it sits between the closing `</SectionWrapper>` and the `<style>` block):

```astro
<script type="module">

import { projects } from "../../data/projects";

initProjectModal(projects);

</script>
```

The file should go directly from `</SectionWrapper>` to the `<style>` tag afterward, with no script block in between.

- [ ] **Step 2: Type-check and build**

```bash
npx astro check
npm run build
```

Expected: both succeed with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Projects.astro
git commit -m "fix: remove dead initProjectModal script (undefined function, wrong import path)"
```

---

### Task 5: Full visual verification

**Files:** none (verification only).

**Interfaces:** none.

- [ ] **Step 1: Start the dev server**

```bash
lsof -ti:4321 -sTCP:LISTEN | xargs -r kill
npm run dev > /tmp/astro-dev.log 2>&1 &
disown
i=0; until curl -sf http://localhost:4321/Portafolio/ >/dev/null || [ $i -ge 30 ]; do sleep 1; i=$((i+1)); done
curl -sf http://localhost:4321/Portafolio/ >/dev/null && echo READY
```

Expected: `READY` printed within 30s. If not, check `/tmp/astro-dev.log`.

- [ ] **Step 2: Screenshot the Projects section and check for console errors**

Reuse the same Playwright-from-`node_modules` approach as Task 1 (install already done in Task 1 unless `node_modules/playwright` was removed since). Create a temporary `_tmp_verify.cjs`:

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  await page.goto('http://localhost:4321/Portafolio/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.getElementById('projects')?.scrollIntoView());
  await page.waitForTimeout(300);
  await page.screenshot({ path: '/tmp/projects-desktop.png' });

  // mobile
  await page.setViewportSize({ width: 375, height: 667 });
  await page.evaluate(() => document.getElementById('projects')?.scrollIntoView());
  await page.waitForTimeout(300);
  await page.screenshot({ path: '/tmp/projects-mobile.png' });

  const hrefs = await page.$$eval('.project-card', els => els.map(el => el.tagName === 'A' ? el.getAttribute('href') : null));
  console.log('card hrefs:', hrefs);
  console.log('console/page errors:', errors);
  await browser.close();
})();
```

Run: `node _tmp_verify.cjs`

Expected:
- `card hrefs:` prints an array of 6 entries: `null, null, 'https://dashboard-web-six-umber.vercel.app', null, 'https://family-manager-eight.vercel.app/tienda', 'https://actipulse.com'` (order matches the `projects` array from Task 2).
- `console/page errors:` prints `[]` (empty — confirms the old 404 from `initProjectModal` is gone and nothing else broke).

- [ ] **Step 3: Review the screenshots**

Read `/tmp/projects-desktop.png` and `/tmp/projects-mobile.png` with the Read tool. Confirm: 6 project cards render (Wireguard, Nextcloud, LabVR, Data Cleaning, NeoCodes, Actipulse), no Axoloop card, layout still looks correct at both widths (grid from `Projects.astro` is unchanged, so this should just work, but verify no visual regression).

- [ ] **Step 4: Clean up**

```bash
rm _tmp_verify.cjs
lsof -ti:4321 -sTCP:LISTEN | xargs -r kill
```

- [ ] **Step 5: Report completion**

No commit in this task (verification only). Summarize to the user: which 2 tasks' commits were made, that the build and type-check pass, and that the 6 project cards render correctly with the expected hrefs and no console errors.
