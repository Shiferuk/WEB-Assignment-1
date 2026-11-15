$(document).ready(function() {
    console.log("jQuery is ready!");

    $('#ticket-form').on('submit', function(e) {
        e.preventDefault();

        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const quantity = $('#ticket-quantity').val().trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let isValid = true;

        $('.error-msg').hide();
        $('#ticket-form .form-control').removeClass('is-invalid');

        if (name === '') {
            $('#name-error').show();
            $('#name').addClass('is-invalid');
            isValid = false;
        }

        if (!emailPattern.test(email)) {
            $('#email-error').show();
            $('#email').addClass('is-invalid');
            isValid = false;
        }

        if (!/^\d+$/.test(quantity) || Number(quantity) < 1 || Number(quantity) > 10) {
            $('#quantity-error').show();
            $('#ticket-quantity').addClass('is-invalid');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const $form = $(this);
        const $btn = $form.find('button[type="submit"]');
        const originalText = $btn.text();

        $('#ticket-success').addClass('d-none');

        $btn.prop('disabled', true).html(`
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Please wait...
        `);

        setTimeout(function() {
            $form[0].reset();

            $form.find('.form-control').removeClass('is-invalid');
            $('.error-msg').hide();

            $('#ticket-success').removeClass('d-none');

            $btn.prop('disabled', false).text(originalText);
        }, 1500);
    });

    $('#ticket-form input, #ticket-form select, #ticket-form textarea').on('input change', function() {
        $('#ticket-success').addClass('d-none');
    });

    $('#popup-form').on('submit', function(e) {
        e.preventDefault();

        const $form = $(this);
        const $btn = $form.find('button[type="submit"]');
        const originalText = $btn.text();

        $btn.prop('disabled', true).html(`
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Please wait...
        `);

        setTimeout(function() {
            $btn.prop('disabled', false).text(originalText);
            alert('Form submitted successfully!');
            $('#popup-container').hide();
            $form[0].reset();
        }, 2000);
    });

    $('#faq-search').on('keyup', function() {
        const searchTerm = $(this).val().toLowerCase();

        $('.accordion-header').each(function() {
            const $header = $(this);
            const $content = $header.next('.accordion-content');
            const text = $header.text().toLowerCase() + ' ' + $content.text().toLowerCase();

            if (text.includes(searchTerm) || searchTerm === '') {
                $header.show();
            } else {
                $header.hide();
                $content.hide();
            }
        });
    });

    $('img').each(function() {
        const $img = $(this);
        if (!$img.attr('data-src') && $img.attr('src')) {
            $img.attr('data-src', $img.attr('src'));
        }
    });

    function checkLazyLoad() {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();

        $('img[data-src]').each(function() {
            const $img = $(this);
            if ($img.offset().top < scrollTop + windowHeight + 200) {
                $img.attr('src', $img.attr('data-src')).removeAttr('data-src');
            }
        });
    }

    $(window).on('scroll resize', checkLazyLoad);
    checkLazyLoad();

    $('#open-popup-btn').on('click', () => $('#popup-container').css('display', 'flex'));

    $('#close-popup-btn, #popup-container').on('click', (e) => {
        if (e.target === document.getElementById('popup-container') || e.target.id === 'close-popup-btn') {
            $('#popup-container').hide();
        }
    });

    $('#schedule-table tbody tr').on('click', function() {
        $('#schedule-table tbody tr').css({ 'background-color': '', 'outline': '' });
        $(this).css({ 'background-color': '#e2f0d9', 'outline': '2px solid #28a745' });
    });

    $('.accordion-header').on('click', function() {
        $(this).next('.accordion-content').slideToggle();
    });

    $('.filter-btn').on('click', function() {
        const filter = $(this).data('filter');

        $('#schedule-table tbody tr').each(function() {
            const rowText = $(this).text().toLowerCase();

            if (filter === 'all' || rowText.includes(filter.toLowerCase())) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    const themeToggle = document.getElementById("themeToggle");
    const themeToggleBottom = document.getElementById("themeToggleBottom");

    function updateThemeButtons() {
        const isNight = document.body.classList.contains("night-mode");

        if (themeToggle) {
            themeToggle.textContent = isNight ? "☀️ Day Mode" : "🌙 Night Mode";
            themeToggle.setAttribute("aria-pressed", isNight ? "true" : "false");
        }

        if (themeToggleBottom) {
            themeToggleBottom.textContent = isNight
                ? "☀️ Switch to Day"
                : "🌙 Switch to Night";
            themeToggleBottom.setAttribute("aria-pressed", isNight ? "true" : "false");
        }
    }

    function toggleTheme() {
        document.body.classList.toggle("night-mode");

        const isNight = document.body.classList.contains("night-mode");

        localStorage.setItem("nbaTheme", isNight ? "night" : "day");

        updateThemeButtons();
    }

    function applySavedTheme() {
        const savedTheme = localStorage.getItem("nbaTheme");

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

    window.addEventListener("storage", function(event) {
        if (event.key === "nbaTheme") {
            applySavedTheme();
        }
    });
});
