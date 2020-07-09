//Processes a list of URLS using child processes and creates a report file
//report.csv containing the axe-report results for each url.
//Each URL is processed
//in a separate child process that is run synchronously with the 
//spawnSync functionality.  Control is not returned to this main script
//until the webpage has been analyzed and the report lines have been
//generated as output from the child process.
//Usage:  node FA11y.js

const {spawnSync} = require ('child_process');
var fs = require ('fs');
var headers='headers'
var filename = process.argv[2];
let jsonData = require('./fa11y_config.json'); //Reads the JSON file of the configurations and assigns the file to the variable'jsonData'.

var input_URL_fp = jsonData["input_URL_fp"]; //Assigns the list of URLs to a variable.
var input_del = jsonData["input_del"]; //Assigns the chosen delimiter to a variable
var output_fp = jsonData["output_fp"]; //Assigns the name of the output file to a variable.
var WCAG_guidelist = jsonData["WCAG_guidelist"]; //Assigns the guidelines to be tested on to a variable.

fs.writeFile(output_fp,'', (err)=> {   //Create csv file
  if(err) {
    console.log('error writing');
  }
});

var url_array = fs.readFileSync(input_URL_fp).toString().split(input_del); //Creates array of urls from the input file of urls.

for (const url of url_array) {  
  console.log("Processing URL:", url)
  page=spawnSync('node',['psg-child-process',url,headers])  //Spawns child process to process url
  headers = ''      //Don't print headers after the first url is processed
  fs.appendFile(output_fp,page.stdout, (err)=> {  //stdout will contain axe-report lines
     if(err) {
       console.log('error writing');
      }
    });

 };
