"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyparser = require('body-parser');
var graphqlHTTP = require('express-graphql').graphqlHTTP;
var buildSchema = require('graphql').buildSchema;
var path = require("path");
// Construct a schema, using GraphQL schema language
var schema = buildSchema("\n  type Query {\n    hello: String\n    login(username: String!, password: String!): String\n  }\n");
// var AccountSchema = buildSchema(`
// type Query{
// login(username: String!, password: String!): String
// }
// `)
// The root provides a resolver function for each API endpoint
var root = {
    hello: function () {
        return 'Hello world!';
    },
    // login: (username: { username: string }, password: {password:string}) => {
    //     return `${username.username}, ${password.password}`
    // }
    login: function (data) {
        return data.username + " " + data.password;
    }
};
var app = express();
// app.use(bodyparser.json())
// app.use(bodyparser.urlencoded())
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.get("/test", function (req, res) {
    res.json({ data: "Hi" });
});
var getMainDirectory = function (dirs) {
    var currpath = __dirname.replace(/\\/g, "/");
    var strs = currpath.split("/");
    //Outside of repo directory, into keys directory.
    if (strs.includes("build")) {
        return path.join.apply(path, __spreadArray([__dirname, "..", ".."], dirs));
    }
    else {
        return path.join.apply(path, __spreadArray([__dirname, ".."], dirs));
    }
};
app.use(express.static(getMainDirectory(["react_fe", "graphql", "build"])));
app.use("*", express.static(getMainDirectory(["react_fe", "build"])));
app.listen(8000);
console.log('Running a GraphQL API server at http://localhost:8000/graphql');
