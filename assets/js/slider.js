const nextBtn = document.getElementById("next-testimonial");
const prevBtn = document.getElementById("prev-testimonial");
const carousel = document.getElementById("testimonials-carousel");
const slides = document.querySelectorAll(".testimonial-card");
const indicators = document.querySelectorAll(".carousel-indicator");
let currentTranslateX = 0;
let lastActiveIndicator = indicators[0];
IndicatorActiveTestimonial(lastActiveIndicator);
function ShowNextTestimonial() {
  currentTranslateX -= 33.33;
  if (currentTranslateX < 0) {
    currentTranslateX = 99.99;
  }
  carousel.style.setProperty("transform", `translateX(${currentTranslateX}%)`);
}

function PrevNextTestimonial() {
  currentTranslateX -= 33.33;

  if (currentTranslateX < 0) {
    currentTranslateX = 99.99;
  }
  carousel.style.setProperty("transform", `translateX(${currentTranslateX}%)`);
}

function IndicatorActiveTestimonial(indicator) {
  lastActiveIndicator.classList.remove("active", "bg-accent", "scale-125");
  lastActiveIndicator.classList.add("bg-slate-400", "dark:bg-slate-600");
  lastActiveIndicator = indicator;
  let index = indicator.getAttribute("data-index");

  if (index >= indicators.length) {
    index = 0;
  }
  indicators[index].classList.add("active", "bg-accent", "scale-125");
  indicators[index].classList.remove("bg-slate-400", "dark:bg-slate-600");
  carousel.style.setProperty("transform", `translateX(${index * 33.33}%)`);
}

const slider = {
  nextBtn,
  prevBtn,
  indicators,
  ShowNextTestimonial,
  PrevNextTestimonial,
  IndicatorActiveTestimonial,
};

export default slider;
