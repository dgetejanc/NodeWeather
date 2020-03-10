/*
    requirements: 
        Fetch: for api call to openweather
        argv: for passing arguments from the terminal
        CFonts: cool large font
        Table: REALLY easy tool for creating tables in a terminal
*/
const fetch = require('node-fetch');
const argv = require('yargs').argv;
const CFonts = require('cfonts');
var Table = require('cli-table3');

//I should move the APIKey to a .ENV file. Leaving it here for simplicity
let apiKey = "*************";

//If no arguement is passed from the console it just defaults to sydney.
var city = argv.c || "sydney";

//if no arguement is passed it defaults to metric
let units = argv.u || "metric"

if(units === "metric"){u = "C"}else{u = "F"}

const urls = [
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&appid=${apiKey}`,
    `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`
  ];

Promise.all(urls.map(url => 
    fetch(url)
        .then(/*checkStatus*/
            function(response){
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                    return;
                }
                return response.json()
            }    
        )
        
        .catch(
            function(err) {
                console.log('Fetch Error :-S', err);
            })
))
    .then(data =>{
        
        //Display the city in yellow
        console.log("\nCurrent weather in: " + "\x1b[33m%s\x1b[0m", city);
        
        // -d will give you a slightly more detailed temp. (2 Decimal places)
        let temp = argv.d ? data[0].main.temp : Math.round(data[0].main.temp);

        CFonts.say(temp.toString() + ` ${u}` , {
            font: 'pallet',              // define the font face
            align: 'left',              // define text alignment
            colors: ['white', 'black'], // define all colors
            background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
            letterSpacing: 0,           // define letter spacing
            lineHeight: 1,              // define the line height
            space: false,                // define if the output text should have empty lines on top and on the bottom
            maxLength: '0',             // define how many character can be on one line
            gradient: false,            // define your two gradient colors
            independentGradient: false, // define if you want to recalculate the gradient for each new line
            transitionGradient: false,  // define if this is a transition between colors directly
            env: 'node'   
        });

        console.log("\nFuture forecast information:")
        var table = new Table({
            head: ['Day/Time', 'Temperature'],
            colWidths: [25, 50]
        });

        data[1].list.map((d)=>{
            let temp = argv.d ? d.main.temp : Math.round(d.main.temp);
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let dateSplit = d.dt_txt.split(" ");
            if((dateSplit[0] !== date) && (dateSplit[1] == "12:00:00"))
            table.push(
                [getDayOfTheWeek(d.dt_txt) + " @ " + dateSplit[1], temp + ` ${u}`]
            );
        });

        console.log(table.toString());

    })

function getDayOfTheWeek(date){
    /*
        Helper function to return the day of the week.
    */
    var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
    let d = new Date(date);
    return weekday[d.getDay()];
}




