import slider from "./slider.js";
const root = document.documentElement;
const pageBody = document.body;
const themeButton = document.getElementById("theme-toggle-button");
const linksMenu = document.querySelector('div[role="menubar"]');
const settingGear = document.getElementById("settings-toggle");
const settingMenu = document.getElementById("settings-sidebar");
const closeSettingBtn = document.getElementById("close-settings");
const scrollToTopBtn = document.getElementById("scroll-to-top");
const fontMenu = document.querySelector(`div[role="radiogroup"]`);
const fontButtons = document.querySelectorAll("button[data-font]");
const themeColorsGrid = document.getElementById("theme-colors-grid");
let themesButtons = [];
const resetSettings = document.getElementById("reset-settings");
const portfolioContainer = document.getElementById("portfolio-filters");
const portfolioFilter = document.querySelectorAll(".portfolio-filter");
const portfolioItems = document.querySelectorAll(".portfolio-item");

StartUp();

function StartUp() {
  LoadThemesColors();
  RegisterEvents();
  SetActiveNavLink();
}
function TogglePageMode() {
  root.classList.toggle("dark");
}

function RegisterEvents() {
  window.addEventListener("scroll", ShowScrollTopButton);
  window.addEventListener("DOMContentLoaded", SetActiveNavLink);
  window.addEventListener("hashchange", SetActiveNavLink);
  themeButton.addEventListener("click", TogglePageMode);
  settingGear.addEventListener("click", OpenSettingsMenu);
  closeSettingBtn.addEventListener("click", CloseSettingsMenu);
  scrollToTopBtn.addEventListener("click", ScrollToTop);
  slider.nextBtn.addEventListener("click", slider.ShowNextTestimonial);
  slider.prevBtn.addEventListener("click", slider.PrevNextTestimonial);

  RegisterMultiEvents(fontButtons, "click", (e) => {
    SwitchFont(e.currentTarget);
  });
  RegisterMultiEvents(themesButtons, "click", (e) =>
    SwitchThemeColor(e.target)
  );

  RegisterMultiEvents(portfolioFilter, "click", (e) =>
    ProjectsFilter(e.target)
  );

  RegisterMultiEvents(slider.indicators, "click", (e) =>
    slider.IndicatorActiveTestimonial(e.target)
  );

  resetSettings.addEventListener("click", ResetFactory);
}

function RegisterMultiEvents(inputs, event, action) {
  for (const input of inputs) {
    input.addEventListener(event, (e) => action(e));
  }
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

function OpenSettingsMenu() {
  settingGear.style.right = "20rem";
  settingMenu.classList.remove("translate-x-full");
}

function CloseSettingsMenu() {
  settingGear.style.right = "0px";
  settingMenu.classList.add("translate-x-full");
}

function SwitchFont(button) {
  console.log(button);
  const classes = Array.from(pageBody.classList);

  pageBody.classList.remove(
    classes.filter((classname) => classname.startsWith("font-"))
  );

  ToggleActiveButton(fontMenu, ".font-option.active", [
    "border-primary",
    "bg-slate-50",
    "dark:bg-slate-800",
    "active",
  ]);

  button.classList.add(
    "border-primary",
    "bg-slate-50",
    "dark:bg-slate-800",
    "active"
  );

  pageBody.classList.add(`font-${button.dataset.font}`);
}

function ToggleActiveButton(
  inputs,
  activeButtonClass,
  classesToRemove,
  classesToAdd = []
) {
  var currentActive = inputs.querySelector(activeButtonClass);

  if (currentActive) {
    currentActive.classList.remove(...classesToRemove);
    currentActive.classList.add(...classesToAdd);
  }
}

function SwitchThemeColor(button) {
  root.style.setProperty("--color-primary", `${button.dataset.primary}`);
  root.style.setProperty("--color-secondary", `${button.dataset.secondary}`);

  var currentActive = themeColorsGrid.querySelector(".ring-primary");

  if (currentActive) {
    currentActive.classList.remove(
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900"
    );
  }

  button.classList.add(
    "ring-2",
    "ring-primary",
    "ring-offset-2",
    "ring-offset-white",
    "dark:ring-offset-slate-900"
  );
}

function LoadThemesColors() {
  let themes = [
    {
      title: "Purple Blue",
      primaryColor: "#6366f1",
      secondaryColor: "#8b5cf6",
    },
    {
      title: "Pink Orange",
      primaryColor: "#ec4899",
      secondaryColor: "#f97316",
    },
    {
      title: "Green Emerald",
      primaryColor: "#10b981",
      secondaryColor: "#059669",
    },
    {
      title: "Blue Cyan",
      primaryColor: "#3b82f6",
      secondaryColor: "#06b6d4",
    },
    {
      title: "Red Rose",
      primaryColor: "#ef4444",
      secondaryColor: "#f43f5e",
    },
    {
      title: "Amber Orange",
      primaryColor: "#f59e0b",
      secondaryColor: "#ea580c",
    },
  ];

  let themesButtonsCode = "";
  themes.forEach((theme) => {
    themesButtonsCode += `
  <button
    class="w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm"
    title="${theme.title}"
    data-primary="${theme.primaryColor}"
    data-secondary="${theme.secondaryColor}"
    style="background: linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor});"
  ></button>
`;
  });

  themeColorsGrid.innerHTML = themesButtonsCode;
  themesButtons = themeColorsGrid.querySelectorAll("button[data-primary]");
}

function ResetFactory() {
  SwitchFont(fontButtons[0]);
  SwitchThemeColor(themesButtons[0]);
  CloseSettingsMenu();
}

function ScrollToTop() {
  window.scrollTo(0, 0);
}

function ShowScrollTopButton() {
  scrollToTopBtn.classList.toggle("visible", window.scrollY > 300);
  scrollToTopBtn.classList.toggle("invisible", window.scrollY <= 300);
  scrollToTopBtn.classList.toggle("opacity-0", window.scrollY <= 300);
}

function ProjectsFilter(button) {
  ToggleActiveButton(
    portfolioContainer,
    ".portfolio-filter.active",
    [
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
      "shadow-lg",
      "shadow-primary/50",
      "active",
    ],
    [
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
      "border",
      "border-slate-300",
      "dark:border-slate-700",
    ]
  );
  button.classList.add(
    "border-white",
    "bg-linear-to-r",
    "from-primary",
    "to-secondary",
    "text-white",
    "shadow-lg",
    "shadow-primary/50",
    "active"
  );
  button.classList.remove(
    "text-slate-600",
    "dark:text-slate-300",
    "border",
    "border-slate-300",
    "dark:border-slate-700"
  );

  HideAllProjects(portfolioItems);

  const filter = button.dataset.filter;
  DisplayProjects(filter);
}
function DisplayProjects(filter) {
  HideAllProjects(portfolioItems);
  setTimeout(() => {
    portfolioItems.forEach((item) => {
      if (filter === "all" || item.dataset.category === filter) {
        item.classList.remove("is-hidden");
        item.classList.remove("is-hiding");
      }
    });
  }, 500);
}

function HideAllProjects(items) {
  items.forEach((item) => {
    item.classList.add("is-hiding");

    setTimeout(() => {
      item.classList.add("is-hidden");
      item.classList.remove("is-hiding");
    }, 500);
  });
}
