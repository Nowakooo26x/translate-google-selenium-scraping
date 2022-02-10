const console = require('console');
const {Builder, By, Key, until} = require('selenium-webdriver');
fs = require('fs');

async function getWordTranslate(item = "dog") {
    const url = `https://translate.google.com/?hl=pl&dog&sl=en&tl=pl&text=${item}&op=translate`;
    
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get(url)
    await driver.findElement(By.css('button[jsname=higCR]')).click();

    let ele = await driver.wait(until.elementLocated(By.css('span[jsname=W297wb]')),10000);
    let text = await ele.getText();

    await driver.quit();

    return await text;
};

fs.readFile('words.txt', 'utf8', async function (err,data) {
    if (err) {
      return console.log(err);
    }

    let array = data.split('\n');
    console.log(array.length)

    let arrayAddToArray = []

    for(let i = 0; i < array.length; i++){
        arrayAddToArray.push(await getWordTranslate(array[i]))

        if(i%5===0){
            setTimeout(function(){
                console.log("500ms time out.")
                console.log(`To finish ${i} / ${array.length}`)
            }, 500);
        }
        
    }

    console.log(await arrayAddToArray)

    let test = arrayAddToArray.join("\n")

    fs.writeFile('result.txt', test, err => {
        if (err) {
          console.error(err)
          return
        }
    })
});















