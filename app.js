const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req,res){
  const city = req.body.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=527815b451ccc036ab8bd08fefd78dee&units=metric`
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on('data', function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      res.write(`<h1>The weather is currently ${description}</h1>`);
      res.write('<hr>');
      res.write(`<h1>the temprature in ${city} is ${temp} degree celcius</h1>`);
      res.write(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`)
      res.send();

    })
  })
});

app.listen(3000,function(){
  console.log('App is working on port 3000');
});
