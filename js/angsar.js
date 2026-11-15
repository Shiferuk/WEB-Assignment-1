"use strict";


// LOCAL STORAGE
function getUsers() {
    return JSON.parse(localStorage.getItem("nbaUsers")) || [];
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("nbaCurrentUser"));
}



// DAY / NIGHT MODE


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

// Theme changes in another tab
window.addEventListener("storage", function (event) {

    if (event.key === "nbaTheme") {
        applySavedTheme();
    }

});



// NOTIFICATION SYSTEM


function showNotification(message) {

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    if (!toast || !toastMessage) {
        return;
    }

    toastMessage.textContent = message;
    toast.style.display = "block";

    clearTimeout(window.toastTimeout);

    window.toastTimeout = setTimeout(function () {
        toast.style.display = "none";
    }, 3000);
}



// SHOW / HIDE PASSWORD


const eyeIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" ' +
    'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
    'stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>' +
    '<circle cx="12" cy="12" r="3"></circle></svg>';

const eyeOffIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" ' +
    'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
    'stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"></path>' +
    '<path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"></path>' +
    '<path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"></path>' +
    '<line x1="1" y1="1" x2="23" y2="23"></line></svg>';

function setupPasswordToggles() {

    const passwordInputs = document.querySelectorAll('input[type="password"]');

    passwordInputs.forEach(function (input) {

        const wrapper = document.createElement("div");
        wrapper.className = "password-wrapper";

        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);

        const toggleBtn = document.createElement("button");
        toggleBtn.type = "button";
        toggleBtn.className = "password-toggle";
        toggleBtn.innerHTML = eyeIcon;
        toggleBtn.setAttribute("aria-label", "Show password");
        toggleBtn.setAttribute("aria-pressed", "false");

        toggleBtn.addEventListener("click", function () {

            const isHidden = input.type === "password";

            input.type = isHidden ? "text" : "password";
            toggleBtn.innerHTML = isHidden ? eyeOffIcon : eyeIcon;

            toggleBtn.setAttribute(
                "aria-label",
                isHidden ? "Hide password" : "Show password"
            );
            toggleBtn.setAttribute("aria-pressed", isHidden ? "true" : "false");

            input.focus();

        });

        wrapper.appendChild(toggleBtn);

    });
}

setupPasswordToggles();



// PLAYERS ARRAY


const players = [
    {
        name: "Stephen Curry",
        team: "Golden State Warriors",
        position: "Point Guard",
        achievement: "Multiple-time NBA champion and MVP",
        message: "A legendary shooter known for his long-range accuracy!"
    },
    {
        name: "LeBron James",
        team: "Los Angeles Lakers",
        position: "Forward",
        achievement: "Four-time NBA champion and four-time MVP",
        message: "An all-around player known for scoring and playmaking!"
    },
    {
        name: "Jayson Tatum",
        team: "Boston Celtics",
        position: "Forward",
        achievement: "NBA champion and multiple-time All-Star",
        message: "A versatile scorer who can attack from different areas!"
    },
    {
        name: "Nikola Jokic",
        team: "Denver Nuggets",
        position: "Center",
        achievement: "Multiple-time NBA MVP and NBA champion",
        message: "An exceptional passer and playmaker from the center position!"
    },
    {
        name: "Shai Gilgeous-Alexander",
        team: "Oklahoma City Thunder",
        position: "Guard",
        achievement: "NBA MVP for the 2024-25 season",
        message: "Known for his scoring, footwork and ability to drive to the basket!"
    }
];



// RANDOM PLAYER


const randomPlayerBtn = document.getElementById("randomPlayerBtn");

