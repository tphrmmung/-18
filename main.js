const loginForm = document.querySelector(".login-form");

const validateInput = (inputObj) => {
  const errors = {};

  if (!inputObj.username || inputObj.username.trim() === "") {
    errors.username = "กรุณากรอกชื่อผู้ใช้";
  } else {
    const trimmedUsername = inputObj.username.trim();
    if (trimmedUsername.length < 4) {
      errors.username = "ชื่อผู้ใช้อย่างน้อย 4 ตัวอักษร";
    } else if (/^\d/.test(trimmedUsername)) {
      errors.username = "ชื่อผู้ใช้ห้ามขึ้นต้นด้วยตัวเลข";
    } else if (/\s/.test(trimmedUsername)) {
      errors.username = "ชื่อผู้ใช้ห้ามมีช่องว่าง";
    }
  }

  if (!inputObj.password || inputObj.password.trim() === "") {
    errors.password = "กรุณากรอกรหัสผ่าน";
  } else {
    const trimmedPassword = inputObj.password.trim();
    if (trimmedPassword.length < 5) {
      errors.password = "รหัสผ่านต้องมีอย่างน้อย 5 ตัวอักษร";
    } else if (
      !/\d/.test(trimmedPassword) ||
      !/[a-zA-Z]/.test(trimmedPassword)
    ) {
      errors.password = "รหัสผ่านต้องมีทั้งตัวเลขและตัวอักษร";
    }
  }

  return errors;
};

const displayErrors = (errors) => {
  for (const inputId in errors) {
    const inputElement = document.getElementById(inputId);
    inputElement.style.border = "2px solid red";
    inputElement.style.backgroundColor = "#ffe5e5";
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = errors[inputId];
    inputElement.parentNode.appendChild(errorElement);
  }
};

const supavit = () => {
  //clearerror
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((errorMessage) => errorMessage.remove());

  const formInputs = document.querySelectorAll(".login-form input");
  formInputs.forEach((input) => (input.style.border = ""));
};

const hdlLogin = (e) => {
  e.preventDefault();

  supavit();

  const inputObj = {};
  for (const el of loginForm.elements) {
    if (el.type !== "submit") {
      inputObj[el.id] = el.value;
    }
  }

  const errors = validateInput(inputObj);

  if (Object.keys(errors).length === 0) {
    window.location.href = "https://www.example.com";
  } else {
    displayErrors(errors);
  }
};

loginForm.addEventListener("submit", hdlLogin);
