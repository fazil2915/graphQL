const expresss = require("express");
const app=expresss()
const{ graphqlHTTP}=require("express-graphql");
const {
    GrahQLSchema,
    GraphQLObject,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLSchema
}=require("graphql");

const schema=new GraphQLSchema({
    query:new GraphQLObjectType({
        name:'HelloWorld',
        fields:()=>({
            message:{
                type:GraphQLString,
                resolve:()=> 'Hello World'
            }
        })
    })
})


app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:true,
}),
);


app.listen(3000,()=>console.log("server running on 3000"))