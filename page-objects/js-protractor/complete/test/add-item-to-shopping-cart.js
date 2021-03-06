// Page Objects
var HomePage = require('../pages/home-page.js');


describe('Add item to Shopping Cart', function() {
    var homePage;
    var searchResultsPage;
    var productDetailPage;
    var shoppingCartPage;

    var expectedProductBrand;
    var expectedProductName;

    beforeEach(function() {
        // Needed since we are not testing an Angular app.
        browser.ignoreSynchronization = true;
    });

    it('Load Zalando home page', function() {
        browser.driver.manage().window().maximize();
        homePage = new HomePage();
        homePage.visit();
    });

    it('Type Nike in the search field', function() {
        searchResultsPage = homePage.search('Nike');
    });

    it('Click on the first item', function() {
        productDetailPage = searchResultsPage.clickOnFirstArticle();
    });

    it('Get article brand and name', function() {
        expectedProductBrand = productDetailPage.getProductBrand();
        expectedProductName = productDetailPage.getProductName();
    });

    it('Click on the first available size', function() {
        productDetailPage.selectFirstAvailableSize();
    });

    it('Add product to shopping cart', function() {
        productDetailPage.addToShoppingCart();
    });

    it('Go to shopping cart', function() {
        shoppingCartPage = productDetailPage.goToShoppingCart();
    });

    it('Assert article brand and name', function() {
        shoppingCartPage.getProductBrand().then(function (text) {
            expect(expectedProductBrand).toEqual(text.toUpperCase());
        });
        expect(expectedProductName).toEqual(shoppingCartPage.getProductName());
    });
});

