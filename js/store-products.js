const lazyPlaceholder = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const store = {
    products: [
        {
            name: "Baskonia Basketball Ball Spaldeen",
            brand: "Spalding",
            category: "Equipment",
            price: 36.69,
            image: "Store_items/Balls/Baskonia_Spaldeen.png",

            description: "Spaldeen is a mini bouncy ball suitable for all ages.",

            features: [
                "Mini bouncy ball",
                "Textured grip",
                "Fun size for all ages"
            ],

            info: {
                "Brand": "Spalding",
                "Supplier reference": "51368Z",
                "Color": "Blue",
                "Gender": "Mixed",
                "Age group": "Adult",
                "Characteristic": "Indoor / Outdoor",
                "Team": "Baskonia"
            },

            buyUrl: "https://basket-center.com/51368z-baskonia-basketball-ball-spaldeen-euroleague-baskonia-size-mini"
        }, {
            name: "Basketball Rainbow Graffiti Rubber",
            brand: "Spalding",
            category: "Equipment",
            price: 53.91,
            image: "Store_items/Balls/Rainbow_Graffiti_Rubber.png",

            description: "Unleash your creativity with the Spalding Rainbow Graffiti Ball! Unique graphics, sticky rubber and high-performance cover for precise shots.",

            features: [
                "High-performance outdoor cover.",
                "All over graffiti graphics.",
                "Sticky rubber for grip."
            ],

            info: {
                "Brand": "Spalding",
                "Color": "rainbow / Multicolor",
                "Gender": "Mixed",
                "Age group": "Adult",
                "Characteristic": "Outdoor",
            },

            buyUrl: "https://basket-center.com/84372z-84557z-basketball-spalding-rainbow-graffiti-rubber-rainbow"
        }, {
            name: "Basketball Playground 8p Kobe Bryant Deflated",
            brand: "Nike",
            category: "Equipment",
            price: 59.82,
            image: "Store_items/Balls/Nike_Kobe_Bryant.png",

            description: "Discover the basketball Nike Playground 8p K Bryant, combining exceptional performance and a tribute to a sports legend.",

            features: [
                "Sturdy and durable design for intensive use",
                "Optimal grip for precise passes and shots",
                "Homage to the great Kobe Bryant, perfect for fans",
                "Suitable for various playing surfaces, both indoor and outdoor"
            ],

            info: {
                "Brand": "Nike",
                "Supplier reference": "N1012519-014",
                "Color": "blagolpur / Black",
                "Gender": "Mixed",
                "Age group": "Adult",
                "Characteristic": "Outdoor",
                "Assortment": "Kobe Bryant"
            },

            buyUrl: "https://basket-center.com/n1012519-014-basketball-nike-playground-8p-kobe-bryant-deflated-blagolpur-size-7"
        }, {
            name: "Basketball Everyday Playground 8p Next Nature Deflated",
            brand: "Nike",
            category: "Equipment",
            price: 54.10,
            image: "Store_items/Balls/Nike_Nature_Deflated.png",

            description: "Discover the sustainable performance of the Nike Everyday Playground 8p Next Nature ball, perfect for intense matches and optimal ball touch.",

            features: [
                "Robust design: built to withstand intense playing sessions while maintaining its shape and performance.",
                "Optimal grip: specially designed surface to provide good hold, even in wet conditions or during outdoor matches.",
                "Consistent performance: easy inflation thanks to its deflated format, allowing a perfect fit for all types of pumps.",
                "Sustainable ethics: part of the Next Nature collection, this ball is made with recycled materials to minimize environmental impact."
            ],

            info: {
                "Brand": "Nike",
                "Color": "Multicolor / mulwhibla",
                "Gender": "Mixed",
                "Age group": "Adult",
                "Characteristic": "Outdoor"
            },

            buyUrl: "https://basket-center.com/n1007037-944-basketball-nike-everyday-playground-8p-next-nature-deflated-mulwhibla"
        }, {
            name: "Air Jordan 1 Low",
            brand: "Nike",
            category: "Shoes",
            price: 77.97,
            image: "Store_items/Shoes/AirJordan_Low.png",

            description: "Inspired by the original that debuted in 1985, the Air Jordan 1 Low offers a clean, classic look that's familiar yet always fresh. With an iconic design that pairs perfectly with any 'fit, these kicks ensure you'll always be on point.",

            features: [
                "Encapsulated Air-Sole unit provides lightweight cushioning.",
                "Genuine leather in the upper offers durability and a premium look.",
                "Solid rubber outsole enhances traction on a variety of surfaces."
            ],

            info: {
                "Brand": "Nike",
                "Color": "Black/Gorge, Green/Summit White",
                "Gender": "Men",
                "Age group": "Adults"
            },

            buyUrl: "https://www.nike.com/t/air-jordan-1-low-mens-shoes-w9HO9jOz/553558-047"
        }, {
            name: "Air Jordan 1 High OG Royal",
            brand: "Nike",
            category: "Shoes",
            price: 140,
            image: "Store_items/Shoes/AirJordan_Royal.png",

            description: "First released in 1985, the AJ1 set the tone for years of innovation through the Air Jordan signature line. More than four decades since the design forever changed the future of footwear, the debut AJ1 \"Royal\" returns true to form.",

            features: [
                "Premium leather upper is durable and comfortable.",
                "Nike Air technology absorbs impact for cushioning with every step. ",
                "Perforations on the toes add breathability."
            ],

            info: {
                "Brand": "Nike",
                "Color": "Black/White/Multi-Color",
                "Gender": "Mixed",
                "Age group": "Big Kids"
            },

            buyUrl: "https://www.nike.com/t/air-jordan-1-high-og-royal-big-kids-shoes-p8vLeLAd/FD1437-005"
        }, {
            name: "Air Jordan 1 Low Method of Make",
            brand: "Nike",
            category: "Shoes",
            price: 97.97,
            image: "Store_items/Shoes/AirJordan_LowMM.png",

            description: "Our latest Method of Make series takes the instantly recognizable AJ1 and infuses it with serious tech runner style. Luxurious metallic leather pairs with breezy textile panels to create a richly layered design. A puffy Nike Swoosh logo sits on top of it all, rounding out the '00s running style.",

            features: [
                "Real and synthetic leather offer durability and structure.",
                "Nike Air technology absorbs impact for cushioning with every step.",
                "Soft foam midsole helps provide lightweight cushioning."
            ],

            info: {
                "Brand": "Nike",
                "Color": "Black/White/Anthracite/Metallic Silver",
                "Gender": "Women",
                "Age group": "Adults"
            },

            buyUrl: "https://www.nike.com/t/air-jordan-1-low-method-of-make-womens-shoes-xwLRuBB5/HQ2186-001"
        }, {
            name: "Caleb Wilson Icon Edition Swingman Jersey",
            brand: "Nike",
            category: "Clothing",
            price: 155,
            image: "Store_items/Clothing/ChicagoBullsWilson.png",

            description: "Selected No. 4 overall in the 2026 NBA Draft, Caleb Wilson brings elite athleticism, explosiveness, and versatility to the Chicago Bulls. Celebrate draft night and the start of Wilson's NBA career with this Chicago Bulls Icon Edition Swingman Jersey, featuring authentic team details and performance-inspired design.",

            features: [
                "Breathable Mesh Fabric: Lightweight double-knit mesh keeps you cool and dry during games or workouts.",
                "Dri-FIT Technology: Moves sweat away from the skin for faster evaporation and all-day comfort.   ",
                "Authentic Team Details: Heat-applied player name (\"WILSON\") and number (\"8\") with official NBA logo on the back."
            ],

            info: {
                "Brand": "Nike",
                "Fiber Content": " 100% Polyester",
                "Color": "Red / Black / White",
                "Fit": "Standard Fit",
                "Player": "Wilson (#8)",
                "Team": "Chicago Bulls"
            },

            buyUrl: "https://shop.bulls.com/products/chicago-bulls-caleb-wilson-icon-edition-swingman-jersey"
        }, {
            name: "Mitchell & Ness Across the Board Snapback",
            brand: "Mitchell & Ness",
            category: "Hats",
            price: 45,
            image: "Store_items/Clothing/ChicagoBullsBoardSnapback.png",

            description: "Show your Bulls pride in this Across the Board snapback from Mitchell & Ness.",

            features: [
                "Raised 3D Embroidery: Bold BULLS lettering and iconic team logo stitched across the front panels.",
                "Commemorative Side Patch: Features a detailed 30 Years and Running anniversary graphic embroidered on the side.",
                "Classic Flat Brim: Contrasting black flat visor with a signature green underbrim and adjustable snapback closure."
            ],

            info: {
                "Brand": "Mitchell & Ness",
                "Material": "100% Polyester",
                "Style": "Snapback Hat",
                "Color": "Cream / Black / Red",
                "Brim": "Flat Visor"
            },

            buyUrl: "https://shop.bulls.com/products/bullmh0108-chicago-bulls-mitchell-ness-across-the-board-snapback"
        }, {
            name: "Los Angeles Lakers Standard Issue",
            brand: "Nike",
            category: "Clothing",
            price: 115,
            image: "Store_items/Clothing/LosAnglesLakersHoodie.png",

            description: "You hold the Los Angeles Lakers near and dear to your heart. This Lakers team means something to you, which is why this hoodie is special. It helps keep you warm thanks to Nike Therma-FIT.",

            features: [
                "Nike Therma-FIT technology helps manage your body’s natural heat to help keep you warm in cold-weather conditions."
            ],

            info: {
                "Brand": "Nike",
                "Style": "Pullover Hoodie",
                "Fiber Content": "80% Cotton, 20% Polyester",
                "Color": "Black / Amarillo (Yellow)",
                "Fit": "Loose Fit / Relaxed Fit",
                "Team": "Los Angeles Lakers"
            },

            buyUrl: "https://www.nike.com/t/los-angeles-lakers-standard-issue-mens-fleece-basketball-hoodie-VugHOcXi"
        }, {
            name: "LeBron XXIV Stars",
            brand: "Nike",
            category: "Shoes",
            price: 200,
            image: "Store_items/Shoes/LEBron24.png",

            description: "The LeBron XXIV goes ultra-light, raising the bar for the next heirs to the throne. Strong and breathable, the innovative three-layer KingKnit upper gives the support you need to rise and reign over any moment. With a full-length React drop-in midsole and double Air Zoom units, it’s built to unlock your game, propelling your greatness and elevation higher than ever.",

            features: [
                "A full-length Nike React drop-in midsole pairs with embedded forefoot and heel Air Zoom units for bouncy, responsive cushioning to help you explode to the rim.",
                "Ultra-lightweight and breathable, the three-layer KingKnit upper is built to last. A strong base adds durability, while layered support helps keep you locked in for takeoff."
            ],

            info: {
                "Brand": "Nike",
                "Line / Signature": "LeBron",
                "Color": "Blue / Black",
                "Closure": "Lace-Up",
                "Style": "Low-Top Basketball Shoes"
            },

            buyUrl: "https://www.nike.com/t/lebron-xxiv-stars-basketball-shoes-8JMjVmme/IO8204-400"
        }, {
            name: "Golden State Warriors 2024/25 Association Edition",
            brand: "Nike",
            category: "Clothing",
            price: 79.99,
            image: "Store_items/Clothing/WarriorsShorts1.png",

            description: "With a white background, the Association Edition kit is a common thread shared by every team in the NBA. These Warriors shorts are inspired by what the pros wear on the hardwood, from team colours and graphics to lightweight, sweat-wicking mesh.",

            features: [
                "Nike Dri-FIT technology moves sweat away from your skin for quicker evaporation, helping you stay dry and comfortable.",
                "The replica design gives you details modelled after what the team wears.",
                "Breathable mesh helps keep you cool on or off the court."
            ],

            info: {
                "Brand": "Nike",
                "Fiber Content": "100% Polyester",
                "Color": "White / Rush Blue / Amarillo",
                "Gender": "Men",
                "Style": "Basketball Swingman Shorts",
                "Fit": "Standard Athletic Fit",
                "Team": "Golden State Warriors"
            },

            buyUrl: "https://www.nike.com/za/t/golden-state-warriors-2024-25-association-edition-mens-nike-dri-fit-nba-swingman-shorts-lQHN9T"
        }
    ],
    category: "all",
    sort: "low",

    getVisibleProducts() {
        const filtered = this.products.filter(function (product) {
            return store.category === "all" || product.category.toLowerCase() === store.category;
        });

        switch (this.sort) {
            case "high":
                return filtered.sort((first, second) => second.price - first.price);
            default:
                return filtered.sort((first, second) => first.price - second.price);
        }
    },

    render() {
        const visible = this.getVisibleProducts();

        productsGrid.innerHTML = visible.map(createCard).join("");
        productCount.textContent = "Showing " + visible.length + " of " + this.products.length + " products";

        productsGrid.querySelectorAll(".product-card").forEach(function (card, index) {
            card.style.animationDelay = index * 60 + "ms";
        });

        document.dispatchEvent(new CustomEvent("products:rendered"));
    }
};

