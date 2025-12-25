import slider from "./slider.js";
import validator from "./validator.js";
import sideBar from "./sidebar.js";
import portfolioFilter from "./portfoliofilter.js";
import { RegisterMultiEvents } from "./utils.js";

const themeButton = document.getElementById("theme-toggle-button");
const linksMenu = document.querySelector('div[role="menubar"]');
const scrollToTopBtn = document.getElementById("scroll-to-top");
const form = document.querySelector("form");
const comboxBoxes = document.querySelectorAll("div[role='combobox']");

StartUp();

function StartUp() {
  sideBar.LoadThemesColors();
  RegisterEvents();
  SetActiveNavLink();
}

function RegisterEvents() {
  window.addEventListener("scroll", ShowScrollTopButton);
  window.addEventListener("DOMContentLoaded", SetActiveNavLink);
  window.addEventListener("hashchange", SetActiveNavLink);
  themeButton.addEventListener("click", TogglePageMode);
  scrollToTopBtn.addEventListener("click", ScrollToTop);
  form.addEventListener("submit", (e) => submitForm(e));
  RegisterMultiEvents(comboxBoxes, "click", (e) => ComboBox(e));
  sideBar.RegisterEvents();
  slider.RegisterEvents();
  validator.RegisterEvents();
  portfolioFilter.RegisterEvents();
}

function ShowScrollTopButton() {
  scrollToTopBtn.classList.toggle("visible", window.scrollY > 300);
  scrollToTopBtn.classList.toggle("invisible", window.scrollY <= 300);
  scrollToTopBtn.classList.toggle("opacity-0", window.scrollY <= 300);
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

function TogglePageMode() {
  document.documentElement.classList.toggle("dark");
}

function ScrollToTop() {
  window.scrollTo(0, 0);
}

function submitForm(e) {
  if (validator.ValidateForm()) {
    alert("Form submitted successfully!");
  }

  e.preventDefault();
}

function ComboBox(e) {
  comboxBoxes.forEach((box) => {
    if (box !== e.target && !box.contains(e.target)) {
      box.nextElementSibling.classList.add("hidden");
      box.querySelector("i").style.transform = "rotate(0deg)";
    } else {
      box.nextElementSibling.classList.toggle("hidden");
      box.querySelector("i").style.transform =
        box.nextElementSibling.classList.contains("hidden")
          ? "rotate(0deg)"
          : "rotate(180deg)";
    }
  });
}
