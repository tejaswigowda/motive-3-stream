// Change the following two to what your Optitrack multicast server says
var MULTICAST_INTERFACE = "239.255.42.99";
var SERVER_PORT = 1511;

// Packages
var dgram = require("dgram");
var optirx = require("optirx"); 

var api = dgram.createSocket("udp4");

api.on("listening", function () {
  var address = api.address();
  console.log(
    "UDP Client listening on " + address.address + ":" + address.port
  );
  api.setBroadcast(true); 
  api.setMulticastTTL(128); 
  api.addMembership(MULTICAST_INTERFACE); 
});

// What to do when a message is received
api.on("message", function listener(raw_data, remote) {
  var data = optirx.unpack(raw_data); // Unpacking the data, like in the README.
  // Do something interesting with the unpacked data
  console.log(data);
});

// We also had the following event listeners, FYI
api.on("error", function () {
  console.log("Connection error!".red);
});
api.on("end", function (data) {
  console.log("No more data!".red);
});
api.on("event", function (event) {
  console.log(event.name.yellow);
});
api.on("disconnect", function (event) {
  process.exit();
});

api.bind(SERVER_PORT);