const filterBar = document.getElementById("categoryFilters");
const filterButtons = Array.from(filterBar.querySelectorAll(".filter-button"));
const sortSelect = document.getElementById("sortSelect");
const productsGrid = document.getElementById("productsGrid");
const productCount = document.getElementById("productCount");


function createCard(product) {
    return '<div class="product-card card-appear">' +
        '<div class="product-image"><img class="lazy" src="' + lazyPlaceholder + '" data-src="' + product.image + '" alt="' + product.name + '"></div>' +
        '<div><div class="product-category">' + product.brand + ' • ' + product.category + '</div>' +
        '<div class="product-title">' + product.name + '</div></div>' +
        '<div class="product-price">$' + product.price.toFixed(2) + '</div>' +
        '</div>';
}

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (item) {
            item.classList.remove("active");
        });
        button.classList.add("active");

        store.category = button.dataset.category;
        store.render();
    });
});

sortSelect.addEventListener("change", function () {
    store.sort = sortSelect.value;
    store.render();
});

filterBar.addEventListener("keydown", function (event) {
    const index = filterButtons.indexOf(document.activeElement);
    let nextIndex = index;

    if (index === -1) {
        return;
    }

    switch (event.key) {
        case "ArrowRight":
            nextIndex = (index + 1) % filterButtons.length;
            break;
        case "ArrowLeft":
            nextIndex = (index - 1 + filterButtons.length) % filterButtons.length;
            break;
        case "Home":
            nextIndex = 0;
            break;
        case "End":
            nextIndex = filterButtons.length - 1;
            break;
        default:
            return;
    }

    event.preventDefault();
    filterButtons[nextIndex].focus();
});

store.render();
