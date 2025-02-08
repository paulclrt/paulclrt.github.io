import { update_section_progress } from "./progressbar.js";



class Article {
    constructor(id, url, premium, status, type) {
        this.id = id
        this.url = url
        this.premium = premium // free, paid
        this.status = status // done, problem, none
        this.type = type 
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
    <p style="color: red;">Warning: A la date de ce jour, l'abonnement premium n'est pas encore disponible. Lorsqu'il le sera, ce text aura disparu et vous pourrez l'acheter</p>
</div>`;
var statusColors = {
    none: "white",
    done: "#B2F2BB",
    problem: "#FFC9C9",
};
// SVG for the lock icon
const lockSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" viewBox="0 0 16 16" class="icon">
        <path d="M8 1a4 4 0 0 0-4 4v3H3.5A1.5 1.5 0 0 0 2 9.5v5A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 12.5 8H12V5a4 4 0 0 0-4-4zm2 4H6V5a2 2 0 1 1 4 0v1zm-5 2h8a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5z"/>
    </svg>`;
const articleSVG = `<svg fill="#000000" class="icon" width="16" height="16" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 465 465" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M405.437,0h-10c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h2.5v435h-2.5c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5 h10c4.143,0,7.5-3.358,7.5-7.5V7.5C412.937,3.358,409.579,0,405.437,0z"></path> <path d="M315.437,140H109.563c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h205.873c4.143,0,7.5-3.358,7.5-7.5 S319.579,140,315.437,140z"></path> <path d="M315.437,260H109.563c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h205.873c4.143,0,7.5-3.358,7.5-7.5 S319.579,260,315.437,260z"></path> <path d="M315.437,300H232.5c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h82.937c4.143,0,7.5-3.358,7.5-7.5 S319.579,300,315.437,300z"></path> <path d="M365.437,0H129.563c-0.251,0-0.501,0.013-0.749,0.038c-0.184,0.019-0.365,0.05-0.545,0.082 c-0.06,0.011-0.122,0.016-0.182,0.028c-0.215,0.043-0.425,0.098-0.632,0.159c-0.025,0.008-0.052,0.012-0.077,0.02 c-0.212,0.064-0.419,0.141-0.623,0.223c-0.022,0.009-0.044,0.015-0.066,0.024c-0.195,0.081-0.383,0.172-0.569,0.269 c-0.031,0.016-0.064,0.029-0.094,0.045c-0.173,0.093-0.339,0.196-0.504,0.301c-0.042,0.027-0.086,0.049-0.127,0.077 c-0.154,0.103-0.3,0.216-0.446,0.33c-0.048,0.038-0.098,0.07-0.145,0.109c-0.173,0.142-0.338,0.293-0.498,0.451 c-0.015,0.015-0.031,0.027-0.046,0.042l-70,70c-0.018,0.018-0.033,0.039-0.051,0.057c-0.153,0.156-0.301,0.317-0.44,0.486 c-0.044,0.054-0.082,0.112-0.125,0.167c-0.108,0.138-0.215,0.277-0.313,0.423c-0.033,0.049-0.06,0.101-0.092,0.151 c-0.1,0.157-0.199,0.315-0.287,0.48c-0.02,0.037-0.035,0.075-0.054,0.112c-0.093,0.181-0.182,0.363-0.261,0.552 c-0.011,0.026-0.019,0.054-0.03,0.081c-0.08,0.2-0.155,0.402-0.218,0.61c-0.008,0.026-0.013,0.053-0.021,0.08 c-0.061,0.207-0.116,0.416-0.158,0.63c-0.012,0.059-0.017,0.119-0.027,0.178c-0.032,0.182-0.064,0.363-0.082,0.549 c-0.025,0.248-0.038,0.498-0.038,0.749v380c0,4.142,3.357,7.5,7.5,7.5h305.873c4.143,0,7.5-3.358,7.5-7.5V7.5 C372.937,3.358,369.579,0,365.437,0z M122.063,25.606V70H77.67L122.063,25.606z M357.937,450H67.063V85h62.5 c4.143,0,7.5-3.358,7.5-7.5V15h220.873V450z"></path> <path d="M159.563,85h155.873c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5H159.563c-4.143,0-7.5,3.358-7.5,7.5 S155.421,85,159.563,85z"></path> <path d="M315.437,180H232.5c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h82.937c4.143,0,7.5-3.358,7.5-7.5 S319.579,180,315.437,180z"></path> <path d="M315.437,220H232.5c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h82.937c4.143,0,7.5-3.358,7.5-7.5 S319.579,220,315.437,220z"></path> <path d="M192.5,315c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5h-82.937c-4.143,0-7.5,3.358-7.5,7.5v80 c0,4.142,3.357,7.5,7.5,7.5H192.5c4.143,0,7.5-3.358,7.5-7.5v-50c0-4.142-3.357-7.5-7.5-7.5s-7.5,3.358-7.5,7.5V380h-67.937v-65 H192.5z"></path> <path d="M109.563,235H192.5c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5h-82.937c-4.143,0-7.5,3.358-7.5,7.5 S105.421,235,109.563,235z"></path> <path d="M265.437,380H232.5c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h32.937c4.143,0,7.5-3.358,7.5-7.5 S269.579,380,265.437,380z"></path> <path d="M315.437,340H232.5c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h82.937c4.143,0,7.5-3.358,7.5-7.5 S319.579,340,315.437,340z"></path> <path d="M109.563,195H192.5c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5h-82.937c-4.143,0-7.5,3.358-7.5,7.5 S105.421,195,109.563,195z"></path> </g> </g></svg>`
const videoSVG = `<svg viewBox="0 0 24 24" class="icon" width="16" height=16 fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 3H6C3.79086 3 2 4.79086 2 7V17C2 19.2091 3.79086 21 6 21H18C20.2091 21 22 19.2091 22 17V7C22 4.79086 20.2091 3 18 3Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10.28 8.03994C9.19003 8.42994 9 10.5199 9 12.0399C9 13.5599 9.19003 15.5999 10.28 16.0399C11.37 16.4799 16 13.7499 16 12.0399C16 10.3299 11.44 7.61994 10.28 8.03994Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
const codeSVG = `<svg height="16" width="16" class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 2.5V5C13 7.35702 13 8.53553 13.7322 9.26777C14.4645 10 15.643 10 18 10H22" stroke="#1C274C" stroke-width="1.5"></path> <path d="M7 14L6 15L7 16M11.5 16L12.5 17L11.5 18M10 14L8.5 18" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2.75 10C2.75 9.58579 2.41421 9.25 2 9.25C1.58579 9.25 1.25 9.58579 1.25 10H2.75ZM21.25 14C21.25 14.4142 21.5858 14.75 22 14.75C22.4142 14.75 22.75 14.4142 22.75 14H21.25ZM15.3929 4.05365L14.8912 4.61112L15.3929 4.05365ZM19.3517 7.61654L18.85 8.17402L19.3517 7.61654ZM21.654 10.1541L20.9689 10.4592V10.4592L21.654 10.1541ZM3.17157 20.8284L3.7019 20.2981H3.7019L3.17157 20.8284ZM20.8284 20.8284L20.2981 20.2981L20.2981 20.2981L20.8284 20.8284ZM1.35509 5.92658C1.31455 6.33881 1.61585 6.70585 2.02807 6.7464C2.4403 6.78695 2.80734 6.48564 2.84789 6.07342L1.35509 5.92658ZM22.6449 18.0734C22.6855 17.6612 22.3841 17.2941 21.9719 17.2536C21.5597 17.2131 21.1927 17.5144 21.1521 17.9266L22.6449 18.0734ZM14 21.25H10V22.75H14V21.25ZM2.75 14V10H1.25V14H2.75ZM21.25 13.5629V14H22.75V13.5629H21.25ZM14.8912 4.61112L18.85 8.17402L19.8534 7.05907L15.8947 3.49618L14.8912 4.61112ZM22.75 13.5629C22.75 11.8745 22.7651 10.8055 22.3391 9.84897L20.9689 10.4592C21.2349 11.0565 21.25 11.742 21.25 13.5629H22.75ZM18.85 8.17402C20.2034 9.3921 20.7029 9.86199 20.9689 10.4592L22.3391 9.84897C21.9131 8.89241 21.1084 8.18853 19.8534 7.05907L18.85 8.17402ZM10.0298 2.75C11.6116 2.75 12.2085 2.76158 12.7405 2.96573L13.2779 1.5653C12.4261 1.23842 11.498 1.25 10.0298 1.25V2.75ZM15.8947 3.49618C14.8087 2.51878 14.1297 1.89214 13.2779 1.5653L12.7405 2.96573C13.2727 3.16993 13.7215 3.55836 14.8912 4.61112L15.8947 3.49618ZM10 21.25C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981L2.64124 21.3588C3.38961 22.1071 4.33855 22.4392 5.51098 22.5969C6.66182 22.7516 8.13558 22.75 10 22.75V21.25ZM1.25 14C1.25 15.8644 1.24841 17.3382 1.40313 18.489C1.56076 19.6614 1.89288 20.6104 2.64124 21.3588L3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14H1.25ZM14 22.75C15.8644 22.75 17.3382 22.7516 18.489 22.5969C19.6614 22.4392 20.6104 22.1071 21.3588 21.3588L20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25V22.75ZM10.0298 1.25C8.15538 1.25 6.67442 1.24842 5.51887 1.40307C4.34232 1.56054 3.39019 1.8923 2.64124 2.64124L3.7019 3.7019C4.12453 3.27928 4.70596 3.02525 5.71785 2.88982C6.75075 2.75158 8.11311 2.75 10.0298 2.75V1.25ZM2.84789 6.07342C2.96931 4.83905 3.23045 4.17335 3.7019 3.7019L2.64124 2.64124C1.80633 3.47616 1.48944 4.56072 1.35509 5.92658L2.84789 6.07342ZM21.1521 17.9266C21.0307 19.1609 20.7695 19.8266 20.2981 20.2981L21.3588 21.3588C22.1937 20.5238 22.5106 19.4393 22.6449 18.0734L21.1521 17.9266Z" fill="#1C274C"></path> </g></svg>`





// Initialize statuses from localStorage
const statuses = JSON.parse(localStorage.getItem("articleStatuses")) || {};

// Load articles on page load
window.onload = function () {
    // Scan HTML page for articles
    $("ul>li").each(function (index) {
        const url = $(this).data("url") || "undefined";
        const isPaid = $(this).data("paid") !== undefined;
        const id = $(this).data("id"); // Assuming each article has a unique ID
        const type = $(this).data("type"); // is it a code, video, article to know how to display it

        // Append lock icon if the article is paid
        if (isPaid) {
            $(this).prepend(lockSVG);
        }
        else if (type === "code") {
            $(this).prepend(codeSVG)
        } else if (type === "article") {
            $(this).prepend(articleSVG)
        } else if (type === "video") {
            $(this).prepend(videoSVG)
        }


        // Initialize article with the correct status from localStorage
        const status = statuses[id] || "none"; // Default to 'none' if not in localStorage
        const article = new Article(id, url, isPaid, status, type);
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
            if (article.type === "code") {
                const parsedHTML = $("<div>").html(data);

                // Extract <style> tags and append them to the <head>
                const styles = parsedHTML.find("style");
                // Extract <script> tags and evaluate them
                const scripts = parsedHTML.find("script");
                scripts.each(function () {
                    $.globalEval($(this).text());
                });

                // Extract the <main> content
                var mainContent = parsedHTML.find("main");
                mainContent.append(styles);
                mainContent = mainContent.html();
                

                if (mainContent) {
                    $("article").html(mainContent);
                    currentArticleIndex = index;
                } else {
                    $("article").html("<p>Pas de balise <main> trouvée.</p>");
                }
            } else if (article.type === "article") {

                const parsedHTML = $("<div>").html(data);
                const mainContent = parsedHTML.find("main").html();
                if (mainContent) {
                    $("article").html(mainContent);
                    currentArticleIndex = index;
                    MathJax.typeset(); // Trigger MathJax to re-render
                } else {
                    $("article").html("<p>Pas de balise <main> trouvée.</p>");
                }
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
