const questions = document.querySelectorAll(".gear-faq-question");

questions.forEach(function (question) {
    question.addEventListener("click", function () {
        const item = question.parentElement;
        const answer = question.nextElementSibling;

        if (item.classList.contains("open")) {
            item.classList.remove("open");
            answer.style.maxHeight = null;
        } else {
            item.classList.add("open");
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});
