
/* =========================================
   ABANDONED BUT NOT FORGOTTEN
   MAIN JAVASCRIPT FUNCTIONS
========================================= */


/* =========================================
   1. ARTIFACT DATABASE
========================================= */

const artifacts = [

    {
        name: "Apollo 11 Lunar Module",
        category: "Moon",
        year: "1969",
        description: "Historic lunar landing equipment.",
        link: "moon.html"
    },

    {
        name: "Apollo 15 Lunar Rover",
        category: "Moon",
        year: "1971",
        description: "The vehicle used by Apollo astronauts.",
        link: "moon.html"
    },

    {
        name: "Lunar Experiment Equipment",
        category: "Moon",
        year: "1969-1972",
        description: "Scientific instruments left on the Moon.",
        link: "moon.html"
    },

    {
        name: "Sojourner Rover",
        category: "Mars",
        year: "1997",
        description: "NASA's first successful Mars rover.",
        link: "mars.html"
    },

    {
        name: "Spirit Rover",
        category: "Mars",
        year: "2004",
        description: "A robotic explorer of the Red Planet.",
        link: "mars.html"
    },

    {
        name: "Opportunity Rover",
        category: "Mars",
        year: "2004",
        description: "A rover that explored Mars for nearly 15 years.",
        link: "mars.html"
    },

    {
        name: "Perseverance Rover",
        category: "Mars",
        year: "2021",
        description: "A modern Mars exploration rover.",
        link: "mars.html"
    }

];


/* =========================================
   2. ARTIFACT SEARCH SYSTEM
========================================= */

const searchInput = document.getElementById("artifactSearch");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");


function searchArtifacts() {

    if (!searchInput || !searchResults) return;

    const searchValue = searchInput.value
        .trim()
        .toLowerCase();

    searchResults.innerHTML = "";

    const filteredArtifacts = artifacts.filter(item => {

        return (
            item.name.toLowerCase().includes(searchValue) ||
            item.category.toLowerCase().includes(searchValue) ||
            item.year.toLowerCase().includes(searchValue) ||
            item.description.toLowerCase().includes(searchValue)
        );

    });


    if (filteredArtifacts.length === 0) {

        searchResults.innerHTML = `
            <div class="no-results">
                <h3>No Artifacts Found</h3>
                <p>Try searching with another keyword.</p>
            </div>
        `;

        return;
    }


    filteredArtifacts.forEach(item => {

        const artifactCard = document.createElement("article");

        artifactCard.className = "search-item";

        const category = document.createElement("span");
        category.textContent = `${item.category.toUpperCase()} / ${item.year}`;

        const title = document.createElement("h3");
        title.textContent = item.name;

        const description = document.createElement("p");
        description.textContent = item.description;

        const link = document.createElement("a");
        link.href = item.link;
        link.textContent = "VIEW DETAILS →";

        artifactCard.append(
            category,
            title,
            description,
            link
        );

        searchResults.appendChild(artifactCard);

    });

}


/* =========================================
   3. SEARCH EVENT LISTENERS
========================================= */

if (searchButton) {

    searchButton.addEventListener(
        "click",
        searchArtifacts
    );

}

if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchArtifacts
    );

    searchInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            searchArtifacts();
        }

    });

}


/* =========================================
   4. SMOOTH SCROLL NAVIGATION
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =========================================
   5. SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(
    ".artifact-card, .destination-card, .timeline-item, .fact-section, .content-section"
);


if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });


    revealElements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });

}


/* =========================================
   6. ACTIVE NAVIGATION HIGHLIGHT
========================================= */

const currentPage = window.location.pathname
    .split("/")
    .pop() || "index.html";


document.querySelectorAll(".navbar nav a").forEach(link => {

    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {

        link.classList.add("active");

    } else {

        link.classList.remove("active");

    }

});


/* =========================================
   7. BACK TO TOP BUTTON
========================================= */

const topButton = document.createElement("button");

topButton.id = "backToTop";
topButton.innerHTML = "↑";

topButton.setAttribute("aria-label", "Back to top");

document.body.appendChild(topButton);


const topButtonStyle = document.createElement("style");

topButtonStyle.textContent = `

    #backToTop {

        position: fixed;
        bottom: 30px;
        right: 30px;

        width: 45px;
        height: 45px;

        border: 1px solid #00d9ff;
        background: #00d9ff;
        color: #03101a;

        font-size: 23px;
        font-weight: bold;

        cursor: pointer;
        display: none;

        z-index: 999;

        transition: 0.3s;

    }

    #backToTop:hover {

        background: transparent;
        color: #00d9ff;

        box-shadow: 0 0 20px rgba(0,217,255,0.4);

    }

    .reveal {

        opacity: 0;
        transform: translateY(35px);

        transition:
            opacity 0.7s ease,
            transform 0.7s ease;

    }

    .revealed {

        opacity: 1;
        transform: translateY(0);

    }

    .no-results {

        grid-column: 1 / -1;
        padding: 35px;
        text-align: center;
        background: #101a2c;
        border: 1px solid rgba(255,255,255,0.1);

    }

    .no-results h3 {

        color: #00d9ff;
        margin-bottom: 12px;

    }

    .no-results p {

        color: #9ba9c2;

    }

`;

document.head.appendChild(topButtonStyle);


window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});


topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});


/* =========================================
   8. PAGE LOADING EFFECT
========================================= */

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

});


/* =========================================
   9. CONSOLE MESSAGE
========================================= */

console.log(
    "%c ABANDONED BUT NOT FORGOTTEN ",
    "background:#00d9ff;color:#03101a;font-size:18px;font-weight:bold;padding:10px;"
);

console.log(
    "Welcome to humanity's forgotten space history."
);


/* =========================================
   END OF JAVASCRIPT
========================================= */
