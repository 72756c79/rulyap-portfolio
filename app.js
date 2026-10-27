(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const HUES = [18, 28, 36, 200, 190, 48, 10, 160];
  const RATIOS = ["3/4", "2/3", "4/3", "1/1", "3/2", "4/5"];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fmt = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  function ph(seed, ratio) {
    const h = HUES[seed % HUES.length], h2 = HUES[(seed + 3) % HUES.length];
    const ang = 150 + ((seed * 17) % 60);
    return `<div class="ph" style="aspect-ratio:${ratio};background:linear-gradient(${ang}deg,hsl(${h} 48% 74%),hsl(${h2} 38% 46%))"></div>`;
  }
  const pic = (src, seed, ratio, alt = "") =>
    src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">` : ph(seed, ratio);

  /* ---------- shared chrome ---------- */
  function chrome() {
    const page = document.body.dataset.page;
    const nav =
      `<a href="index.html" class="${page === "home" ? "on" : ""}">Home</a>` +
      `<a href="works.html" class="${page !== "home" ? "on" : ""}">Works</a>` +
      `<button class="link" data-price>Get a Pricelist</button>`;
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<a class="skip" href="#main">Skip to content</a>
       <header class="top"><a class="logo" href="index.html">${esc(SITE.name)}<span>.</span></a>
       <nav class="nav">${nav}</nav>
       <button class="burger" aria-label="Menu" aria-expanded="false"><i></i><i></i></button></header>
       <div class="drawer">${nav}</div>`
    );
    const burger = $(".burger"), drawer = $(".drawer");
    burger.onclick = () => {
      const o = drawer.classList.toggle("open");
      burger.setAttribute("aria-expanded", o);
    };

    document.body.insertAdjacentHTML(
      "beforeend",
      `<footer class="foot">
         <div><p class="big">Let's make something worth remembering.</p></div>
         <div><h4>Explore</h4><ul><li><a href="index.html">Home</a></li><li><a href="works.html">Works</a></li><li><button class="link" data-price>Get a Pricelist</button></li></ul></div>
         <div><h4>Say hi</h4><ul>
           <li><a href="${esc(SITE.instagram)}" target="_blank" rel="noopener">Instagram</a></li>
           <li><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></li>
           <li><a href="https://wa.me/${esc(SITE.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a></li></ul></div>
         <p class="copy">© ${new Date().getFullYear()} ${esc(SITE.fullName)}. All photographs are the property of the photographer.</p>
       </footer>

       <dialog id="price"><div class="dlg">
         <button class="x" aria-label="Close" data-close>×</button>
         <h2>Pricelist & booking</h2>
         <p class="note">Pick a package, tell me a bit about your plan, and the message goes straight to my WhatsApp.</p>
         <div class="pk">${PACKAGES.map((p) => `<div><span><b>${esc(p.name)}</b><small>${esc(p.note)}</small></span><span>${esc(p.price)}</span></div>`).join("")}</div>
         <form class="f" id="pf">
           <div class="two"><input name="name" placeholder="Your name" required>
           <input name="date" placeholder="Preferred date / month"></div>
           <select name="pkg">${PACKAGES.map((p) => `<option>${esc(p.name)}</option>`).join("")}<option>Not sure yet</option></select>
           <textarea name="msg" rows="3" placeholder="Tell me about the shoot (location, mood, references)"></textarea>
           <button class="btn fill" type="submit">Send via WhatsApp →</button>
         </form>
       </div></dialog>

       <dialog id="lb"><button class="close" aria-label="Close">×</button><button class="prev" aria-label="Previous">‹</button><div class="stage"></div><button class="next" aria-label="Next">›</button></dialog>`
    );

    const dlg = $("#price");
    $$("[data-price]").forEach((b) => (b.onclick = () => { drawer.classList.remove("open"); dlg.showModal(); }));
    $("[data-close]", dlg).onclick = () => dlg.close();
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    $("#pf").onsubmit = (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const text = `Hi ${SITE.name}, I'm ${f.get("name")}. I'm interested in "${f.get("pkg")}"` +
        (f.get("date") ? ` around ${f.get("date")}` : "") + `.` + (f.get("msg") ? `\n${f.get("msg")}` : "");
      window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    };
  }

  /* ---------- cards ---------- */
  function card(p, i = 0) {
    const ratio = RATIOS[i % RATIOS.length === 3 ? 0 : i % 3 === 1 ? 1 : 0];
    return `<a class="card" href="project.html?p=${encodeURIComponent(p.slug)}">
      <div class="im">${pic(p.cover || (p.photos || [])[0], PROJECTS.indexOf(p) + 1, "4/5", p.title)}</div>
      <div class="meta"><span>${esc(p.category)}</span><span>·</span><span>${fmt(p.date)}</span></div>
      <h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p></a>`;
  }

  /* ---------- home ---------- */
  function home() {
    const [a, b, c, d, e] = SITE.headline;
    const frames = Array.from({ length: 14 }, (_, k) => {
      const src = (SITE.heroImages || [])[k] || null;
      const ratio = RATIOS[k % RATIOS.length];
      const w = { "3/4": 0.75, "2/3": 0.667, "4/3": 1.333, "1/1": 1, "3/2": 1.5, "4/5": 0.8 }[ratio];
      return `<div class="f grain" style="aspect-ratio:${w}">${pic(src, k + 2, ratio)}</div>`;
    });
    const row = (arr) => `<div class="track">${arr.join("")}${arr.join("")}</div>`;
    const half = Math.ceil(frames.length / 2);
    const latest = PROJECTS.slice().sort((x, y) => (x.date < y.date ? 1 : -1)).slice(0, 3);

    $("#main").innerHTML = `
      <section class="hero">
        <p class="eyebrow">${esc(SITE.city)}</p>
        <h1 style="margin-top:18px">${esc(a)} <em>${esc(b)}</em> ${esc(c)} <em>${esc(d)}</em> ${esc(e)}</h1>
        <p>${esc(SITE.subline)}</p>
        <div class="row"><a class="btn fill" href="works.html">View works</a><button class="btn" data-price>Get a pricelist</button></div>
      </section>
      <section class="marquee" aria-label="Selected frames">
        ${row(frames.slice(0, half))}
        <div class="track rev">${frames.slice(half).concat(frames.slice(0, 3)).join("")}${frames.slice(half).concat(frames.slice(0, 3)).join("")}</div>
      </section>
      <section class="cta">
        <h2>If you'd like me there to capture your day, let's talk about <em>you</em>, your plans, and what matters most.</h2>
        <button class="btn fill" data-price>Book for ${SITE.bookYear}</button>
      </section>
      <section class="sec">
        <div class="sec-head"><h2>Latest works</h2><a href="works.html">All works</a></div>
        <div class="grid">${latest.map(card).join("")}</div>
      </section>
      <section class="sec">
        <div class="sec-head"><h2>Awards & features</h2></div>
        ${AWARDS.length
          ? `<div class="awards">${AWARDS.map((w) => `<div class="a">${esc(w.title)}<span>${esc(w.where)} · ${esc(w.year)}</span></div>`).join("")}</div>`
          : `<p class="note">Nothing here yet — add entries to AWARDS in data.js, or delete this section in app.js.</p>`}
      </section>`;
    $$("[data-price]", $("#main")).forEach((b) => (b.onclick = () => $("#price").showModal()));
  }

  /* ---------- works ---------- */
  function works() {
    const PER = 6;
    let cat = "All", page = 1;
    const sorted = PROJECTS.slice().sort((x, y) => (x.date < y.date ? 1 : -1));
    $("#main").innerHTML = `
      <div class="page-head"><p class="eyebrow">Selected stories</p><h1>Works</h1></div>
      <div class="filters" id="filters"></div>
      <div class="wrap"><div class="grid" id="list"></div></div>
      <div class="pager" id="pager"></div>`;
    function draw() {
      $("#filters").innerHTML = ["All", ...CATEGORIES].map((c) => `<button class="pill ${c === cat ? "on" : ""}" data-c="${esc(c)}">${esc(c)}</button>`).join("");
      const items = sorted.filter((p) => cat === "All" || p.category === cat);
      const pages = Math.max(1, Math.ceil(items.length / PER));
      page = Math.min(page, pages);
      $("#list").innerHTML = items.slice((page - 1) * PER, page * PER).map(card).join("") || `<p class="empty">No stories in this category yet.</p>`;
      $("#pager").innerHTML = pages > 1 ? Array.from({ length: pages }, (_, i) => `<button class="${i + 1 === page ? "on" : ""}" data-p="${i + 1}">${i + 1}</button>`).join("") : "";
      $$("#filters .pill").forEach((b) => (b.onclick = () => { cat = b.dataset.c; page = 1; draw(); }));
      $$("#pager button").forEach((b) => (b.onclick = () => { page = +b.dataset.p; draw(); scrollTo({ top: 0, behavior: "smooth" }); }));
    }
    draw();
  }

  /* ---------- project ---------- */
  function project() {
    const sorted = PROJECTS.slice().sort((x, y) => (x.date < y.date ? 1 : -1));
    const slug = new URLSearchParams(location.search).get("p");
    let i = sorted.findIndex((p) => p.slug === slug);
    if (i < 0) i = 0;
    const p = sorted[i], prev = sorted[i + 1], next = sorted[i - 1];
    document.title = `${p.title} — ${SITE.name}`;
    const n = p.count || (p.photos || []).length || 12;
    const shots = Array.from({ length: n }, (_, k) => (p.photos || [])[k] || null);
    const url = location.href;

    $("#main").innerHTML = `
      <article>
        <div class="pj-head">
          <p class="eyebrow">${esc(p.category)} · ${fmt(p.date)}</p>
          <h1 style="margin-top:14px">${esc(p.title)}</h1>
          <div class="pj-meta"><div class="share"><span class="eyebrow">Share</span>
            <a target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(p.title + " " + url)}">WhatsApp</a>
            <a target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}">X</a>
            <button id="copy">Copy link</button></div></div>
          <p class="pj-intro">${esc(p.intro)}</p>
          ${p.credits ? `<div class="credits">${Object.entries(p.credits).map(([k, v]) => `<div><b>${esc(k)}</b>${esc(v)}</div>`).join("")}</div>` : ""}
        </div>
        <div class="gallery">${shots.map((s, k) => `<figure class="grain" data-i="${k}">${pic(s, k + i * 3, RATIOS[(k * 7 + i) % RATIOS.length], p.title)}</figure>`).join("")}</div>
        <nav class="pj-nav">
          ${prev ? `<a href="project.html?p=${encodeURIComponent(prev.slug)}"><small>← Previous</small>${esc(prev.title)}</a>` : "<span></span>"}
          ${next ? `<a href="project.html?p=${encodeURIComponent(next.slug)}"><small>Next →</small>${esc(next.title)}</a>` : ""}
        </nav>
      </article>
      <section class="sec"><div class="sec-head"><h2>Latest</h2><a href="works.html">All works</a></div>
        <div class="grid">${sorted.filter((x) => x !== p).slice(0, 3).map(card).join("")}</div></section>`;

    $("#copy").onclick = async (e) => {
      try { await navigator.clipboard.writeText(url); e.target.textContent = "Copied ✓"; } catch { e.target.textContent = "Copy failed"; }
      setTimeout(() => (e.target.textContent = "Copy link"), 1800);
    };

    /* lightbox */
    const lb = $("#lb"), stage = $(".stage", lb);
    let cur = 0;
    const show = (k) => {
      cur = (k + n) % n;
      const s = shots[cur];
      stage.innerHTML = s ? `<img src="${esc(s)}" alt="">` : ph(cur + i * 3, RATIOS[(cur * 7 + i) % RATIOS.length]);
    };
    $$(".gallery figure").forEach((f) => (f.onclick = () => { show(+f.dataset.i); lb.showModal(); }));
    $(".close", lb).onclick = () => lb.close();
    $(".prev", lb).onclick = () => show(cur - 1);
    $(".next", lb).onclick = () => show(cur + 1);
    lb.addEventListener("click", (e) => { if (e.target === lb || e.target === stage) lb.close(); });
    lb.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(cur - 1);
      if (e.key === "ArrowRight") show(cur + 1);
    });
  }

  /* ---------- boot ---------- */
  chrome();
  const page = document.body.dataset.page;
  ({ home, works, project }[page] || (() => {}))();
})();
