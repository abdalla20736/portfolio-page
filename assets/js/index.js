import slider from "./slider.js";
import validator from "./validator.js";
import sideBar from "./sidebar.js";
import portfolioFilter from "./portfoliofilter.js";
import comboxBoxes from "./combobox.js";
import storage from "./storage.js";

const themeButton = document.getElementById("theme-toggle-button");
const linksMenu = document.querySelector('div[role="menubar"]');
const scrollToTopBtn = document.getElementById("scroll-to-top");
const form = document.querySelector("form");
let isScrollAble = false;
let timeoutId = null;
StartUp();

function StartUp() {
  LoadCachedMode();
  sideBar.LoadThemesColors();
  sideBar.LoadCachedTheme();
  sideBar.LoadCachedFont();
  RegisterEvents();
  SetActiveNavLink();
}

function RegisterEvents() {
  window.addEventListener("scroll", ShowScrollTopButton);
  window.addEventListener("DOMContentLoaded", SetActiveNavLink);
  window.addEventListener("hashchange", SetActiveNavLink);
  window.addEventListener("scroll", ScrollSpy);
  themeButton.addEventListener("click", TogglePageMode);
  scrollToTopBtn.addEventListener("click", ScrollToTop);
  form.addEventListener("submit", (e) => submitForm(e));

  sideBar.RegisterEvents();
  slider.RegisterEvents();
  validator.RegisterEvents();
  portfolioFilter.RegisterEvents();
  comboxBoxes.RegisterEvents();
}

function ShowScrollTopButton() {
  scrollToTopBtn.classList.toggle("visible", window.scrollY > 300);
  scrollToTopBtn.classList.toggle("invisible", window.scrollY <= 300);
  scrollToTopBtn.classList.toggle("opacity-0", window.scrollY <= 300);
}

function SetActiveNavLink() {
  isScrollAble = false;

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  const currentHash = window.location.hash;
  const links = linksMenu.querySelectorAll("a[role='menuitem']");

  timeoutId = setTimeout(() => {
    links.forEach((link) => link.classList.remove("active"));
    links.forEach((link, index) => {
      if (
        link.getAttribute("href") === currentHash ||
        (!currentHash && index === 0)
      ) {
        link.classList.add("active");
        isScrollAble = true;
      }
    });
  }, 1500);
}

function TogglePageMode() {
  var root = document.documentElement;
  root.classList.toggle("dark");
  root.classList.contains("dark") ? storage.CacheThemeMode("dark") : null;
}

function LoadCachedMode() {
  const cachedMode = storage.LoadCachedThemeMode();
  cachedMode != "dark"
    ? document.documentElement.classList.remove("dark")
    : null;
}

function ScrollSpy() {
  if (!isScrollAble) return;
  const sections = document.querySelectorAll("section");
  const scrollY = window.pageYOffset;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 50;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      linksMenu.querySelectorAll("a[role='menuitem']").forEach((link) => {
        link.classList.remove("active");
      });

      linksMenu
        .querySelector("a[href*=" + sectionId + "]")
        .classList.add("active");
    }
  });
}

function ScrollToTop() {
  window.scrollTo(0, 0);
}

function submitForm(e) {
  if (validator.ValidateForm()) {
    OnSuccessMsgShow();
    form.reset();
  }

  e.preventDefault();
}

function OnSuccessMsgShow() {
  let popupMsg = `<div class="fixed inset-0 flex items-center justify-center z-50 bg-slate-950/80 backdrop-blur-sm">
    <div class="bg-slate-800 rounded-2xl p-8 max-w-md mx-4 text-center border border-slate-700 shadow-2xl transform animate-fade-in">
      <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <i class="text-4xl text-white" data-fa-i2svg="">
          <svg
            class="svg-inline--fa fa-check"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="check"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            data-fa-i2svg=""
          >
            <path
              fill="currentColor"
              d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
            ></path>
          </svg>
        </i>
      </div>
      <h3 class="text-2xl font-bold mb-3">تم إرسال رسالتك بنجاح!</h3>
      <p class="text-slate-400 mb-6">
        شكراً لتواصلك. سأرد عليك في أقرب وقت ممكن.
      </p>
      <button class="success-popup-close bg-gradient-to-r from-primary to-secondary px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300">
        حسناً
      </button>
    </div>
  </div>`;
  document.body.insertAdjacentHTML("beforeend", popupMsg);
  const msgBox = document.querySelector(
    ".fixed.inset-0.flex.items-center.justify-center"
  );
  const closeBtn = msgBox.querySelector(".success-popup-close");

  closeBtn.addEventListener("click", () => {
    document;
    msgBox.remove();
  });

  setTimeout(() => {
    closeBtn.click();
  }, 3000);
}
