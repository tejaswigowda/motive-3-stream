const fs = require('fs');

const express = require("express");
const app = express();
const server = require("http").Server(app);
const url = require("url");



const WebSocket = require("ws");

const port = 3000;//parseInt(process.argv.slice(2));

const wss1 = new WebSocket.Server({ noServer: true });
const wss2 = new WebSocket.Server({ noServer: true });


//for motive 3
wss1.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    var x = message.trim().split("\t").join(" ");
    //console.log(x);
    wss2.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
       // client.send(" \n"+x);
      }
    });
  });
});

//webbrowser websocket
wss2.on("connection", function connection(ws) {
    var allContents = fs.readFileSync('public/bvhheader.txt', 'utf-8');
        ws.send(allContents);

    allContents = fs.readFileSync('public/bvhframes.txt', 'utf-8');
    //console.log(allContents);
    allContents.split(/\r?\n/).forEach((line) => {
       ws.send(" \n" + line.trim().split("\t").join(" "))
    });

  ws.on("message", function incoming(message) {
    // nothing here should be received
    //console.log("received wss2: %s", message);
  });
});

server.on("upgrade", function upgrade(request, socket, head) {
  const pathname = url.parse(request.url).pathname;

  if (pathname === "/bvh_server") {
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit("connection", ws, request);
    });
  } else if (pathname === "/bvh_client") {
    wss2.handleUpgrade(request, socket, head, function done(ws) {
      wss2.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

app.get("/", function (req, res) {
  res.redirect("index.html");
});

app.get("/numberofclients", function (req, res) {
  var numberofclient = wss2.clients.size;
  res.writeHead(200, { "Content-Type": "text/plain" }); // send response header
  res.end(numberofclient.toString()); // send response body
});

app.use(express.static(__dirname + "/public"));

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
