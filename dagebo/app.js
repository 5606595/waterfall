var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')



app.get('/', (req, res) => {
    console.log(req.query.xss)
    res.render('index', {
        xss: req.query.xss
    })
})


app.post('/sec', (req, res) => {
    res.render('sec', {
        xss: req.body.xss
    })
})


app.listen(3000, () => {
    console.log('server listening on 3000');
})

