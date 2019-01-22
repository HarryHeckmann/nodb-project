const axios = require('axios')

// let imageInfo = []

let ranDate = ''
let favorites = []

function randomDate(start, end) {
    var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    ranDate = [year, month, day].join('-');
}

const {nasaKey} = process.env

module.exports ={
    today: (req, res) => {
        axios
        .get("https://api.nasa.gov/planetary/apod?api_key=Mf6v9PhWPGW27ivjc4wgpoPnbzPP7faGIFAHlTPm")
        .then(response =>{
            res.status(200).json(response.data)
        })
    },

    read: (req, res) => {
        randomDate(new Date(1995, 06, 16), new Date())
        // console.log(ranDate)
        axios
            // .get('https://api.nasa.gov/planetary/apod?date=2013-07-02&api_key=Mf6v9PhWPGW27ivjc4wgpoPnbzPP7faGIFAHlTPm')
            .get('https://api.nasa.gov/planetary/apod?date='+ranDate+'&api_key=Mf6v9PhWPGW27ivjc4wgpoPnbzPP7faGIFAHlTPm')
            .then(response => {
                res.status(200).json(response.data)
               
            }).catch(err => console.log(err))
       
    },        
    favorite: (req, res) => {
            // console.log(req.body)
            const {imageOfTheDay} = req.body
            favorites.push({imageOfTheDay})
            res.status(200).json(favorites)
            
    },
    displayfavorites: (req, res) => {
        res.status(200).json(favorites)
        // console.log(favorites)
    },
    remove: (req, res) => {
        // console.log(req.params)
        favorites.splice(req.params.id, 1)
        res.status(200).json(favorites)
    },
    update: (req, res) => {
        // console.log(req.body)
        const {newValues} = req.body
        // console.log(favorites[req.params.id].imageOfTheDay.title)
        // console.log(newValues.title)
        favorites[req.params.id].imageOfTheDay.title = newValues.title
        favorites[req.params.id].imageOfTheDay.date = newValues.date
        favorites[req.params.id].imageOfTheDay.explanation = newValues.explanation
        res.status(200).json(favorites)


    }



}