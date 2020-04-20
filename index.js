$(document).ready(function () {
    $('#weatherLocation').click(function () {

        const appLink = {
            key: "1e50be9c3ec91c85e676018abdc6cc13",
            path: "https://api.openweathermap.org/data/2.5/"
          }

        //   
        var zipCode = $('input:text').val();
        let req = new XMLHttpRequest();
        let url = `${appLink.path}weather?q=${zipCode}&units=imperial&appid=${appLink.key}`;


        // Doesn't fetch
        function fetchResults (query) {
        fetch(`${appLink.path}weather?q=${zipCode}&units=imperial&appid=${appLink.key}`)
              .then(weather => {
                return weather.json();
              }).then(results);
          }

        // W3Schools intro to ajax works here
        req.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let res = JSON.parse(this.responseText);
                getClimate(res);
            }
        }

        req.open("GET", url, true);
        req.send();

        getClimate = function (res) {
            $('.humidity').text(`Humidity ${res.main.humidity}%`);
            $('.temp').text(`${parseInt(res.main.temp)} °F`);
            let now = new Date();
            $('.date').text(dateConstructor(now));
        }
    });
});


// Return current time in that zipCode (inclusive of timezone) using the Moment package
// new Moment().format("h:mm:ss a")
function dateConstructor(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`;     
}