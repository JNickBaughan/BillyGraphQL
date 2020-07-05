let express = require("express");
let bodyParser = require("body-parser")
let PORT = 3000;
let server = express();
const middlewares = [
  express.static("dist"),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true })
];
	
server.use(...middlewares);

server.get("/", (req, res) => res.send(`<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <div id="root">test!</div>
    <script src="bundle.js"></script>
  </body>
</html>
`))

server.listen(PORT, function(){
	console.log("server listening on port: " + PORT);
});
