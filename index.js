'use strict'

const restify = require('restify');
const request = require('request');

const server = restify.createServer();
const PORT = process.env.PORT || 3000;

server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/hello/:name', function( req, res, next ){
	var text = "Hi, " + (req.params.name || "there!");
	var message = {
		'text': text 
	}
	res.send(message);
	return next();
});


// This is the endpoint which will be called
// When Facebook is trying to verify our bot
server.get("/webhook/", function( req,res,next ){
	var token = req.query.hub.verify_token;
	if( token === process.env.VALIDATION_TOKEN ){
		res.write( req.query.hub.challenge );
		res.end();
	}else{
		res.send("Error, wrong validation token");
	}
	return next();

});



// Start server
server.listen(PORT, function(){
	console.log(`Starting server on ${PORT}`);
});

