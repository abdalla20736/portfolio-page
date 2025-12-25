import { ToggleActiveButton, RegisterMultiEvents } from "./utils.js";
const portfolioContainer = document.getElementById("portfolio-filters");
const portfolioFilters = document.querySelectorAll(".portfolio-filter");
const portfolioItems = document.querySelectorAll(".portfolio-item");

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

function RegisterEvents() {
  RegisterMultiEvents(portfolioFilters, "click", (e) =>
    ProjectsFilter(e.target)
  );
}
const portfolioFilter = {
  RegisterEvents,
};

export default portfolioFilter;
