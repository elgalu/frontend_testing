// Selenium Grid url
//   SEL_PORT=4444 browser=chrome npm test
//   SEL_PORT=4444 browser=firefox npm test
var dockerMachineHost = (typeof process.env.DOCKER_MACHINE_HOST === "undefined") ?
    "localhost" : process.env.DOCKER_MACHINE_HOST;
var seleniumPort = process.env.SEL_PORT || '4444';
var seleniumGridUrl = 'http://' + dockerMachineHost + ':' + seleniumPort + '/wd/hub';
var driver;
var zalandoSites = ['https://www.zalando.de',
                    'https://www.zalando.co.uk',
                    'https://www.zalando.es',
                    'https://www.zalando.pl',
                    'https://www.zalando.ch',
                    'https://www.zalando.fr',
                    'https://www.zalando.se',
                    'https://www.zalando.be',
                    'https://www.zalando.fi',
                    'https://www.zalando.dk',
                    ];
shuffle(zalandoSites);
// Using the mock:
//   docker run --rm -ti --name=zalando_mock -p 8080:8080 elgalu/uk_mock
//   ZALANDO_WEB_SITE=localhost:8080
var zalandoBaseSite = process.env.ZALANDO_WEB_SITE || 'https://www.zalando.de';
var zalandoSite = zalandoBaseSite;

// Create a new instance of WebDriver
var webDriver = require('selenium-webdriver');
var By = webDriver.By;
var webDriverBrowser = webDriver.Browser.CHROME;
if (process.env.browser === 'firefox') {
    webDriverBrowser = webDriver.Browser.FIREFOX;
}

// Getting the Chai expect library for assertions
var expect = require('chai').expect;

const mochaTimeOut = 50000, innerPause = 1000; //ms

var siteNum = 0;

for (var i = 0; i < zalandoSites.length; i++) {
describe('Add to Bag', function(done) {
    this.timeout(mochaTimeOut);

    beforeEach(function() {
        var capabilities = new webDriver.Capabilities().
        set(webDriver.Capability.BROWSER_NAME, webDriverBrowser);
        // set(webDriver.Capability.PLATFORM, 'LINUX');

        driver = new webDriver.Builder()
            .withCapabilities(capabilities)
            .usingServer(seleniumGridUrl)
            .build();

        driver.manage().window().maximize().then(done);

        if (zalandoBaseSite.indexOf('www.zalando') > -1) {
            zalandoSite = zalandoSites[siteNum];
            siteNum += 1;
        }
    });

    it('Add article to bag and assert title', function(done) {

        // Go to the homepage
        driver.get(zalandoSite + '/').then(function() {
            console.log('Loading ' + zalandoSite + '/...');
        });
        driver.sleep(innerPause);

        // Type "Nike" in the search field
        var searchField = driver.findElement(By.id("searchContent"));
        searchField.sendKeys("Nike");
        searchField.submit().then(function(){
            console.log("Typing Nike in the search field...");
        });
        driver.sleep(innerPause);

        // Click on the first article
        driver.findElements(By.className("catalogArticlesList_productBox")).then(function(articlesList){
            articlesList[0].click();
            console.log("Clicking on the first article...");
        });
        driver.sleep(innerPause);

        // Click on the size select drop down
        var sizeSelect = driver.findElement(By.id("sizeSelect"));
        sizeSelect.click().then(function() {
            console.log("Selecting the first available size...");
        });
        driver.sleep(3000);

        // Get article name for further assertion
        // var expectedArticleBrand = "";
        // driver.findElement(By.css("span[itemprop='brand']")).getText().then(function(text) {
        //     expectedArticleBrand = text;
        // });
        // var expectedArticleName = "";
        // driver.findElement(By.css("span[itemprop='name']")).getText().then(function(text) {
        //     expectedArticleName = text;
        // });

        // Select the first available size from the list
        driver.findElements(By.css("li[class='available sizeLine']")).then(function(availableSizes){
            if (availableSizes.length > 0) {
                availableSizes[0].click();
            } else {
                driver.findElements(By.css("li[class='available sizeLine active']")).then(function(availableSizesActive){
                    availableSizesActive[0].click();
                });
            }
        });
        driver.sleep(innerPause);

        // Add to bag and go to it
        var addToBagButton = driver.findElement(By.id("ajaxAddToCartBtn"));
        addToBagButton.click();
        var goToBagButton = driver.findElement(By.name("head.text:cart.x:4.y:1"));
        goToBagButton.click().then(function() {
            console.log("Adding to bag and going to bag page...");
        });
        driver.sleep(innerPause);

        // Assert article's name and price
        // driver.findElement(By.name("cart.product.name")).getText().then(function(actualArticleName) {
        //     var expectedArticleFullName = expectedArticleBrand + " " + expectedArticleName;
        //     expect(actualArticleName).to.equal(expectedArticleFullName, "Article name is different.");
        //     done();
        // });

        // Go to the cart
        driver.get(zalandoSite + '/cart/').then(function() {
            console.log('Loading ' + zalandoSite + '/cart/...');
            driver.sleep(3000).then(function () {
                done();
            });
        });

    });

    afterEach(function(done) {
        // Quitting the browser
        driver.quit().then(done);
    });
});
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
