import { ToggleActiveButton, RegisterMultiEvents } from "./utils.js";
const root = document.documentElement;
const pageBody = document.body;
const settingGear = document.getElementById("settings-toggle");
const settingMenu = document.getElementById("settings-sidebar");
const closeSettingBtn = document.getElementById("close-settings");
const fontMenu = document.querySelector(`div[role="radiogroup"]`);
const fontButtons = document.querySelectorAll("button[data-font]");
const themeColorsGrid = document.getElementById("theme-colors-grid");
let themesButtons = [];
const resetSettings = document.getElementById("reset-settings");

function OpenSettingsMenu() {
  settingGear.style.right = "20rem";
  settingMenu.classList.remove("translate-x-full");
}

function CloseSettingsMenu() {
  settingGear.style.right = "0px";
  settingMenu.classList.add("translate-x-full");
}

function SwitchFont(button) {
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

function RegisterEvents() {
  settingGear.addEventListener("click", OpenSettingsMenu);
  closeSettingBtn.addEventListener("click", CloseSettingsMenu);
  resetSettings.addEventListener("click", ResetFactory);
  RegisterMultiEvents(fontButtons, "click", (e) => {
    SwitchFont(e.currentTarget);
  });
  RegisterMultiEvents(themesButtons, "click", (e) =>
    SwitchThemeColor(e.target)
  );
}

const sidebar = {
  settingGear,
  closeSettingBtn,
  OpenSettingsMenu,
  CloseSettingsMenu,
  SwitchFont,
  SwitchThemeColor,
  LoadThemesColors,
  ResetFactory,
  RegisterEvents,
};

export default sidebar;
