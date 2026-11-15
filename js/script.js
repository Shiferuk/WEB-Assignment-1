$(document).ready(function () {
    function escapeRegExp(text) {
        return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function escapeHtml(text) {
        return $("<div>").text(text).html();
    }

    function markText(text, query) {
        var regex = new RegExp("(" + escapeRegExp(query) + ")", "gi");
        return text.split(regex).map(function (part, index) {
            return index % 2 === 1 ? "<strong>" + escapeHtml(part) + "</strong>" : escapeHtml(part);
        }).join("");
    }

    function throttle(fn, wait) {
        var timer = null;
        return function () {
            if (timer) {
                return;
            }
            timer = setTimeout(function () {
                timer = null;
                fn();
            }, wait);
        };
    }

    function showToast(message) {
        var $box = $("#toastBox");

        if (!$box.length) {
            $box = $('<div id="toastBox" class="toast-box" aria-live="polite"></div>').appendTo("body");
        }

        $("<div>", { "class": "toast-item", role: "status", text: message })
            .hide()
            .appendTo($box)
            .fadeIn(250)
            .delay(2800)
            .fadeOut(500, function () {
                $(this).remove();
            });
    }

    function loadVisibleImages() {
        var limit = $(window).scrollTop() + $(window).height() + 150;

        $("img.lazy[data-src]").each(function () {
            var $img = $(this);

            if (!$img.is(":visible") || $img.offset().top > limit) {
                return;
            }

            $img.one("load error", function () {
                $img.addClass("lazy-loaded");
            });
            $img.attr("src", $img.attr("data-src")).removeAttr("data-src");
        });
    }

    function initLazyLoad() {
        var onScroll = throttle(loadVisibleImages, 100);

        $(window).on("scroll resize", onScroll);
        $(window).on("load", loadVisibleImages);
        $(document).on("products:rendered", loadVisibleImages);
        loadVisibleImages();
    }

    function initMenuKeys() {
        var $links = $(".site-navbar .nav-link");

        $(".site-navbar").on("keydown", function (event) {
            var index = $links.index(document.activeElement);
            var last = $links.length - 1;
            var next;

            if (index === -1) {
                return;
            }

            switch (event.key) {
                case "ArrowRight":
                case "ArrowDown":
                    next = index === last ? 0 : index + 1;
                    break;
                case "ArrowLeft":
                case "ArrowUp":
                    next = index === 0 ? last : index - 1;
                    break;
                case "Home":
                    next = 0;
                    break;
                case "End":
                    next = last;
                    break;
                default:
                    return;
            }

            event.preventDefault();
            $links.eq(next).trigger("focus");
        });
    }

    function initSubscribeSpinner() {
        var $form = $("#alertForm");
        if (!$form.length) {
            return;
        }

        var $btn = $("#subscribeBtn");
        var $input = $("#alertEmail");
        var original = $btn.html();

        $(document).on("alert:valid", function () {
            $btn.prop("disabled", true).html('<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Please wait\u2026');
            $input.prop("disabled", true);

            setTimeout(function () {
                $btn.prop("disabled", false).html(original);
                $input.prop("disabled", false);
                $form[0].reset();

                $("#closeAlertPopup").trigger("click");
                showToast("Subscribed! You will get price alerts.");
            }, 2000);
        });
    }

    function initStoreSearch() {
        var $input = $("#storeSearch");
        if (!$input.length || typeof store === "undefined") {
            return;
        }

        var $list = $("#suggestList");
        var $count = $("#productCount");
        var $empty = $("#noResults");
        var activeIndex = -1;
        var lastValue = null;

        function query() {
            return $input.val().trim().toLowerCase();
        }

        function applyFilter() {
            var q = query();
            var $cards = $("#productsGrid .product-card");
            var $matched = q === "" ? $cards : $cards.filter(function () {
                return $(this).text().toLowerCase().indexOf(q) > -1;
            });

            $cards.not($matched).addClass("search-hidden");
            $matched.removeClass("search-hidden");

            $count.text("Showing " + $matched.length + " of " + store.products.length + " products");
            $empty.toggleClass("open", $matched.length === 0);
            loadVisibleImages();
        }

        function closeList() {
            $list.removeClass("open").empty();
            $input.attr("aria-expanded", "false");
            activeIndex = -1;
        }

        function setActive(index) {
            activeIndex = index;
            $list.children().removeClass("active").eq(index).addClass("active");
        }

        function renderSuggestions() {
            var q = query();
            closeList();

            if (q === "") {
                return;
            }

            var items = store.products.filter(function (product) {
                return (product.name + " " + product.brand + " " + product.category).toLowerCase().indexOf(q) > -1;
            }).slice(0, 6);

            if (!items.length) {
                return;
            }

            items.forEach(function (product) {
                $("<li>", { "class": "suggest-item", role: "option" })
                    .attr("data-value", product.name)
                    .append($("<span>").html(markText(product.name, q)))
                    .append($("<small>").text(product.brand + " \u2022 " + product.category))
                    .appendTo($list);
            });

            $list.addClass("open");
            $input.attr("aria-expanded", "true");
        }

        function choose(value) {
            $input.val(value);
            lastValue = value;
            closeList();
            applyFilter();
        }

        $input.on("input keyup search", function (event) {
            if (event.type === "keyup" && ["ArrowUp", "ArrowDown", "Enter", "Escape", "Tab"].indexOf(event.key) > -1) {
                return;
            }

            var value = $input.val();
            if (value === lastValue) {
                return;
            }

            lastValue = value;
            applyFilter();
            renderSuggestions();
        });

        $input.on("keydown", function (event) {
            var total = $list.children().length;

            switch (event.key) {
                case "ArrowDown":
                    if (total) {
                        event.preventDefault();
                        setActive((activeIndex + 1) % total);
                    }
                    break;
                case "ArrowUp":
                    if (total) {
                        event.preventDefault();
                        setActive((activeIndex - 1 + total) % total);
                    }
                    break;
                case "Enter":
                    if (activeIndex > -1) {
                        event.preventDefault();
                        choose($list.children().eq(activeIndex).attr("data-value"));
                    }
                    break;
                case "Escape":
                    closeList();
                    break;
            }
        });

        $input.on("focus", function () {
            if (query() !== "") {
                renderSuggestions();
            }
        });

        $list.on("mousedown", ".suggest-item", function (event) {
            event.preventDefault();
            choose($(this).attr("data-value"));
        });

        $(document).on("click", function (event) {
            if (!$(event.target).closest("#storeSearchWrap").length) {
                closeList();
            }
        });

        $(document).on("products:rendered", applyFilter);
    }

    // DAY / NIGHT MODE (button #themeToggle, choice is remembered in localStorage)
    function initThemeToggle() {
        const themeToggle = document.getElementById("themeToggle");
        const themeToggleBottom = document.getElementById("themeToggleBottom");

        function updateThemeButtons() {
            const isNight = document.body.classList.contains("night-mode");

            if (themeToggle) {
                themeToggle.textContent = isNight ? "☀️ Day Mode" : "🌙 Night Mode";
                themeToggle.setAttribute("aria-pressed", isNight ? "true" : "false");
            }

            if (themeToggleBottom) {
                themeToggleBottom.textContent = isNight ? "☀️ Switch to Day" : "🌙 Switch to Night";
                themeToggleBottom.setAttribute("aria-pressed", isNight ? "true" : "false");
            }
        }

        function toggleTheme() {
            document.body.classList.toggle("night-mode");
            const isNight = document.body.classList.contains("night-mode");

            try {
                localStorage.setItem("nbaTheme", isNight ? "night" : "day");
            } catch (e) { /* storage unavailable: theme just won't be remembered */ }

            updateThemeButtons();
        }

        function applySavedTheme() {
            let savedTheme = null;
            try {
                savedTheme = localStorage.getItem("nbaTheme");
            } catch (e) { /* ignore */ }

            document.body.classList.toggle("night-mode", savedTheme === "night");
            updateThemeButtons();
        }

        applySavedTheme();

        if (themeToggle) {
            themeToggle.addEventListener("click", toggleTheme);
        }

        if (themeToggleBottom) {
            themeToggleBottom.addEventListener("click", toggleTheme);
        }

        // Theme changed in another tab
        window.addEventListener("storage", function (event) {
            if (event.key === "nbaTheme") {
                applySavedTheme();
            }
        });
    }

    initLazyLoad();
    initMenuKeys();
    initStoreSearch();
    initSubscribeSpinner();
    initThemeToggle();
});
