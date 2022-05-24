const express=require('express')
const {graphqlHTTP}=require('express-graphql')
const {GraphQLObjectType,GraphQLSchema,GraphQLID,GraphQLString}=require('graphql')


const port=8080
const app=express()

const QueryRoot = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hello: {
      type: GraphQLString,
      resolve: () => "Hello world!"
    }
  })
})
    
const schema = new GraphQLSchema({ query: QueryRoot })

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))



app.listen(port,console.log(`server is listen to port ${port}`))