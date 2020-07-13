//Analyzes one site using headless-chrome and creates the report
//by creating the headers separately from the rest of the report
//
//Usage: Create child process from fa11y.js
//Works!!

//var url="https://www.furman.edu";  //For testing only
//var headers ='headers'

var url=process.argv[2];
var headers=process.argv[3];

//console.log('url: ',url);
//console.log('headers: ',headers);

const { SeleniumServer } = require('selenium-webdriver/remote');

var AxeBuilder = require('axe-webdriverjs'),
    AxeReports = require('axe-reports'),
    webdriver = require('selenium-webdriver'),
    chrome=require('selenium-webdriver/chrome')
    By = webdriver.By,
    until = webdriver.until,
    opts=new chrome.Options();
    opts.addArguments('headless');

var driver = new webdriver.Builder()    //Create Driver
    .forBrowser('chrome') //or firefox or whichever driver you use
    .withCapabilities(webdriver.Capabilities.chrome())
    .setChromeOptions(opts)
    .build();

var AXE_BUILDER = AxeBuilder(driver)    //Create axeBuilder on the driver
    .withTags(['wcag2a', 'wcag2aa']); // specify your test criteria (see aXe documentation for more info)

if(headers == 'headers') {
    AxeReports.createCsvReportHeaderRow();  //Create headers
}
driver.get(url);   //Open URL'
driver.wait(until.urlContains('furman'))  //Wait until page opens
    .then(function () {
        AXE_BUILDER.analyze(function (err,results) {    //Analyze page
            if (err) { console.log('error analyzing')
            } 
           // console.log(url);
            AxeReports.createCsvReportRow(results);  //Create results for page
        });
    });
//driver.quit();
