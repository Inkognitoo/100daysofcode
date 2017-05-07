"use strict";

let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let port = process.env.PORT || 8081;

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/1', function (req, res) {
    res.redirect(301, 'http://codepen.io/inkognitoo/pen/LyVbpz');
});
app.get('/2', function (req, res) {
    res.redirect(301, 'http://codepen.io/inkognitoo/pen/zwGVMm');
});
app.get('/3', function (req, res) {
    res.redirect(301, 'http://codepen.io/inkognitoo/pen/MmaPEY');
});
app.get('/4', function (req, res) {
    res.redirect(301, 'http://codepen.io/inkognitoo/pen/dWMpqy');
});
app.get('/5', function (req, res) {
    res.redirect(301, 'http://codepen.io/inkognitoo/pen/bWebxK');
});
app.get('/6', function (req, res) {
    res.redirect(301, 'http://codepen.io/inkognitoo/pen/Wjxdev');
});
app.get('/7', function (req, res) {
    res.redirect(301, 'http://codepen.io/inkognitoo/pen/RVRvmg');
});
app.get('/8', function (req, res) {
    res.redirect(301, 'http://codepen.io/inkognitoo/pen/aWZMym');
});
app.get('/9', function (req, res) {
    res.redirect(301, 'http://codepen.io/inkognitoo/pen/GmjNqo');
});
app.get('/10', function (req, res) {
    res.redirect(301, 'http://codepen.io/inkognitoo/pen/wdzbpJ');
});
app.get('/11', function (req, res) {
    res.redirect(301, 'http://codepen.io/inkognitoo/pen/RVoOxY');
});
app.get('/12', function (req, res) {
    res.redirect(301, 'http://codepen.io/inkognitoo/pen/aWJZQo');
});
app.get('/13', function (req, res) {
    res.redirect(301, 'http://codepen.io/inkognitoo/pen/BRRayj');
});
app.get('/14', function (req, res) {
    res.redirect(301, 'http://codepen.io/inkognitoo/pen/rmmjoQ');
});
app.get('/15', function (req, res) {
    res.redirect(301, 'http://codepen.io/inkognitoo/pen/JNNWRd');
});
app.get('/16', function (req, res) {
    res.redirect(301, 'http://codepen.io/inkognitoo/pen/RVgRNd');
});


app.get('/17', function (req, res) {
    res.send('#100днейкода');
});

app.get('/18', function (req, res) {
    res.render('pages/18/index');
});

app.get('/19', function (req, res) {
    res.render('pages/19/index');
});

app.get('/20', function (req, res) {
    res.render('pages/20/index');
});
app.get('/20/controllers', function (req, res) {
    res.render('pages/20/controllers');
});

app.get('/21', function (req, res) {
    res.render('pages/21/index');
});
app.get('/21/controllers', function (req, res) {
    res.render('pages/21/controllers');
});

app.get('/*', function (req, res) {
    res.render('pages/index');
});


var array_sprites = {};
io.on('connection', function (socket) {
    socket.on('19_send', function (data) {
        socket.emit('19_listen', data);
        socket.broadcast.emit('19_listen', data);
    });

    socket.on('20_command_send', function (data) {
        socket.broadcast.emit('20_command_listen', data);
    });

    socket.emit('21_command_listen', array_sprites);
    socket.broadcast.emit('21_command_listen', array_sprites);
    socket.on('21_command_send', function (data) {
        if (socket.id in array_sprites) {
            switch (data.command) {
                case 'up':
                    array_sprites[socket.id].y -= 10;
                    break;
                case 'down':
                    array_sprites[socket.id].y += 10;
                    break;
                case 'right':
                    array_sprites[socket.id].x += 10;
                    break;
                case 'left':
                    array_sprites[socket.id].x -= 10;
                    break;
            }
        } else {
            array_sprites[socket.id] = {
                x: 40,
                y: 40
            };
        }

        socket.broadcast.emit('21_command_listen', array_sprites);
    });

    socket.on('disconnect', function(){
        delete array_sprites[socket.id];
        socket.broadcast.emit('21_command_listen', array_sprites);
    });
});

server.listen(port, function () {
    console.log(`App listening on port ${port}`);
});