const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const db = require('./db');


const app = express();

const fs = require('fs')
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})
const resolvers = require('./resolvers')

const {makeExecutableSchema} = require('graphql-tools')
const schema = makeExecutableSchema({typeDefs, resolvers})

app.use(cors(), bodyParser.json());

const  {graphiqlExpress,graphqlExpress,ApolloServer} = require('apollo-server-express')
app.use('/graphql',graphqlExpress({schema}))
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))


app.listen(3000,(err)=>{
   
    if(err){
        console.log(err);
    }else{
        console.log("server running on 3000")
    }
})