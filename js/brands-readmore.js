const readMoreButtons = document.querySelectorAll(".read-more");

readMoreButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const extraInfo = button.previousElementSibling;

        if (extraInfo.style.display === "block") {
            extraInfo.style.display = "none";
            button.textContent = "Read More";
        } else {
            extraInfo.style.display = "block";
            button.textContent = "Read Less";
        }

    });
});
