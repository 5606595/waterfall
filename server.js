var request = require('request');
var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/index.html')
});

app.get('/request', (req, res) => {
    var options = {
        url: 'http://www.17sucai.com/?p=' + req.query.page,
    }
    request(options, (err, response, body) => {
        if(err) {
            throw err;
        }
        body = body.match(/<a target="_blank"(.*)\s*<img.*\s*<\/a>/gi);
        for(var i = 0, j = body.length; i < j; i++) {
            var dataUrl = body[i].match(/data-url="(.*?)"/i);
                if(dataUrl) {                           //将img中data-url内容替换到src中
                    var temp = dataUrl[0].slice(9);
                    body[i] = body[i].slice(0, dataUrl.index) + body[i].slice(dataUrl.index + dataUrl[0].length + 1); //删除data-url属性
                    body[i] = body[i].replace(/src="(.*?)"/, 'src=' + temp);
                }
        }
        res.send(body);
    })
})

app.listen(3000);