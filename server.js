const express = require("express");
const port = process.env.PORT || 8080;
const app = express();

//make a server in static i mean i don't now how i explain that
app.use(express.static(__dirname + "/dist/"));

//a fucking import step in SPA when you reload the page
app.get(/.*/, (req, res) => {
  res.sendfile(__dirname + "/dist/index.html");
});

//listen for the port
app.listen(port);
console.log(`Server start & connection on port ${port}`);