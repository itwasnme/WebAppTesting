//package web.test;       // update this line based on where your test is

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;       // for chrome
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


class aModeTest {

	private WebDriver driver;
	private String url = "http://127.0.0.1:8000/";
	   
	@BeforeEach
	void setUp() throws Exception {
		System.setProperty("webdriver.chrome.driver", "C:\\Users\\Micky\\Desktop\\SeleniumDrivers\\chromedriver.exe");    // configure path to the driver
		driver = new ChromeDriver();    // create an instance of the web browser and open it
		driver.get(url);                // open the given url
		driver.findElement(By.name("modeA")).click();
	}

	@AfterEach
	void tearDown() throws Exception {
		driver.quit();                  // close the browser
	}

	@Test
	public void test_openURL() {
		assertEquals(driver.getTitle(), "Typing Speed Test A");	// check if we are on the right page
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
		Thread.sleep(1000); // Let timer run 1 second...
		driver.findElement(By.name("heading")).click();
		driver.findElement(By.name("textarea")).click();
		assertTrue(driver.getPageSource().contains("60s"));
	}
	
	@Test
	public void test_3() throws InterruptedException {
		driver.findElement(By.name("textarea")).click();
		assertFalse(driver.getPageSource().contains("$"));
		driver.findElement(By.name("textarea")).sendKeys("zebra");
		assertTrue(driver.getPageSource().contains("$"));
	}
	
	@Test
	public void test_4() throws InterruptedException {
		driver.findElement(By.name("textarea")).click();
		driver.findElement(By.name("textarea")).sendKeys("zebra!@#$dressmalechickensroastedreceiptmaniacaldisgustingmoangratisshamecollectmaterialpiescomparisonborrowstatuesquecrookarriveaboriginalthawwide-eyedvagabondprevioushauntbelligerentfryomniscientadditionwrenchtoughjumbledhaplesspermissibleadhesivestewblesspointlesswastevoyagegratefulclubossifiedpartnerplacidfeelingbellslethalsongs");
		assertTrue(driver.getPageSource().contains("z"));
	}
	
	@Test
	public void test_5() throws InterruptedException {
		driver.findElement(By.name("textarea")).click();
		Thread.sleep(3000);
		assertTrue(driver.getPageSource().contains("57s"));
	}
	
	@Test
	public void test_6() throws InterruptedException {
		driver.findElement(By.name("textarea")).click();
		Thread.sleep(60000);
		assertTrue(driver.getPageSource().contains("Restart"));
	}
	
	@Test
	public void test_7() throws InterruptedException {
		driver.findElement(By.name("textarea")).click();
		driver.findElement(By.name("textarea")).sendKeys("aaaaaa");
		Thread.sleep(61000);
		assertTrue(driver.getPageSource().contains("WPM"));
	}
	
	@Test
	public void test_8() throws InterruptedException {
		driver.findElement(By.name("textarea")).click();
		driver.findElement(By.name("textarea")).sendKeys("aaaaaa");
		Thread.sleep(61000);
		assertTrue(driver.getPageSource().contains("Click on restart to start a new game..."));
	}
	
	@Test
	public void test_9() throws InterruptedException {
		driver.findElement(By.name("textarea")).click();
		driver.findElement(By.name("textarea")).sendKeys("za");
		Boolean isZPresent = driver.findElements(By.cssSelector(".incorrect_char")).size() == 1;
		Boolean isEPresent = driver.findElements(By.cssSelector(".correct_char")).size() == 1;
		assertTrue(isZPresent && isEPresent);
	}
	
	@Test
	public void test_10() throws InterruptedException {
		driver.findElement(By.name("textarea")).click();
		driver.findElement(By.name("textarea")).sendKeys("zebra!@#$dressmal");
		driver.findElement(By.name("textarea")).sendKeys("e");
		assertTrue(driver.getPageSource().contains("4"));
	}
	
	@Test
	public void test_11() throws InterruptedException {
		driver.findElement(By.name("textarea")).click();
		driver.findElement(By.name("textarea")).sendKeys("zebra!@#$dressmal");
		driver.findElement(By.name("textarea")).sendKeys("+");
		assertTrue(driver.getPageSource().contains("3"));
	}
}