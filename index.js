const express=require('express')
const {graphqlHTTP}=require('express-graphql')
const {GraphQLObjectType,GraphQLSchema,GraphQLID,GraphQLString,GraphQLBoolean,GraphQLNonNull,GraphQLList, GraphQLInt,}=require('graphql')



const port=8080
const app=express()

const {PrismaClient}=require('@prisma/client')
const prisma=new PrismaClient()

const UserType=new GraphQLObjectType({
    name:'user',
    description: 'this is user defintion',
    fields:()=>({
        id:{type:new GraphQLNonNull(GraphQLInt)},
        name:{type:new GraphQLNonNull(GraphQLString)},
        email:{type:new GraphQLNonNull(GraphQLString)},
        password:{type:new GraphQLNonNull(GraphQLString)},
    })
})
const EventType=new GraphQLObjectType({
    name:'Event',
    description: 'this is event defintion',
    fields:()=>({
        id:{type:new GraphQLNonNull(GraphQLInt)},
        title:{type:new GraphQLNonNull(GraphQLString)},
        description:{type:new GraphQLNonNull(GraphQLString)},
        price:{type:new GraphQLNonNull(GraphQLInt)},
        date:{type:new GraphQLNonNull(GraphQLString)},
    })
})
const QueryRoot = new GraphQLObjectType({
  name: 'rootQuery',
  fields: () => ({
    hello: {
      type: GraphQLString,
      resolve: () => "Hello world!"
    },
    users:{
        type:new GraphQLList(UserType),
        resolve:()=>{
            return ['userOne ','userTwo','userThree']
        }
    },
    envets:{
        type:new GraphQLList(EventType),
        resolve:()=>{
            return ['eventOne','eventTwo','eventThree']
        }}
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