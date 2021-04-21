var express = require("express"),
  app = express(),
  server = require("http").createServer(app),
  helmet = require('helmet'),
  log = require('fancy-log');

app.use(helmet({contentSecurityPolicy: true}));

let clientIp;
let port = 1337;

//  res.header('Access-Control-Allow-Origin', '*');

function httpRedirect(req, res, next){
  clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  log(`CONNECT: ${clientIp} Connected to Server`);
  if (req.headers['x-forwarded-proto'] === 'http') {
    res.redirect('http://127.0.0.1:1337');
  }else{
    next();
  }
}
//set routes to public static files
app.use("/", httpRedirect, express.static(__dirname + "/client"));

server.listen(port);
log(`WEB: KLYE.NET v0.0.1 Online - Port: ${port}`);
