

const express = require('express')
const app = express()
const path = require('path')
const { stringify } = require('querystring')

app.use(express.json())

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))




// Home page => Choosing from the 3 options
app.get('/', (req, res) => {
    let id = 50;
    let coint_name = "grid-container50_sort";
    res.render('pathfinder', { cointainer_name: coint_name, max_row: id, max_col: id, header_name: 'sort_header' });
})
// Sorting  
app.get('/sort/:id', (req, res) => {
    let { id } = req.params;

    let coint_name = "grid-container" + String(id) + "_sort";
    res.render('pathfinder', { cointainer_name: coint_name, max_row: id, max_col: id, header_name: 'sort_header' });
})



// Pathfinding 
app.get('/path/:id', (req, res) => {
    let { id } = req.params
    let coint_name = "grid-container" + String(id)
    res.render('pathfinder', { cointainer_name: coint_name, max_row: id, max_col: id, header_name: 'path_header' })
})
// Snake game  
app.get('/snake/:id', (req, res) => {
    let { id } = req.params
    let coint_name = "grid-container" + String(id)
    res.render('pathfinder', { cointainer_name: coint_name, max_row: id, max_col: id, header_name: 'snake_header' })
})


app.listen(3000, (req, res) => {
    console.log('Server is running on port 3000!')
})







