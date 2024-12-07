let currentArticleIndex = undefined; // L'index actuel
const articles = []; // Liste des URLs des articles
const paidHTML = `<div class="paid-message">
    <h2>Accès Premium</h2>
    <p>Ce contenu est réservé aux utilisateurs premium. <a href="/subscribe">Abonnez-vous maintenant</a> pour y accéder.</p>
</div>`;

// SVG for the lock icon
const lockSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" viewBox="0 0 16 16" class="lock-icon">
        <path d="M8 1a4 4 0 0 0-4 4v3H3.5A1.5 1.5 0 0 0 2 9.5v5A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 12.5 8H12V5a4 4 0 0 0-4-4zm2 4H6V5a2 2 0 1 1 4 0v1zm-5 2h8a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5z"/>
    </svg>`;

// Initialiser la liste des articles depuis les éléments <li>
$("ul>li").each(function () {
    const url = $(this).data("url");
    const isPaid = $(this).data("paid") !== undefined;

    // Append lock icon if the article is paid
    if (isPaid) {
        $(this).prepend(lockSVG);
    }

    articles.push({ url: url || "/blog/not-found.html", isPaid });
});

window.onload = function () {
    // get the idx param in url if it exists and load the article
    var url = window.location.href;
    var params = url.split("?")[1];
    if (params) {
        var paramsArr = params.split("&");
        for (let p = 0; p < paramsArr.length; p++) {
            let split = paramsArr[p].split("=");
            if (split[0] === "idx") {
                const idx = parseInt(split[1]);
                loadArticle(idx);
                break;
            }
        }
    }
};

function updateURLParameter(url, paramVal) {
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var updatedURL = baseURL + "?idx=" + paramVal;
    window.history.replaceState("", "", updatedURL);
}

// Fonction pour charger un article par son index
function loadArticle(index, updateHistory = true) {
    if (index < 0 || index >= articles.length) {
        console.error("Index en dehors des limites");
        return;
    }

    const article = articles[index];
    if (article.isPaid) {
        // Affiche le contenu personnalisé pour les articles payants
        $("article").html(paidHTML);
    } else {
        // Charge l'article normalement
        $.get(article.url, function (data) {
            const parsedHTML = $("<div>").html(data);
            const mainContent = parsedHTML.find("main").html();
            if (mainContent) {
                $("article").html(mainContent);
                currentArticleIndex = index; // Mettre à jour l'index courant
                // Trigger MathJax pour re-render
                MathJax.typeset();

                // Ajouter l'URL dans l'historique du navigateur
                if (updateHistory) {
                    updateURLParameter(window.location.href, currentArticleIndex);
                }
            } else {
                $("article").html("<p>Pas de balise <main> trouvée.</p>");
            }
        }).fail(function () {
            $("article").html("<p>Erreur lors du chargement du contenu.</p>");
        });
    }
}

// Événement sur les éléments <li>
$("ul>li").on("click", function () {
    const index = $("ul>li").index(this); // Trouver l'index de l'élément cliqué
    loadArticle(index);
});

// Événement pour le bouton "Précédent"
$("#prev").on("click", function () {
    if (currentArticleIndex > 0) {
        loadArticle(currentArticleIndex - 1);
    } else {
        alert("Vous êtes déjà au premier article.");
    }
});

// Événement pour le bouton "Suivant"
$("#next").on("click", function () {
    if (currentArticleIndex < articles.length - 1) {
        loadArticle(currentArticleIndex + 1);
    } else {
        alert("Vous êtes déjà au dernier article.");
    }
});

// Gérer les événements "popstate" (boutons retour/avant du navigateur)
window.onpopstate = function (event) {
    if (event.state && event.state.index !== undefined) {
        loadArticle(event.state.index, false); // Ne pas ajouter à l'historique
    }
};
