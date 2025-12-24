import slider from "./slider.js";
import validator from "./validator.js";
import sideBar from "./sidebar.js";
import portfolioFilter from "./portfoliofilter.js";
import { ToggleActiveButton, RegisterMultiEvents } from "./utils.js";

const themeButton = document.getElementById("theme-toggle-button");
const linksMenu = document.querySelector('div[role="menubar"]');
const scrollToTopBtn = document.getElementById("scroll-to-top");
const form = document.querySelector("form");

StartUp();

function StartUp() {
  sideBar.LoadThemesColors();
  RegisterEvents();
  SetActiveNavLink();
}
function TogglePageMode() {
  document.documentElement.classList.toggle("dark");
}
function submitForm(e) {
  if (validator.ValidateForm()) {
    alert("Form submitted successfully!");
  }

  e.preventDefault();
}
function RegisterEvents() {
  window.addEventListener("scroll", ShowScrollTopButton);
  window.addEventListener("DOMContentLoaded", SetActiveNavLink);
  window.addEventListener("hashchange", SetActiveNavLink);
  themeButton.addEventListener("click", TogglePageMode);
  scrollToTopBtn.addEventListener("click", ScrollToTop);

  form.addEventListener("submit", (e) => submitForm(e));
  sideBar.RegisterEvents();
  slider.RegisterEvents();
  validator.RegisterEvents();
  portfolioFilter.RegisterEvents();
}

function SetActiveNavLink() {
  const currentHash = window.location.hash;

  linksMenu.querySelectorAll("a[role='menuitem']").forEach((link, index) => {
    link.classList.remove("active");

    setTimeout(() => {
      if (link.getAttribute("href") === currentHash) {
        link.classList.add("active");
      } else if (!currentHash && index === 0) {
        link.classList.add("active");
      }
    }, 1000);
  });
}

function ScrollToTop() {
  window.scrollTo(0, 0);
}

function ShowScrollTopButton() {
  scrollToTopBtn.classList.toggle("visible", window.scrollY > 300);
  scrollToTopBtn.classList.toggle("invisible", window.scrollY <= 300);
  scrollToTopBtn.classList.toggle("opacity-0", window.scrollY <= 300);
}
