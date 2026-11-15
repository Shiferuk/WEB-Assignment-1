const ratingBlocks = document.querySelectorAll(".team-rating");

ratingBlocks.forEach(function (block) {
    const teamName = block.dataset.team;
    const stars = block.querySelectorAll(".star");
    const ratingText = block.querySelector(".rating-text");

    stars.forEach(function (star) {
        star.addEventListener("click", function () {
            const value = Number(star.dataset.value);

            stars.forEach(function (item, index) {
                item.style.color = index < value ? "#eb7404" : "#cccccc";
            });

            ratingText.textContent = "You rated " + teamName + " " + value + " / 5";

            star.style.transform = "scale(1.5)";
            setTimeout(function () {
                star.style.transform = "";
            }, 200);

        });
    });
});