function showRandomPlayer() {

    const randomIndex = Math.floor(Math.random() * players.length);
    const player = players[randomIndex];

    const playerName = document.getElementById("playerName");
    const playerTeam = document.getElementById("playerTeam");
    const playerPosition = document.getElementById("playerPosition");
    const playerPoints = document.getElementById("playerPoints");
    const playerMessage = document.getElementById("playerMessage");
    const playerCard = document.getElementById("playerCard");

    if (playerName) playerName.textContent = player.name;
    if (playerTeam) playerTeam.textContent = "Team: " + player.team;
    if (playerPosition) playerPosition.textContent = "Position: " + player.position;
    if (playerPoints) playerPoints.textContent = "Achievement: " + player.achievement;
    if (playerMessage) playerMessage.textContent = player.message;

    if (playerCard) {
        playerCard.classList.remove("player-animate");
        void playerCard.offsetWidth;
        playerCard.classList.add("player-animate");
    }

    showNotification("New NBA player selected!");
}

if (randomPlayerBtn) {
    randomPlayerBtn.addEventListener("click", showRandomPlayer);
}



// SHOW ALL PLAYERS


const playerRoster = document.getElementById("playerRoster");

if (playerRoster) {

    players.forEach(function (player) {

        const column = document.createElement("div");
        column.className = "col-12 col-md-6 col-lg-4";

        const card = document.createElement("article");
        card.className = "roster-card h-100 p-3 rounded-3";

        const name = document.createElement("h4");
        name.className = "h5";
        name.textContent = player.name;

        const team = document.createElement("p");
        team.className = "mb-1";
        team.textContent = player.team;

        const position = document.createElement("p");
        position.className = "mb-0";
        position.textContent = player.position;

        card.append(name, team, position);
        column.appendChild(card);
        playerRoster.appendChild(column);

    });
}



// EXTERNAL API: BALLDONTLIE (NBA teams)


const BDL_API_KEY = "facfc29b-3d73-468c-851a-70110968df95";
const BDL_TEAMS_URL = "https://api.balldontlie.io/v1/teams";

const loadTeamsBtn = document.getElementById("loadTeamsBtn");
const teamsConference = document.getElementById("teamsConference");
const teamsResult = document.getElementById("teamsResult");

let allTeams = [];

// Escape text from the API before inserting it into the page
function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = value == null ? "" : String(value);
    return div.innerHTML;
}

function showTeamsLoading() {
    teamsResult.innerHTML =
        '<div class="text-center py-3">' +
        '<div class="spinner-border" role="status" aria-hidden="true"></div>' +
        '<p class="mt-2 mb-0">Loading teams...</p>' +
        '</div>';
}

function showTeamsError(message) {
    teamsResult.innerHTML =
        '<div class="alert alert-danger mb-0" role="alert">' +
        escapeHTML(message) +
        '</div>';
}

function renderTeams() {
    const filter = teamsConference.value;

    const teams = allTeams.filter(function (team) {
        return filter === "all" || team.conference === filter;
    });

    if (teams.length === 0) {
        teamsResult.innerHTML = '<p class="mb-0">No teams found.</p>';
        return;
    }

    let html = '<div class="row g-3">';

    teams.forEach(function (team) {
        html +=
            '<div class="col-12 col-sm-6 col-lg-4">' +
                '<div class="border rounded-3 p-3 h-100">' +
                    '<h4 class="h6 mb-1">' + escapeHTML(team.full_name) + '</h4>' +
                    '<p class="mb-0 small">' +
                        escapeHTML(team.city) + ' · ' + escapeHTML(team.abbreviation) +
                    '</p>' +
                    '<p class="mb-0 small">' +
                        escapeHTML(team.conference) + ' Conference · ' + escapeHTML(team.division) +
                    '</p>' +
                '</div>' +
            '</div>';
    });

    html += '</div>';
    teamsResult.innerHTML = html;
}

