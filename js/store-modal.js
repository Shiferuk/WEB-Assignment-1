$(document).ready(function () {

    // Открытие модального окна по клику на карточку товара
    $(document).on('click', '.product-card', function () {
        const title = $(this).find('.product-title').text().trim();

        const product = store.products.find(function (item) {
            return item.name === title;
        });

        if (!product) {
            console.error('Product not found:', title);
            return;
        }

        // Основная информация
        $('#modalBrand').text(product.brand.toUpperCase());
        $('#modalTitle').text(product.name);
        $('#modalPrice').text('$' + product.price.toFixed(2));
        $('#modalDesc').text(product.description || '');
        $('#modalMainImg').attr('src', product.image);

        // Заполняем список характеристик (Description)
        const $featuresList = $('#modalFeatures');
        $featuresList.empty();
        if (product.features && product.features.length > 0) {
            product.features.forEach(function (feature) {
                $featuresList.append('<li>' + feature + '</li>');
            });
        }

        // Заполняем таблицу (Additional information)
        const $infoTable = $('#modalInfoTable');
        $infoTable.empty();
        if (product.info) {
            for (const [key, value] of Object.entries(product.info)) {
                $infoTable.append(
                    '<tr>' +
                    '<th>' + key + '</th>' +
                    '<td>' + value + '</td>' +
                    '</tr>'
                );
            }
        }

        // Ссылка на кнопку покупки
        $('#modalBuyBtn').attr('href', product.buyUrl || '#');

        // Сбрасываем аккордеоны в открытое состояние при каждом открытии
        $('.modal-accordion-content').show();
        $('.accordion-icon').text('—');

        // Показываем окно
        $('#productModal').fadeIn(200);
    });

    // Сворачивание/разворачивание секций (как на скриншоте)
    $(document).on('click', '.modal-section-header', function () {
        const $content = $(this).next('.modal-accordion-content');
        const $icon = $(this).find('.accordion-icon');

        $content.slideToggle(200);
        $icon.text($icon.text() === '—' ? '+' : '—');
    });

    // Закрытие по крестику
    $(document).on('click', '.close-modal', function () {
        $('#productModal').fadeOut(200);
    });

    // Закрытие по клику на темный фон
    $(document).on('click', '.product-modal-overlay', function (e) {
        if (e.target === this) {
            $('#productModal').fadeOut(200);
        }
    });
});
