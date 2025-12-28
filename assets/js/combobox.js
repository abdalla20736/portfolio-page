import { RegisterMultiEvents } from "./utils.js";
const comboxBoxes = document.querySelectorAll("div[role='combobox']");
const comboboxOptions = document.querySelectorAll(".custom-options");

function ComboBox(e) {
  comboxBoxes.forEach((box) => {
    let options = box.nextElementSibling;
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

function comboboxOptionsSelect(e) {
  let combobox = e.target.closest(".custom-options").previousElementSibling;
  let comboboxText = combobox.querySelector("span");
  comboboxText.innerText = e.target.innerText;
  comboboxText.classList.replace("dark:text-slate-400", "dark:text-white");
  comboboxText.classList.replace("text-slate-500", "text-slate-800");
  combobox.nextElementSibling.classList.add("hidden");
  combobox.querySelector("i").style.transform = "rotate(0deg)";
}

function RegisterEvents() {
  RegisterMultiEvents(comboxBoxes, "click", (e) => ComboBox(e));
  RegisterMultiEvents(comboboxOptions, "click", (e) =>
    comboboxOptionsSelect(e)
  );
}

const combobox = {
  RegisterEvents,
};
export default combobox;