async function loadTeams() {

    showTeamsLoading();
    loadTeamsBtn.disabled = true;

    try {
        const response = await fetch(BDL_TEAMS_URL, {
            headers: { "Authorization": BDL_API_KEY }
        });

        if (response.status === 401) {
            throw new Error("Invalid or missing API key.");
        }

        if (response.status === 429) {
            throw new Error("Too many requests. Please wait a minute and try again.");
        }

        if (!response.ok) {
            throw new Error("Server responded with status " + response.status);
        }

        const data = await response.json();

        // Keep only current NBA teams (they have a conference)
        allTeams = (data.data || []).filter(function (team) {
            return team.conference;
        });

        teamsConference.disabled = false;
        renderTeams();

    } catch (error) {
        console.error("Teams API error:", error);
        showTeamsError(
            error.message.indexOf("API key") !== -1 || error.message.indexOf("Too many") !== -1
                ? error.message
                : "Could not load teams. Please check your internet connection and try again."
        );

    } finally {
        loadTeamsBtn.disabled = false;
    }
}

if (loadTeamsBtn) {
    loadTeamsBtn.addEventListener("click", loadTeams);
    teamsConference.addEventListener("change", renderTeams);
}

// SIGN UP FORM


const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("signupName");
        const email = document.getElementById("signupEmail");
        const password = document.getElementById("signupPassword");
        const confirmPassword = document.getElementById("confirmPassword");

        const nameError = document.getElementById("signupNameError");
        const emailError = document.getElementById("signupEmailError");
        const passwordError = document.getElementById("signupPasswordError");
        const confirmPasswordError = document.getElementById("confirmPasswordError");
        const signupMessage = document.getElementById("signupMessage");

        nameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        confirmPasswordError.textContent = "";
        signupMessage.textContent = "";

        name.classList.remove("is-invalid", "is-valid");
        email.classList.remove("is-invalid", "is-valid");
        password.classList.remove("is-invalid", "is-valid");
        confirmPassword.classList.remove("is-invalid", "is-valid");

        let isValid = true;

        const nameValue = name.value.trim();
        const emailValue = email.value.trim().toLowerCase();
        const passwordValue = password.value;
        const confirmPasswordValue = confirmPassword.value;

        // Validate name
        if (nameValue.length < 2) {

            nameError.textContent = "Name must contain at least 2 characters.";
            name.classList.add("is-invalid");
            isValid = false;

        } else {

            name.classList.add("is-valid");

        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailValue)) {

            emailError.textContent = "Please enter a valid email address.";
            email.classList.add("is-invalid");
            isValid = false;

        } else {

            email.classList.add("is-valid");

        }

        // Validate password
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!passwordPattern.test(passwordValue)) {

            passwordError.textContent =
                "Password needs 8 characters, uppercase, lowercase and a number.";

            password.classList.add("is-invalid");
            isValid = false;

        } else {

            password.classList.add("is-valid");

        }

        // Confirm password
        if (confirmPasswordValue !== passwordValue || confirmPasswordValue === "") {

            confirmPasswordError.textContent = "Passwords do not match.";
            confirmPassword.classList.add("is-invalid");
            isValid = false;

        } else {

            confirmPassword.classList.add("is-valid");

        }

        if (!isValid) {
            signupMessage.textContent = "Please correct the errors above.";
            signupMessage.style.color = "red";
            return;
        }

        // Check if email already exists
        const users = getUsers();

        const existingUser = users.find(function (user) {
            return user.email.toLowerCase() === emailValue;
        });

        if (existingUser) {

            emailError.textContent = "This email is already registered.";
            email.classList.add("is-invalid");

            signupMessage.textContent = "Please use another email address.";
            signupMessage.style.color = "red";

            return;
        }

        // Create new user
        const newUser = {
            name: nameValue,
            email: emailValue,
            password: passwordValue,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);

        localStorage.setItem("nbaUsers", JSON.stringify(users));

        signupMessage.textContent =
            "Account created successfully! You can now log in.";

        signupMessage.style.color = "green";

        signupForm.reset();

        // Password fields go back to hidden after reset
        document.querySelectorAll("#signupForm .password-wrapper").forEach(function (wrapper) {

            const input = wrapper.querySelector("input");
            const toggleBtn = wrapper.querySelector(".password-toggle");

            input.type = "password";
            toggleBtn.innerHTML = eyeIcon;
            toggleBtn.setAttribute("aria-label", "Show password");
            toggleBtn.setAttribute("aria-pressed", "false");

        });

        name.classList.remove("is-valid");
        email.classList.remove("is-valid");
        password.classList.remove("is-valid");
        confirmPassword.classList.remove("is-valid");

    });
}



