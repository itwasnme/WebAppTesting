import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver; 
import org.openqa.selenium.chrome.ChromeDriver;       // for chrome
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


class bModeTest {

	private WebDriver driver;
	private String url = "http://127.0.0.1:8000/";
	   
	@BeforeEach
	void setUp() throws Exception {
		System.setProperty("webdriver.chrome.driver", "C:\\Users\\Micky\\Desktop\\SeleniumDrivers\\chromedriver.exe");    // configure path to the driver
		driver = new ChromeDriver();    // create an instance of the web browser and open it
		driver.get(url);                // open the given url
		driver.findElement(By.name("modeB")).click();
	}

	@AfterEach
	void tearDown() throws Exception {
		driver.quit();                  // close the browser
	}

	@Test
	public void test_openURL() {
		assertEquals(driver.getTitle(), "Typing Speed Test B");	// check if we are on the right page
	}
	
	@Test
	public void test_1() throws InterruptedException {
		assertTrue(driver.getPageSource().contains("Click on the area below to start the game..."));
		driver.findElement(By.name("textarea")).click();
		assertFalse(driver.getPageSource().contains("Click on the area below to start the game..."));
	}
	
	@Test
	public void test_2() throws InterruptedException {
		driver.findElement(By.name("textarea")).click();
		Thread.sleep(31000);
		driver.findElement(By.name("restartbtn")).click();
		assertTrue(driver.getPageSource().contains("0s"));
	}
	
	@Test
	public void test_3() throws InterruptedException {
		assertFalse(driver.getPageSource().contains("z"));
		driver.findElement(By.name("textarea")).click();
		assertTrue(driver.getPageSource().contains("z"));
	}
	
	@Test
	public void test_4() throws InterruptedException {
		driver.findElement(By.name("textarea")).click();
		Thread.sleep(3000);
		assertTrue(driver.getPageSource().contains("3s"));
	}
	
	@Test
	public void test_5() throws InterruptedException {
		driver.findElement(By.name("textarea")).click();
		Thread.sleep(31000);
		assertTrue(driver.getPageSource().contains("30s"));
	}
	
	@Test
	public void test_6() throws InterruptedException {
		driver.findElement(By.name("textarea")).click();
		driver.findElement(By.name("textarea")).sendKeys("abcdefghijklmnopqrstuvwxyz");
		Thread.sleep(3000);
		assertTrue(driver.getPageSource().contains("0s"));
	}
	
	@Test
	public void test_7() throws InterruptedException {
		driver.findElement(By.name("textarea")).click();
		driver.findElement(By.name("textarea")).sendKeys("ab");
		Boolean isABPresent = driver.findElements(By.cssSelector(".correct_char")).size() == 2; //Since there should be two green characters ('a' and 'b')
		assertTrue(isABPresent);
	}
	
	@Test
	public void test_8() throws InterruptedException {
		driver.findElement(By.name("textarea")).click();
		driver.findElement(By.name("textarea")).sendKeys("%^");
		Boolean isABPresent = driver.findElements(By.cssSelector(".incorrect_char")).size() == 2; //Since there should be two red characters ('a' and 'b')
		assertTrue(isABPresent);
	}
	
	@Test
	public void test_9() throws InterruptedException {
		driver.findElement(By.name("textarea")).click();
		driver.findElement(By.name("textarea")).sendKeys("abcdefghijklmnopqrstuvwxy");
		Thread.sleep(1000);
		driver.findElement(By.name("textarea")).sendKeys("z");
		assertTrue(driver.getPageSource().contains("60"));
	}
	 
}