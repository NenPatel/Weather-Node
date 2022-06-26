const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
const port = process.env.PORT || 8000
app.use(bodyParser.urlencoded({extended:true}));
// app.get("/", function(req,res){
//     res.send("Hello Nen Home page")
// })

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req,res) {
    const query = req.body.city;
    const apiKey = "b7b6da4127155891c07d624a22a8c476";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&units=" + unit + "&appid=" + apiKey;
    https.get(url,function(response)
    {
        response.on("data",function(data)
        {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The Weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The Temperature in " + query + " is " + temp + " degree Celsius </h1>")
            res.write("<img src=" + imageURL +">");
            res.send();
        })
    })
})

// app.post("/", function(req,res) {
//     var num1 = Number(req.body.num1);
//     var num2 = Number(req.body.num2);
//     var result = num1 + num2;
//     res.send("The Result of Calculation is : " + result);
// })

// app.get("/contact", function(req,res){
//     res.send("Hello cONTACT")
// })

// app.get("/ABOUT", function(req,res){
//     res.send("Hello aBOUT")
// })

app.listen(port,function(){
    console.log("Hello GGuys");
})