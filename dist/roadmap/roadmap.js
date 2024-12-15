import { update_section_progress } from "./progressbar.js";



class Article {
    constructor(id, url, premium, status) {
        this.id = id
        this.url = url
        this.premium = premium // free, paid
        this.status = status // done, problem, none
    }

    toggle_status() {
        // none -> done -> problem -> none : cycle through
        const status = ["none", "done", "problem"];
        var index_next = status.indexOf(this.status) + 1;
        if (index_next > status.length) {
            index_next = 0;
        }
        this.status = status[index_next];
        console.log(this.id, this.status)
    }
}











let currentArticleIndex = undefined; // Current article index
const articles = []; // List to store article instances
const paidHTML = `<div class="paid-message">
    <h2>Accès Premium</h2>
    <p>Ce contenu est réservé aux utilisateurs premium. <a href="/subscribe">Abonnez-vous maintenant</a> pour y accéder.</p>
</div>`;
var statusColors = {
    none: "white",
    done: "#B2F2BB",
    problem: "#FFC9C9",
};
// SVG for the lock icon
const lockSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" viewBox="0 0 16 16" class="lock-icon">
        <path d="M8 1a4 4 0 0 0-4 4v3H3.5A1.5 1.5 0 0 0 2 9.5v5A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 12.5 8H12V5a4 4 0 0 0-4-4zm2 4H6V5a2 2 0 1 1 4 0v1zm-5 2h8a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5z"/>
    </svg>`;

// Initialize statuses from localStorage
const statuses = JSON.parse(localStorage.getItem("articleStatuses")) || {};

// Load articles on page load
window.onload = function () {
    // Scan HTML page for articles
    $("ul>li").each(function (index) {
        const url = $(this).data("url") || "undefined";
        const isPaid = $(this).data("paid") !== undefined;
        const id = $(this).data("id"); // Assuming each article has a unique ID

        // Append lock icon if the article is paid
        if (isPaid) {
            $(this).prepend(lockSVG);
        }

        // Initialize article with the correct status from localStorage
        const status = statuses[id] || "none"; // Default to 'none' if not in localStorage
        const article = new Article(id, url, isPaid, status);
        articles.push(article);

        // Update the UI with the article's status
        updateSidebarStatus($(this), article.status);

        // Handle status cycling on click
        const $this = $(this);
        $this.on("dblclick", function () {
            article.toggle_status();
            statuses[id] = article.status; // Update the status in localStorage
            updateSidebarStatus($this, article.status);
            localStorage.setItem("articleStatuses", JSON.stringify(statuses)); // Save to localStorage
            update_section_progress(articles, currentArticleIndex);

        });
    });

    // Check for missing articles in localStorage
    checkMissingArticles();
};

// Function to update the sidebar status color
function updateSidebarStatus($element, status) {

    if (status === "none") {
        $element.css("background-color", ""); // Remove inline color for undefined
    } else {
        $element.css("background-color", statusColors[status]);
    }
    localStorage.setItem("articleStatuses", JSON.stringify(statuses));
}

// Function to check for missing articles in localStorage
function checkMissingArticles() {
    $("ul>li").each(function () {
        const id = $(this).data("id");
        if (!statuses[id]) {
            console.warn(`Article with ID ${id} is missing from localStorage!`);
            statuses[id] = "none"; // Default to "none" if not in localStorage
        }
    });
}

// Function to load an article by its index
function loadArticle(index, updateHistory = true, forceupdate = false) {
    if (index < 0 || index >= articles.length) {
        console.error("Index out of bounds");
        return;
    }
    update_section_progress(articles, index);

    const article = articles[index];
    if (article.premium) {
        $("article").html(paidHTML);
    } else {
        let url = "/blog/not-found.html"
        if (article.url === "undefined") { url = "/blog/not-found.html" } 
        else  { url = article.url }

        $.get(url, function (data) {
            const parsedHTML = $("<div>").html(data);
            const mainContent = parsedHTML.find("main").html();
            if (mainContent) {
                $("article").html(mainContent);
                currentArticleIndex = index;
                MathJax.typeset(); // Trigger MathJax to re-render
            } else {
                $("article").html("<p>Pas de balise <main> trouvée.</p>");
            }
        }).fail(function () {
            $("article").html("<p>Erreur lors du chargement du contenu.</p>");
        });
    }
}

// Handle clicks on article items
$("ul>li").on("click", function () {
    const index = $("ul>li").index(this);
    loadArticle(index);
});

// undone article button
$("#undone").on("click", function () {
    if (currentArticleIndex !== undefined && currentArticleIndex < articles.length) {
        const article = articles[currentArticleIndex];
        article.status = "problem"; // Set the status to 'none'
        statuses[article.id] = article.status; // Update the status in localStorage
        updateSidebarStatus($("ul>li").eq(currentArticleIndex), article.status); // Update the UI
        localStorage.setItem("articleStatuses", JSON.stringify(statuses)); // Save to localStorage
        update_section_progress(articles, currentArticleIndex);

    } else {
        alert("Aucun article sélectionné.");
    }
});

// done article button
$("#done").on("click", function () {


    if (currentArticleIndex !== undefined && currentArticleIndex < articles.length) {
        const article = articles[currentArticleIndex];
        article.status = "done"; // Directly set the status to 'done'
        statuses[article.id] = article.status; // Update the status in localStorage
        updateSidebarStatus($("ul>li").eq(currentArticleIndex), article.status); // Update the UI
        localStorage.setItem("articleStatuses", JSON.stringify(statuses)); // Save to localStorage
        update_section_progress(articles, currentArticleIndex);

        if (currentArticleIndex < articles.length -1) { // last article do not move ahead
            loadArticle(currentArticleIndex + 1);
        }
    } else {
        alert("Selectionez un article");
    }
});

// Handle browser history navigation
window.onpopstate = function (event) {
    if (event.state && event.state.index !== undefined) {
        loadArticle(event.state.index, false); // Do not update history
    }
};