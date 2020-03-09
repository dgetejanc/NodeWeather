const fetch = require('node-fetch');
const argv = require('yargs').argv;
const CFonts = require('cfonts');


let apiKey = "c802bd9fc9062422623ed4942b6d0214";
let city = argv.c || "sydney";
let units = argv.u || "metric"
let forecast = argv.f;
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&appid=${apiKey}`
let url2 = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`

const urls = [
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&appid=${apiKey}`,
    `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`
  ];


// fetch(url)
//     .then(
//         function(response) {
//         if (response.status !== 200) {
//             console.log('Looks like there was a problem. Status Code: ' +
//             response.status);
//             return;
//         }
//         response.json().then(function(data) {
//             //console.log(data);
//             weather(data);
//         });
//     }
//     )
//     .catch(function(err) {
//         console.log('Fetch Error :-S', err);
//     });


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
        //console.log(data[0]);
        //console.log(data[1]);
        CFonts.say(data[0].main.temp.toString()+" C", {
            font: 'block',              // define the font face
            align: 'left',              // define text alignment
            colors: ['system'],         // define all colors
            background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
            letterSpacing: 1,           // define letter spacing
            lineHeight: 1,              // define the line height
            space: true,                // define if the output text should have empty lines on top and on the bottom
            maxLength: '0',             // define how many character can be on one line
            gradient: false,            // define your two gradient colors
            independentGradient: false, // define if you want to recalculate the gradient for each new line
            transitionGradient: false,  // define if this is a transition between colors directly
            env: 'node'   
        });
    })



function weather(data) {

    console.log(data.main.temp + "F");
}

function getDayOfTheWeek(date){
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




