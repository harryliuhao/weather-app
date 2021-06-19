const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000
const pubDir=path.join(__dirname,'../public')
const viewDir=path.join(__dirname, '../templates/views')
const partialDir=path.join(__dirname, '../templates/partials')

//configurations
app.set('view engine','hbs')
app.set('views', viewDir)
hbs.registerPartials(partialDir)

app.use(express.static(pubDir))

app.get('', (req, res)=>{
    res.render('index', {
        title: "Weather",
        location: "Virginia"
    })
})

app.get('/help',(req, res)=>{
    res.render('help', {
        title: "Help page",
        helpMsg: "reload your browser",
        location: "Maryland"
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.location){
        return res.send({
            error: "Please provide a location"
        }) 
    }
    geocode(req.query.location,(error,data={})=>{
        if (error) {
            res.send(error)
        }

        forecast(data.latitude,data.longitude,(error,weatherData={})=>{
            if(error) {
                res.send(error)
            }

            res.send({
                forecast: weatherData.condition+'. '+weatherData.temp+'F and chance of rain is '+weatherData.rainChance+'%',
                location: data.place,
                weatherIcon: weatherData.weatherIcon
            })
            
        })
    })

})

app.get('*',(req, res)=>{
    res.render('help', {
        title: "page not found",
        helpMsg: "The page your are looking for does not exist."
    })
})
app.listen(port, ()=>{
    console.log('server up at port '+ port)
})