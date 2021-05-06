const request = require('request');

const geocode = (address, callback) => {
    const url =  `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibG9rYW5hdGgxMjMiLCJhIjoiY2tueGQ0ZGFiMGt5YzJvbnYzd2pjZ3l3MCJ9.TylLQ5IBCwYGyuK9rOgNPg&limit=1`;

    request({ url, json: true}, (error, response) => {
        if(error){
            callback("Unable to connect to location services!", undefined)
        }else if(response.body.features.length === 0 ){
            callback('Unable to find location please try another search', undefined)
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

const forecast = (location, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=fc0aca2b3890b29d1b9310e744d81b4a&query=${location}&units=m`;
    request({url, json: true}, (error, response) => {
    if(error){
        callback('Unable to connect to the weather service!', undefined);
    }else if(response.body.error){
        callback('Unable to find location', undefined)
    }else{
        callback(undefined,{
            latitude: response?.body?.location?.lat || 'defaultone',
            longitude: response?.body?.location?.lon || 'defualtone',
            temperature: response?.body?.current?.temperature || 'defaultone',
            location:  response?.body?.location?.name || 'defaultone',
            weatherDescription: response?.body?.weather_descriptions && response?.body?.weather_descriptions[0] || 'defaultone'
        })
    }
    })
}

module.exports = {
    geocode,
    forecast
}