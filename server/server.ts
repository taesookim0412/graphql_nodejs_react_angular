import express = require('express');
const bodyparser = require('body-parser');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
import path = require('path')
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    login(username: String!, password: String!): String
  }
`);
// var AccountSchema = buildSchema(`
// type Query{
// login(username: String!, password: String!): String
// }
// `)

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return 'Hello world!';
    },
    // login: (username: { username: string }, password: {password:string}) => {
    //     return `${username.username}, ${password.password}`
    // }
    login: (data:{username: string, password:string}) => {
        return `${data.username} ${data.password}`
    }
};

const app = express();
// app.use(bodyparser.json())
// app.use(bodyparser.urlencoded())
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.get("/test", (req, res) => {
    res.json({data: "Hi"})
})

let getMainDirectory = (dirs: string[]) => {
    const currpath = __dirname.replace(/\\/g, "/")
    const strs = currpath.split("/")
    //Outside of repo directory, into keys directory.
    if (strs.includes("build")) {
        return path.join(__dirname, "..", "..", ...dirs)
    } else {
        return path.join(__dirname, "..", ...dirs)
    }
}
app.use(express.static(getMainDirectory(["react_fe", "graphql", "build"])))
app.use("*", express.static(getMainDirectory(["react_fe", "build"])))


app.listen(8000);
console.log('Running a GraphQL API server at http://localhost:8000/graphql');