// LOGIN FORM


const loginForm = document.getElementById("loginForm");

if (loginForm) {

    const username = document.getElementById("username");
    const password = document.getElementById("password");

    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");
    const formMessage = document.getElementById("formMessage");

    const submitButton = document.getElementById("loginSubmitBtn");
    const spinner = document.getElementById("loginSpinner");
    const buttonText = document.getElementById("loginButtonText");

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        usernameError.textContent = "";
        passwordError.textContent = "";
        formMessage.textContent = "";

        username.classList.remove("is-invalid", "is-valid");
        password.classList.remove("is-invalid", "is-valid");

        let isValid = true;

        const usernameValue = username.value.trim();
        const passwordValue = password.value;

        if (usernameValue === "") {

            usernameError.textContent = "Username or email is required.";
            username.classList.add("is-invalid");
            isValid = false;

        } else {

            username.classList.add("is-valid");

        }

        if (passwordValue.trim() === "") {

            passwordError.textContent = "Password is required.";
            password.classList.add("is-invalid");
            isValid = false;

        } else if (passwordValue.length < 8) {

            passwordError.textContent = "Password must contain at least 8 characters.";
            password.classList.add("is-invalid");
            isValid = false;

        } else {

            password.classList.add("is-valid");

        }

        if (!isValid) {

            formMessage.textContent = "Please correct the errors above.";
            formMessage.style.color = "red";

            return;
        }

        // Find registered user
        const users = getUsers();

        const foundUser = users.find(function (user) {

            return (
                user.email.toLowerCase() === usernameValue.toLowerCase() ||
                user.name.toLowerCase() === usernameValue.toLowerCase()
            ) && user.password === passwordValue;

        });

        if (!foundUser) {

            formMessage.textContent =
                "Incorrect username/email or password. Please register first if you do not have an account.";

            formMessage.style.color = "red";

            username.classList.add("is-invalid");
            password.classList.add("is-invalid");

            return;
        }

        // Save current user
        const currentUser = {
            name: foundUser.name,
            email: foundUser.email
        };

        localStorage.setItem("nbaCurrentUser", JSON.stringify(currentUser));

        // Start loading
        if (submitButton) submitButton.disabled = true;
        if (spinner) spinner.classList.remove("d-none");
        if (buttonText) buttonText.textContent = "Please wait...";

        formMessage.textContent = "Login successful! Opening your profile...";
        formMessage.style.color = "green";

        showNotification("Successfully logged in!");

        setTimeout(function () {
            window.location.href = "Profile.html";
        }, 1000);

    });
}


 
// PROFILE PAGE


const profilePage = document.getElementById("profilePage");

if (profilePage) {

    const currentUser = getCurrentUser();

    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");
    const profileInitial = document.getElementById("profileInitial");

    const profileDetails = document.getElementById("profileDetails");
    const guestMessage = document.getElementById("guestMessage");

    if (currentUser) {

        if (profileName) {
            profileName.textContent = currentUser.name;
        }

        if (profileEmail) {
            profileEmail.textContent = currentUser.email;
        }

        if (profileInitial) {
            profileInitial.textContent =
                currentUser.name.charAt(0).toUpperCase();
        }

        if (profileDetails) {
            profileDetails.hidden = false;
        }

        if (guestMessage) {
            guestMessage.hidden = true;
        }

    } else {

        if (profileDetails) {
            profileDetails.hidden = true;
        }

        if (guestMessage) {
            guestMessage.hidden = false;
        }

    }

}


// LOG OUT


const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", function () {

        localStorage.removeItem("nbaCurrentUser");

        window.location.href = "index.html";

    });

}




