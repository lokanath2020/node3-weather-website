const path = require('path');
const express = require('express');
const hbs = require('hbs');
const {geocode, forecast} = require("./utils/geocode");

const app = express()

//Define paths to express config
const publicDirectorypath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDirectorypath));


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Lokanath sahoo"
    });
})

app.get('/about', (req, res) => {
     res.render('about', {
         name: "Lokanath sahoo",
         title: "Information of the About page"
     })
})
app.get('/help', (req, res) => {
    res.render('help', {
        name: "Lokanath sahoo",
        title: "Information about the help page"
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
       return res.send({
           error: "You must providee an address"
       })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error});
        }

    forecast(location, (error, forecasrData) => {
          if(error){
              return res.send({ error })
          }

          return res.send({
              forecast: forecasrData,
              location,
              address: req.query.address
          })
        })
    })
})

app.get('/products', (req, res) => {
   if(!req.query.search){
       return res.send(
           {
               error: "you must provide a search term"
           }
       )
   }
   console.log(req.query);
   res.send({
       products: []
   })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: "404",
        name: "Lokanath sahoo",
        errorMessage: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Lokanath Sahoo",
        errorMessage: "Page not found"
    })
})

app.listen(3000, () => {
    console.log("server is up at port 3000.");
});