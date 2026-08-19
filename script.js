const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------- nav / scroll ---------- */
document.querySelectorAll("[data-goto]").forEach((el) => {
  el.addEventListener("click", (e) => {
    const id = el.dataset.goto;
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      closeMobileNav();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
  });
});
const topbar = document.getElementById("topbar");
const scrollProgress = document.getElementById("scrollProgress");
window.addEventListener(
  "scroll",
  () => {
    topbar.classList.toggle("scrolled", window.scrollY > 10);
    const h = document.documentElement;
    const pct =
      ((h.scrollTop || document.body.scrollTop) /
        ((h.scrollHeight || document.body.scrollHeight) - h.clientHeight)) *
      100;
    scrollProgress.style.width = pct + "%";
  },
  { passive: true },
);

/* ---------- mobile nav ---------- */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
function openMobileNav() {
  mobileNav.classList.add("open");
  hamburger.classList.add("active");
  hamburger.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
  if (window.gsap) {
    gsap.fromTo(
      mobileNav.querySelectorAll("nav > *"),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, delay: 0.15 },
    );
  }
}
function closeMobileNav() {
  if (!mobileNav.classList.contains("open")) return;
  hamburger.classList.remove("active");
  hamburger.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
  mobileNav.classList.remove("open");
}
hamburger.addEventListener("click", () =>
  mobileNav.classList.contains("open") ? closeMobileNav() : openMobileNav(),
);
document
  .getElementById("mobileNavClose")
  .addEventListener("click", closeMobileNav);

/* ---------- hero entrance ---------- */
if (window.gsap && !reduceMotion) {
  const heroTl = gsap.timeline({
    delay: 0.15,
    defaults: { ease: "power3.out" },
  });
  heroTl
    .from(".eyebrow-hero", { opacity: 0, y: 14, duration: 0.5 })
    .from(
      ".line-inner",
      { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.1 },
      "-=.15",
    )
    .from(".hero-lead", { opacity: 0, y: 12, duration: 0.6 }, "-=.5")
    .from(".chip", { opacity: 0, y: 10, duration: 0.5, stagger: 0.08 }, "-=.4")
    .from(
      ".hero-actions > *",
      { opacity: 0, y: 10, duration: 0.5, stagger: 0.08 },
      "-=.3",
    )
    .to(
      ".garland path",
      { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" },
      "-=1",
    )
    .to(
      ".garland circle",
      { opacity: 1, duration: 0.4, stagger: 0.08 },
      "-=1.2",
    )
    .to(".portrait-card", { opacity: 1, duration: 0.9 }, "-=1")
    .to(".stamp", { opacity: 1, duration: 0.6, ease: "back.out(2)" }, "-=.4");
} else {
  document
    .querySelectorAll(
      ".garland path,.garland circle,.portrait-card,.stamp,.line-inner",
    )
    .forEach((el) => {
      el.style.opacity = 1;
      el.style.strokeDashoffset = 0;
    });
}

/* ---------- petal ambience ---------- */
if (!reduceMotion) {
  const field = document.getElementById("petalField");
  const colors = ["#dfa03d", "#b97a24", "#c1546a"];
  const count = window.innerWidth < 640 ? 8 : 14;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    const size = 6 + Math.random() * 7;
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.left = Math.random() * 100 + "%";
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.opacity = (0.35 + Math.random() * 0.35).toFixed(2);
    field.appendChild(p);
    if (window.gsap) {
      gsap.to(p, {
        y: (window.innerHeight || 700) * 1.15,
        x: "+=" + (Math.random() * 120 - 60),
        rotation: Math.random() * 360,
        duration: 10 + Math.random() * 10,
        delay: Math.random() * 8,
        repeat: -1,
        ease: "none",
      });
    }
  }
}

/* ---------- scroll reveals ---------- */
if (window.gsap && window.ScrollTrigger) {
  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });
  document.querySelectorAll(".reveal-stagger").forEach((container) => {
    gsap.to(container.children, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: container, start: "top 85%" },
    });
  });
}

/* ---------- gallery data ---------- */
const photos = [
  {
    cat: "Traditions",
    title: "Evening Aarti",
    note: "A small flame, lit every evening without fail.",
    wide: false,
    src: "aman1.jpeg",
    full: "aman1.jpeg",
  },
  {
    cat: "Traditions",
    title: "Circle of Light",
    note: "Diyas placed together for a family celebration.",
    wide: true,
    src: "aman2.jpeg",
    full: "aman2.jpeg",
  },
  {
    cat: "Traditions",
    title: "Warmth of Home",
    note: "Every festival begins with a lamp at the doorstep.",
    wide: false,
    src: "aman3.jpeg",
    full: "aman3.jpeg",
  },
  {
    cat: "Traditions",
    title: "Small Flames, Big Meaning",
    note: "Simple rituals, carried on from his parents' home.",
    wide: false,
    src: "aman4.jpeg",
    full: "aman4.jpeg",
  },

  {
    cat: "Journey",
    title: "On the Rails",
    note: "Miles of steady, disciplined work — day and night.",
    wide: false,
    src: "aman5.jpeg",
    full: "aman5.jpeg",
  },
];

const grid = document.getElementById("galleryGrid");
const lbThumbs = document.getElementById("lbThumbs");
let currentList = photos.slice();
let galleryEverRevealed = false;

