const fullNameInput = document.getElementById("full-name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const projectDescriptionInput = document.getElementById("project-details");

function ValidateForm() {
  let isValid = true;
  var regex;
  var msg;

  regex = /^[A-Za-z\u0600-\u06FF ]{1,}$/;
  msg = `يرجى إدخال الاسم الكامل`;
  if (!ValidateInput(fullNameInput, regex, msg)) isValid = false;

  regex = /^(010|015|011|012)[0-9]{8}$/;
  msg = `يرجى إدخال رقم هاتف صحيح`;
  if (!ValidateInput(phoneInput, regex, msg, false)) isValid = false;

  regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  msg =
    emailInput.value === ""
      ? `يرجى إدخال البريد الإلكتروني`
      : `يرجى إدخال بريد إلكتروني صحيح`;
  if (!ValidateInput(emailInput, regex, msg)) isValid = false;

  regex = /^[a-zA-Z\u0600-\u06FF]{10,}$/;
  msg =
    projectDescriptionInput.value === ""
      ? `يرجى إدخال تفاصيل المشروع`
      : `يرجى إدخال المزيد من التفاصيل`;
  if (!ValidateInput(projectDescriptionInput, regex, msg)) isValid = false;

  return isValid;
}

function ValidateInput(Input, regex, msg, validateEmpty = true) {
  var validationText = Input.parentElement.querySelector(".validation-output");
  validationText.innerHTML = msg;

  if (validateEmpty && Input.value === "") {
    validationText.classList.replace("hidden", "block");
    return false;
  }
  if (!regex.test(Input.value) && Input.value != "") {
    validationText.classList.replace("hidden", "block");
    return false;
  }
  return true;
}

function resetValidation(input) {
  var validationText = input.parentElement.querySelector(".validation-output");
  validationText.classList.replace("block", "hidden");
}

function RegisterEvents() {
  fullNameInput.addEventListener("input", (e) => resetValidation(e.target));
  phoneInput.addEventListener("input", (e) => resetValidation(e.target));
  emailInput.addEventListener("input", (e) => resetValidation(e.target));
  projectDescriptionInput.addEventListener("input", (e) =>
    resetValidation(e.target)
  );
}
const validator = {
  fullNameInput,
  phoneInput,
  emailInput,
  projectDescriptionInput,
  ValidateForm,
  resetValidation,
  RegisterEvents,
};

export default validator;
