import { GraphQLServer } from "graphql-yoga"

//String, Boolean, Int, Float, ID, 

//TYPE DEFINITONS--APP SCHEMA
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
    }
`

//RESOLVERS
const resolvers = {
    Query: {
        id() {
            return "abc123"
        },
        name() {
            return "Tuana"
        },
        age() {
            return 20
        },
        employed() {
            return false
        },
        gpa() {
            return null
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("server is running")
})