const express=require('express')
const {graphqlHTTP}=require('express-graphql')
const {GraphQLObjectType,GraphQLSchema,GraphQLID,GraphQLString,GraphQLBoolean,GraphQLNonNull,GraphQLList, GraphQLInt}=require('graphql')



const port=8080
const app=express()

const {PrismaClient}=require('@prisma/client')
const prisma=new PrismaClient()

const userType=new GraphQLObjectType({
    name:'user',
    description: 'this is user defintion',
    fields:()=>({
        id:{type:GraphQLNonNull(GraphQLInt)},
        name:{type:GraphQLNonNull(GraphQLString)},
        email:{type:GraphQLNonNull(GraphQLInt)},
        password:{type:GraphQLNonNull(GraphQLInt)},
    })
})

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

app.get('/api',async(req,res)=>{
    const users=await prisma.User.findMany()
    console.log(users)
    res.send(users)
})

app.post('/user',async(req,res)=>{
    const user=await prisma.User.create({
        data:{
            name:'abdo',
            email:'abdoaligF@gmail.com',
            password:'abdoalig',

        }
    })
    console.log(user)
    res.send({user})
})


app.listen(port,console.log(`server is listen to port ${port}`))