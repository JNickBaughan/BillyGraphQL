let express = require("express");
let bodyParser = require("body-parser")
const { ApolloServer, gql} = require('apollo-server-express')
let PORT = 3000;
let server = express();
const middlewares = [
  express.static("dist"),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true })
];
	
server.use(...middlewares);

const typeDefs = gql`
  type Query {
    testQuery(input: String): String
  }
`;

const resolvers = {
  Query: {
    testQuery: (_, args) => args.input
  }
}



const graphQLServer = new ApolloServer({
  typeDefs,
  resolvers
})

graphQLServer.applyMiddleware({ app: server });

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
