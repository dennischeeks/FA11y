//Processes a list of URLS using child processes and creates a report file
//furman-report.csv containing the axe-report results for each url.
//Each URL is processed
//in a separate child process that is run synchronously with the 
//spawnSync functionality.  Control is not returned to this main script
//until the webpage has been analyzed and the report lines have been
//generated as output from the child process.
//Usage:  node psg-multiple-url

const {spawnSync} = require ('child_process');
var fs = require ('fs');
var headers='headers'
var readline = require('readline');
var filename = process.argv[2];


fs.writeFile('furman-report.csv','', (err)=> {   //Create csv file
  if(err) {
    console.log('error writing');
  }
});

// var urls = []; //creates list

// fs.readFileSync('list-of-urls.txt', function(err, data) { //reads file list-of-urls.txt
//     if(err) throw err;
//     urls.push(data.toString().split("\r\n")); //takes items from the text file and puts them into the list.
//     console.log(urls);
// });

//for (var url of [urls][0]) {  //I think my problem lies somewhere within this for loop.
readline.createInterface({
    input: fs.createReadStream('list-of-urls.txt'),
    terminal: false
}).on('line', function(url) {  
  //console.log("processing ",url,' with headers ',headers)  
  console.log("processing URL:", url)
  //console.log(array[i])
  page=spawnSync('node',['psg-child-process',url,headers])  //Spawns child process to process url
    //console.log('stdout:', stdout);
  headers = ''      //Don't print headers after the first url is processed
  fs.appendFile('furman-report.csv',page.stdout, (err)=> {  //stdout will contain axe-report lines
     if(err) {
       console.log('error writing');
      }
    });

 });