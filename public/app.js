const progress = document.querySelector(".page-progress");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const dots = [...document.querySelectorAll(".slide-dots a")];
const slides = [...document.querySelectorAll(".slide")];

function currentSlide() {
  return slides.findLast((slide) => slide.getBoundingClientRect().top < 140) || slides[0];
}

function syncNav() {
  const id = currentSlide().id;
  navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`));
  dots.forEach((dot) => dot.classList.toggle("is-active", dot.dataset.slide === id));
}

window.addEventListener("scroll", () => {
  const max = document.body.scrollHeight - window.innerHeight;
  progress.style.width = `${Math.max(0, Math.min(1, window.scrollY / max)) * 100}%`;
  syncNav();
});

window.addEventListener("keydown", (event) => {
  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
  event.preventDefault();
  const index = slides.indexOf(currentSlide());
  const next = event.key === "ArrowDown" ? slides[index + 1] : slides[index - 1];
  next?.scrollIntoView({ behavior: "smooth" });
});

syncNav();

/* reveal on scroll */
const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-visible"); }),
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
