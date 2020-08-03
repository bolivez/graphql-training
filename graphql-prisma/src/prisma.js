// conect node js to prisma graphql
import { Prisma } from "prisma-binding"

const prisma = new Prisma({
    //this is where we configure nodejs to connect
    //to the correct prisma endpoint

    typeDefs: "src/generated/prisma.graphql",
    endpoint: "http://192.168.99.100:4466" //actual url where prisma lives
})


export { prisma as default }


/*


const createPostForUser = async (authorId, data ) => {

    const userExists = await prisma.exists.User({ id: authorId })

    if(!userExists){
        throw new Error("there is no user")
    }

    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        },
        
    }, " { author { id name email posts { id title body published } } } ")

    return post.author
}
createPostForUser("ckdcf1dz600290718t8ax0gj7", {
    title: "das title",
    body: "das body",
    published: true
}).then((user) => {
    console.log(JSON.stringify(user, undefined, 2))
}).catch((error) => {
    console.log(error.message)
})





const updatePostForUser = async (postId, data) => {

    const postExists = await prisma.exists.Post({ id: postId })

    if(!postExists){
        throw new Error("post does not exists")
    }
    
    const post = await prisma.mutation.updatePost({
        where: {
            id: postId
        },
        data
    }, "{ author { id name email posts { id title body published} } }")


    return post.author
}/*
updatePostForUser("ckddhdt5p003m0718mfl4zjwv", {
    title: "5better das title",
    body: "5newer das body",
    published: false
}).then((post) => {
    console.log(JSON.stringify(post, undefined, 2))
}).catch((error) => {
    console.log(error.message)
})





*/






