const request=require('request')

const geocode=(placeInput, callback)=>{

    const mapUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(placeInput)+'.json?access_token=pk.eyJ1IjoiaGFycnlsaXVoYW8iLCJhIjoiY2twYTBucDNwMGxtYzJ2b2ZoZ2RxaTJqOSJ9.s9j22OFzmKPvJtca6Nhlig&limit=1'
    
    request({url: mapUrl, json: true}, (error, response)=>{


        if (error){
            callback('Cannot connect to the service', undefined)
        } else if (!response.body.features) {
            callback('No location found', undefined)
        } else {
            callback(undefined,{
                place: response.body.features[0].place_name,
                longitude:response.body.features[0].center[0],
                latitude: response.body.features[0].center[1]
            })
        }
    
    })

}

module.exports=geocode