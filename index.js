const express=require('express')
const {graphqlHTTP}=require('express-graphql')


const port=8080
const app=express()

app.use('/graphql',graphqlHTTP({
    schema:null,
    graphiql:true
}))



app.listen(port,console.log(`server is listen to port ${port}`))