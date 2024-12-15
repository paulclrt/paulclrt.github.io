/*

This file should be triggered fromthe roadmap file

*/




// Function to calculate and update progress for a section
export function update_section_progress(articleList, currentArticleIndex) {
    const completionKey = "articleStatuses";
    let completionStatus = JSON.parse(localStorage.getItem(completionKey)) || {};

    // Function to calculate and update progress for a section
    function calculateSectionProgress(articles) {

        const currentArticle = articles[currentArticleIndex];
        var article = document.querySelector(`li[data-id="${currentArticle.id}"]`);
        const parentUl = article.parentElement;
        const sectionArticles = parentUl.children;
        


        function countStatusesInSection(sectionArticles, articles) {
            const statusCount = { done: 0, problem: 0, none: 0 };
            const articleArray = Array.from(sectionArticles);
        
            articleArray.forEach(article => {
                // Get the article's id from the data-id attribute
                const articleId = article.getAttribute('data-id');
        
                // Find the article in the articles list using its id
                const articleObject = articles.find(item => item.id === parseInt(articleId));
        
                // Get the status of the article (from the article object)
                const status = articleObject ? articleObject.status : 'none';
        
                // Count the status occurrences
                if (status === 'done') {
                    statusCount.done++;
                } else if (status === 'problem') {
                    statusCount.problem++;
                } else {
                    statusCount.none++;
                }
            });
            return statusCount;
        }





        const statusCount = countStatusesInSection(sectionArticles, articles);
        const totalArticles = sectionArticles.length;
        const completedArticles = statusCount.done; // Articles that are marked as done or with a problem

        const sectionProgress = (completedArticles / totalArticles) * 100;
        document.getElementById('section-progress-bar').style.width = `${sectionProgress}%`;

        return sectionProgress;
    }

    // Function to calculate and update total progress
    function calculateTotalProgress() {
        const totalArticles = articleList.length;// document.querySelectorAll(".table-of-content li").length;
        const statusCount = { done: 0, problem: 0, none: 0 };
        
        // Count completed articles from localStorage
        articleList.forEach((article) => {
            const status = completionStatus[article.id] || "none";
            statusCount[status]++;
        });


        const completedArticles = statusCount.done;
        const totalProgress = (completedArticles / totalArticles) * 100;
        
        document.getElementById('total-progress-bar').style.width = `${totalProgress}%`;

        return totalProgress;
    }

    // Recalculate progress for section and total
    calculateSectionProgress(articleList);
    calculateTotalProgress();
}
