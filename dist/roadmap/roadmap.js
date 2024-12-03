let currentArticleIndex = undefined; // L'index actuel
const articles = []; // Liste des URLs des articles
// Initialiser la liste des articles depuis les éléments <li>
$("ul>li").each(function () {
    const url = $(this).data("url");
    if (url) 
        articles.push(url);
    
});
// Fonction pour charger un article par son index
function loadArticle(index, updateHistory = true) {
    if (index < 0 || index >= articles.length) {
        console.error("Index en dehors des limites");
        return;
    }
    
    const url = articles[index];
    $.get(url, function (data) {
        const parsedHTML = $("<div>").html(data);
        const mainContent = parsedHTML.find("main").html();
        if (mainContent) {
            $("article").html(mainContent);
            currentArticleIndex = index; // Mettre à jour l'index courant
            // Ajouter l'URL dans l'historique du navigateur
            if (updateHistory) {
                history.pushState({ index }, "", url);
            }
        } else {
            $("article").html("<p>Pas de balise <main> trouvée.</p>");
        }
    }).fail(function () {
        $("article").html("<p>Erreur lors du chargement du contenu.</p>");
    });
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