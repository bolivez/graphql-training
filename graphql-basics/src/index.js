import { GraphQLServer } from "graphql-yoga"
import { v4 as uuidv4 } from 'uuid';

// DEMO USER DATA
const users = [
    {
        id:"user_id_1",
        name:"Berk",
        email:"raynaud@example.com",
        age:20
    },
    {
        id:"user_id_2",
        name:"tua",
        email:"tuana@gmail.com",
    },
    {
        id:"user_id_3",
        name:"name3",
        email:"email3@example.com"
    }    
]

const posts = [
    {
        id:"post_id_1",
        title:"Berk",
        body:"raynaud@example.com",
        published: true,
        author: "user_id_1"
    },
    {
        id:"post_id_2",
        title:"tua",
        body:"tuana@gmail.com",
        published: true,
        author: "user_id_2"

    },
    {
        id:"post_id_3",
        title:"name3",
        body:"email3@example.com",
        published: false,
        author: "user_id_3"

    }    
]

const comments = [
    {
        id:"comment_id_1",
        text:"das ist ein comment",
        author: "user_id_1",
        post: "post_id_1"
    },
    {
        id:"comment_id_2",
        text:"das ist zwei comment",
        author: "user_id_2",
        post: "post_id_2"

    },
    {
        id:"comment_id_3",
        text:"das ist drei comment",
        author: "user_id_3",
        post: "post_id_3"
    },
    {
        id:"comment_id_4",
        text:"das ist vier comment",
        author: "user_id_1",
        post: "post_id_3"

    }      
]


//TYPE DEFINITONS--APP SCHEMA
const typeDefs = `
    type Query {
        comments: [Comment!]!
        users(query: String) : [User!]!
        posts(query: String) : [Post!]!
        me: User!
        post: Post!

    }

    type Mutation {
        createUser(name: String!, email: String!, age: Int): User!
        createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
        createComment(text: String!, post: ID!, author: ID!): Comment!
    }


    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!

    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: Comment!

    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!

    }
`

//RESOLVERS
const resolvers = {
    Query: {
        comments(parent, args, ctx, info){
                return comments
        },

        posts(parent, args, ctx, info){
            if(!args.query){
                return posts
            }
            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })

        },

        users(parent, args, ctx, info) {
            if(!args.query) {
                return users
            }
            return users.filter((user)=> {
                return user.name.toLowerCase().includes(args.query.toLowerCase)
            })
        },

        me() {
            return {
                id: "123",
                name: "mike",
                email: "tyson@com"
            }
        },

        post() {
            return{
                id: "135",
                title: "das ist title",
                body: "B000TY",
                published: true
            }
        }
    },

        Mutation:{
            createUser(parent, args, ctx, info) {

                const emailTaken = users.some((user) => user.email === args.email)  

                if(emailTaken){
                    throw new Error("Email taken")
                }
                const user = {
                    id: uuidv4(),
                    name: args.name,
                    email: args.email,
                    age: args.age
                }

                users.push(user)
                return user
            },
            createPost(parent, args, ctx, info){

                const userExists = users.some((user) => user.id === args.author )
    
                if(!userExists){
                    throw new Error("user does not exists")
                }
                const post = {
                    id: uuidv4(),
                    title: args.title,
                    body: args.body,
                    published: args.published,
                    author: args.author
                }
                
                posts.push(post)
                return post
            },
            createComment(parent, args, ctx, info){

                const postExists = posts.some((post) => post.id === args.post && post.published)
                const userExists = posts.some((user) => user.id === args.author)

                if(!postExists || !userExists){
                    throw new Error("post / user does not exists or post aint published")
                }
                const comment = {
                    id: uuidv4(),
                    text: args.text,
                    author: args.author,
                    post: args.post
                }
                comments.push(comment)
                return comment
            }
        },

        Post: {
            author(parent, args, ctx, info) {
                return users.find((user) => {
                    return user.id === parent.author
                })
            },
            comments(parent, args, ctx, info){
                return comments.find((comment) => {
                    return comment.post === parent.id
                })
            }
        },
        Comment: {
            author(parent, args, ctx, info) {
                return users.find((user) => {
                    return user.id === parent.author
                })
            },
            post(parent, args, ctx, info){
                return posts.find((post) => {
                    return post.id === parent.post
                })
            }
        },


        User: {
            posts(parent, args, ctx, info) {
                return posts.filter((post) => {
                    return post.author === parent.id
                })
            },
            comments(parent, args, ctx, info) {
                return comments.filter((comment) => {
                    return comment.author === parent.id
                })
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