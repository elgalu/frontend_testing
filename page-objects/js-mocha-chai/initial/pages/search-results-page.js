var webDriver = require('selenium-webdriver');
var By = webDriver.By;

SearchResultsPage = function SearchResultsPage(driver) {
    this.driver = driver;
    this.articlesListLocator = By.className("catalogArticlesList_productBox");
};

SearchResultsPage.prototype.clickOnFirstArticle = function() {
    this.driver.findElements(this.articlesListLocator).then(function(articlesList){
        articlesList[0].click();
    });
};

SearchResultsPage.prototype.search = function(searchText) {
    this.driver.findElement(this.searchField).sendKeys(searchText);
    this.driver.findElement(this.searchField).submit();
};

module.exports = SearchResultsPage;