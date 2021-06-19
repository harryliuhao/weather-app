const request=require('request')

const forecast=(latitude, longitude,callback)=>{
    const weatherUrl='http://api.weatherstack.com/current?access_key=e3a4c5a4a3e28673e4aaf0706bf1aa69&query='+latitude+','+longitude+'&units=f'

    request({url: weatherUrl, json: true}, (error, response)=>{
        if (error){
            callback('Cannot connect to the service', undefined)
        } else if (!response.body.current) {
            callback('No weather info found', undefined)
        } else {

            callback(undefined,{

                temp:response.body.current.temperature, 
                rainChance:response.body.current.precip*100,
                condition:response.body.current.weather_descriptions[0],
                weatherIcon: response.body.current.weather_icons[0]
            })
        }

        
    })
}

module.exports=forecast