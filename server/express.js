const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const Promise = require( "bluebird" );
const fs      = Promise.promisifyAll( require( "fs" ) );
const routes = require('./router');
const methodOverride = require('method-override');
const APIError = require('./APIError');
const cors = require('cors');
const app = express();


app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(cors());
app.use(methodOverride());

app.set( "view engine", "html" );
app.engine( ".html", ( filename, request, done ) => {
    fs.readFileAsync( filename, "utf-8" )
        .then( html => done( null, html ) )
        .catch( done );
} );
app.use('/public', express.static('public'));
app.use('/systemjs', express.static('systemjs'));
app.use('/build',  express.static('build'));
app.use('/lib',  express.static('lib'));
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new APIError('API not found', 404);
	return next(err);
});
// disable cache
app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

module.exports = app;
