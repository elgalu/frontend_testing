import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.net.MalformedURLException;
import java.net.URL;

public class FirstWebDriverTestJavaTestNGTest {

    // Setting the url for the WebDriver
    private static final String URL = "http://localhost:4444/wd/hub";

    @Test
    public void checkPHPTravelsPageTitle() throws MalformedURLException {
        DesiredCapabilities desiredCapabilities = DesiredCapabilities.chrome();
        desiredCapabilities.setCapability(CapabilityType.PLATFORM, Platform.LINUX);

        // Create a new instance of the remote web driver
        WebDriver driver = new RemoteWebDriver(new URL(URL), desiredCapabilities);

        // Maximize the window
        driver.manage().window().maximize();

        // Go to PHPTravels website
        driver.get("https://www.zalando.de/");

        // Assert that the title is the expected one
        Assert.assertEquals(driver.getTitle(), "Schuhe & Mode online kaufen | ZALANDO Online Shop",
                "Page title is not the expected one");

        // Close the browser
        driver.quit();
    }

}