function render(filterName) {
  currentList =
    filterName === "All"
      ? photos.slice()
      : photos.filter((p) => p.cat === filterName);
  grid.innerHTML = "";
  currentList.forEach((p, i) => {
    const item = document.createElement("div");
    item.className = "g-item" + (p.wide ? " wide" : "");
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", "Open photo: " + p.title);
    item.innerHTML = `<img src="${p.src}" alt="${p.title}" loading="lazy" decoding="async"><span class="g-tag">${p.cat}</span><span class="g-zoom"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/></svg></span><div class="g-overlay"><strong>${p.title}</strong><span>${p.note}</span></div>`;
    item.addEventListener("click", () => openLightbox(i));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(i);
      }
    });
    grid.appendChild(item);
  });
  buildThumbs();
  revealGalleryItems();
}

function revealGalleryItems() {
  const items = grid.querySelectorAll(".g-item");
  if (!window.gsap || reduceMotion) {
    return;
  }
  gsap.set(items, { opacity: 0, y: 22, scale: 0.97 });
  const play = () =>
    gsap.to(items, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.05,
      ease: "power3.out",
    });
  if (!galleryEverRevealed && window.ScrollTrigger) {
    ScrollTrigger.create({
      trigger: "#gallery",
      start: "top 80%",
      once: true,
      onEnter: () => {
        play();
        galleryEverRevealed = true;
      },
    });
  } else {
    play();
  }
}

render("All");

document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  document.querySelectorAll(".filter").forEach((f) => {
    f.classList.remove("active");
    f.setAttribute("aria-pressed", "false");
  });
  btn.classList.add("active");
  btn.setAttribute("aria-pressed", "true");
  render(btn.dataset.filter);
});

/* ---------- lightbox ---------- */
const lightbox = document.getElementById("lightbox");
const lightboxInner = document.querySelector(".lightbox-inner");
const lbImg = document.getElementById("lightboxImage");
const lbTitle = document.getElementById("lightboxTitle");
const lbNote = document.getElementById("lightboxNote");
const lbCount = document.getElementById("lightboxCount");
const lbSpinner = document.getElementById("lbSpinner");
let current = 0;

function buildThumbs() {
  lbThumbs.innerHTML = "";
  currentList.forEach((p, i) => {
    const b = document.createElement("button");
    b.className = "lb-thumb";
    b.setAttribute("aria-label", "Go to " + p.title);
    b.innerHTML = `<img src="${p.src}" alt="" loading="lazy">`;
    b.addEventListener("click", () => goTo(i));
    lbThumbs.appendChild(b);
  });
}

function preload(p) {
  if (p) {
    const im = new Image();
    im.src = p.full;
  }
}

function openLightbox(i) {
  current = i;
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
  if (window.gsap) {
    gsap.fromTo(lightbox, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(
      lightboxInner,
      { opacity: 0, scale: 0.94, y: 16 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out" },
    );
  } else {
    lightbox.style.opacity = 1;
    lightboxInner.style.opacity = 1;
  }
  updateLightbox(true);
}

function closeLightbox() {
  document.body.style.overflow = "";
  if (window.gsap) {
    gsap.to(lightboxInner, { opacity: 0, scale: 0.96, y: 10, duration: 0.25 });
    gsap.to(lightbox, {
      opacity: 0,
      duration: 0.3,
      delay: 0.05,
      onComplete: () => lightbox.classList.remove("open"),
    });
  } else {
    lightbox.classList.remove("open");
  }
}

function updateLightbox(first) {
  const p = currentList[current];
  if (!p) return;
  lbSpinner.classList.add("show");
  const swap = () => {
    lbImg.src = p.full;
    lbImg.alt = p.title;
    lbImg.onload = () => lbSpinner.classList.remove("show");
    lbTitle.textContent = p.title;
    lbNote.textContent = p.note;
    lbCount.textContent = current + 1 + " / " + currentList.length;
    document
      .querySelectorAll(".lb-thumb")
      .forEach((t, idx) => t.classList.toggle("active", idx === current));
    const activeThumb = lbThumbs.children[current];
    if (activeThumb)
      activeThumb.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    preload(currentList[(current + 1) % currentList.length]);
    preload(
      currentList[(current - 1 + currentList.length) % currentList.length],
    );
  };
  if (first || !window.gsap) {
    swap();
    if (window.gsap)
      gsap.fromTo(lbImg, { opacity: 0 }, { opacity: 1, duration: 0.35 });
  } else {
    gsap.to(lbImg, {
      opacity: 0,
      duration: 0.15,
      onComplete: () => {
        swap();
        gsap.to(lbImg, { opacity: 1, duration: 0.3 });
      },
    });
  }
}

function goTo(i) {
  current = i;
  updateLightbox(false);
}
function nextImg() {
  goTo((current + 1) % currentList.length);
}
function prevImg() {
  goTo((current - 1 + currentList.length) % currentList.length);
}

document.getElementById("close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.getElementById("next").addEventListener("click", nextImg);
document.getElementById("prev").addEventListener("click", prevImg);
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImg();
  if (e.key === "ArrowLeft") prevImg();
});

/* swipe support */
let touchStartX = 0;
document.getElementById("lightboxArt").addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  { passive: true },
);
document.getElementById("lightboxArt").addEventListener(
  "touchend",
  (e) => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 50) {
      dx < 0 ? nextImg() : prevImg();
    }
  },
  { passive: true },
);
