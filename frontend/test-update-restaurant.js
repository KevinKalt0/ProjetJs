const { Builder, By, Key, until } = require('selenium-webdriver');

async function runTest() {
  let driver = await new Builder().forBrowser('chrome').build(); 
  try {
    await driver.get('http://localhost:8080/update/'); 

    await driver.sleep(2000);

    await driver.findElement(By.name('name')).sendKeys('Nouveau nom du restaurant');
    await driver.findElement(By.name('address')).sendKeys('Nouvelle adresse du restaurant');
    await driver.findElement(By.name('contact')).sendKeys('Nouveau numéro de contact du restaurant');

    await driver.findElement(By.xpath("//button[contains(text(),'Update Restaurant')]")).click();

    await driver.sleep(2000);

    let pageTitle = await driver.getTitle();
    if (pageTitle.includes('Home')) {
      console.log('Test réussi : Mise à jour du restaurant effectuée avec succès.');
    } else {
      console.error('Test échoué : Redirection vers la page d\'accueil non effectuée.');
    }
  } finally {
    await driver.quit();
  }
}

runTest();
