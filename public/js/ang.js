const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('#msg-1')
const msg2=document.querySelector('#msg-2')
const weatherImg=document.querySelector('#img-1')

msg1.textContent=''
msg2.textContent=''

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const locationInput=search.value

    fetch('/weather?location='+locationInput).then((response)=>{
    response.json().then((data)=>{

        if (data.error){
            msg1.textContent=data.error
        } else {
            msg1.textContent=data.location
            msg2.textContent=data.forecast
            weatherImg.src=data.weatherIcon
        }

    })
})

})