const popup = document.getElementById("alertPopup");
const openButton = document.getElementById("openAlertPopup");
const closeButton = document.getElementById("closeAlertPopup");
const form = document.getElementById("alertForm");
const emailInput = document.getElementById("alertEmail");
const errorBox = emailInput.nextElementSibling;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(text) {
    emailInput.classList.add("is-invalid");
    errorBox.textContent = text;
}

function clearError() {
    emailInput.classList.remove("is-invalid");
    errorBox.textContent = "";
}

function closePopup() {
    popup.classList.remove("open");
    clearError();
}

openButton.addEventListener("click", function () {
    popup.classList.add("open");
});

closeButton.addEventListener("click", closePopup);

popup.addEventListener("click", function (event) {
    if (event.target === popup) {
        closePopup();
    }
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = emailInput.value.trim();

    if (email === "") {
        showError("Email is required.");
    } else if (!emailPattern.test(email)) {
        showError("Enter a valid email, for example name@example.com.");
    } else {
        clearError();
        document.dispatchEvent(new CustomEvent("alert:valid"));
    }
});
