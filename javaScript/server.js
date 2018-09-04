var express = require('express');
var server = express();



var App = {
    http: require('http'),
    url: require('url'),
    bodyParser: require('body-parser'),
    session: require('express-session')
}

server.set('view engine', 'ejs');

// Middlewares

server.use(App.bodyParser.urlencoded({
    extended: false
}));

server.use('/assets', express.static('../public'));

server.use(App.session({
    secret: 'ok',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));

server.use(require('./middlewares/listTab'));

// Roots

server.get('/', (request, response) => {
    
    response.render('../../views/index', {
        list: request.session.list
    })
});

// Post

server.post('/add',  (request, response) => {
    request.add(request.body.toDo);
})

server.get('/delete/:id', (request, response) => {
    if ( request.params.id !== '' && request.params.id !== undefined) {
        request.del(request.params.id);
    }
})

server.listen(8080);