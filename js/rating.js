$(document).ready(function() {
    console.log("jQuery is ready!");

    const careerData = {
        shai: { matches: 532, points: 13460, assists: 2817 },
        edwards: { matches: 442, points: 10854, assists: 1826 },
        jokic: { matches: 811, points: 18030, assists: 6105 },
        doncic: { matches: 517, points: 15124, assists: 4254 },
        brunson: { matches: 566, points: 10816, assists: 2959 },
        wembanyama: { matches: 120, points: 3200, assists: 450 },
        giannis: { matches: 900, points: 21000, assists: 4500 },
        cade: { matches: 210, points: 4600, assists: 1300 },
        lebron: { matches: 1560, points: 42100, assists: 11500 },
        curry: { matches: 1030, points: 25400, assists: 6200 }
    };

    const currentSeason = 2026;

    const playerNames = {
        shai: "Shai Gilgeous-Alexander",
        edwards: "Anthony Edwards",
        jokic: "Nikola Jokic",
        doncic: "Luka Doncic",
        brunson: "Jalen Brunson",
        wembanyama: "Victor Wembanyama",
        giannis: "Giannis Antetokounmpo",
        cade: "Cade Cunningham",
        lebron: "LeBron James",
        curry: "Stephen Curry"
    };

    function normalizeName(name) {
        return name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }

    async function loadPlayerStats() {
        try {
            const firstResponse = await fetch(
                `https://api.server.nbaapi.com/api/playertotals?season=${currentSeason}&page=1&pageSize=50`
            );

            if (!firstResponse.ok) {
                throw new Error(`API error: ${firstResponse.status}`);
            }

            const firstResult = await firstResponse.json();
            const totalPages = firstResult.pagination.pages;

            let players = [...(firstResult.data || [])];

            const requests = [];

            for (let page = 2; page <= totalPages; page++) {
                requests.push(
                    fetch(
                        `https://api.server.nbaapi.com/api/playertotals?season=${currentSeason}&page=${page}&pageSize=50`
                    ).then(response => {
                        if (!response.ok) {
                            throw new Error(`API error: ${response.status}`);
                        }

                        return response.json();
                    })
                );
            }

            const results = await Promise.all(requests);

            results.forEach(result => {
                players.push(...(result.data || []));
            });

            Object.entries(playerNames).forEach(([key, name]) => {
                const matchingPlayers = players.filter(player =>
                    normalizeName(player.playerName) === normalizeName(name) &&
                    player.isPlayoff === false
                );

                if (matchingPlayers.length === 0) {
                    console.log(`${name}: no season statistics found`);
                    return;
                }

                const totals = matchingPlayers.reduce((sum, player) => {
                    sum.games += Number(player.games) || 0;
                    sum.points += Number(player.points) || 0;
                    sum.rebounds += Number(player.totalRb) || 0;
                    sum.assists += Number(player.assists) || 0;

                    return sum;
                }, {
                    games: 0,
                    points: 0,
                    rebounds: 0,
                    assists: 0
                });

                if (totals.games === 0) {
                    return;
                }

                const $card = $(`.player-card[data-player="${key}"]`);
                const $stats = $card.find(".stats-box li");

                const averages = [
                    (totals.points / totals.games).toFixed(1),
                    (totals.rebounds / totals.games).toFixed(1),
                    (totals.assists / totals.games).toFixed(1)
                ];

                $stats.each(function(index) {
                    if (averages[index] !== undefined) {
                        const $value = $(this).contents().filter(function() {
                            return this.nodeType === 3;
                        }).last();

                        if ($value.length) {
                            $value[0].textContent = ` ${averages[index]}`;
                        }
                    }
                });

                console.log(`${name}:`, averages);
            });

            console.log("NBA player statistics loaded:", players.length);

        } catch (error) {
            console.error("Could not load NBA statistics:", error);
        }
    }

    loadPlayerStats();

    $('.player-card').on('click', function(e) {
        if ($(e.target).hasClass('star') || $(e.target).hasClass('copy-btn')) return;

        $('.player-card').css({
            'border': '',
            'background-color': '',
            'box-shadow': ''
        });

        $(this).css({
            'border': '2px solid #007bff',
            'background-color': '#f1f8ff',
            'box-shadow': '0 0 15px rgba(0, 123, 255, 0.3)'
        });

        const $card = $(this);
        const title = $card.find('h2').text();
        const stats = $card.find('.stats-box').html();
        const bio = $card.find('.bio-box').html();
        const playerKey = $card.data('player');

        let careerHTML = '';

        if (playerKey && careerData[playerKey]) {
            const c = careerData[playerKey];

            careerHTML = `
                <div class="career-box mt-3">
                    <h3>All-time Career Statistics</h3>
                    <ul>
                        <li><strong>Total Matches:</strong> <span class="counter" data-target="${c.matches}">0</span></li>
                        <li><strong>Total Points:</strong> <span class="counter" data-target="${c.points}">0</span></li>
                        <li><strong>Total Assists:</strong> <span class="counter" data-target="${c.assists}">0</span></li>
                    </ul>
                </div>
            `;
        }

        $('#modal-text').html(`<h3>${title}</h3>${stats}${careerHTML}${bio}`);
        $('#player-modal').css('display', 'flex');

        $('.counter').each(function() {
            const $this = $(this);
            const target = parseInt($this.attr('data-target'));

            $({ countNum: 0 }).animate({ countNum: target }, {
                duration: 1500,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum).toLocaleString());
                },
                complete: function() {
                    $this.text(target.toLocaleString());
                }
            });
        });
    });

    $('#close-modal-btn, #player-modal').on('click', function(e) {
        if (e.target === this || e.target.id === 'close-modal-btn') {
            $('#player-modal').hide();
        }
    });

    $('.player-card').each(function() {
        const $card = $(this);
        const $starsContainer = $('<div>', {
            class: 'rating-stars mt-3 text-center'
        });

        for (let i = 1; i <= 5; i++) {
            const $star = $('<span>', {
                text: '★',
                class: 'star',
                css: {
                    cursor: 'pointer',
                    fontSize: '24px',
                    color: '#ccc',
                    marginRight: '5px'
                }
            });

            $star.on('click', function() {
                $starsContainer.find('.star').each(function(index) {
                    $(this).css('color', index < i ? '#ffc107' : '#ccc');
                });
            });

            $starsContainer.append($star);
        }

        const $copyBtn = $('<button>', {
            text: '📋 Copy Bio',
            class: 'btn btn-sm btn-outline-secondary mt-2 copy-btn',
            css: {
                display: 'block',
                width: '100%'
            }
        });

        $copyBtn.on('click', function(e) {
            e.stopPropagation();

            const bioText = $card.find('.bio-box').text().trim();

            navigator.clipboard.writeText(bioText).then(() => {
                $copyBtn
                    .text('✓ Copied to clipboard!')
                    .removeClass('btn-outline-secondary')
                    .addClass('btn-success');

                setTimeout(() => {
                    $copyBtn
                        .text('📋 Copy Bio')
                        .removeClass('btn-success')
                        .addClass('btn-outline-secondary');
                }, 2000);
            });
        });

        $card.append($starsContainer).append($copyBtn);
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
