import getUserId from "../utils/getUserId"

const Query = {
    users(parent, args, { prisma }, info) {

        const opArgs = {} //operation arguments

        if(args.query) {
            opArgs.where = {
                OR: [{ // we can use here AND instead of OR
                        // if we use AND the query has to be both datas
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
            }
        }

        return prisma.query.users(opArgs, info)

    },
    posts(parent, args, { prisma }, info) {

        const opArgs = {
            where:{
                published: true
            }
        }

        if(args.query) {
            opArgs.where.OR = [{
                    title_contains: args.query
                }, {
                    body_contains: args.query
                }]
            }
        return prisma.query.posts(opArgs, info)
        

    },
    comments(parent, args, { prisma }, info) {
        return prisma.query.comments(null, info)
    },








    myPosts(parent, args, {prisma, request}, info) {
        const userId = getUserId(request)

        const opArgs = {
            where: {
                author: {
                    id: userId
                }
            }
        }

        if(args.query) {
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]
        }

        return prisma.query.posts(opArgs, info)
    },
    me(parent, args, {prisma, request}, info) {
        const userId = getUserId(request)
        
        return prisma.query.user({
            where:{
                id: userId
            }
        })
    },
    async post(parent, args, {prisma, request}, info) {
        const userId = getUserId(request, false)

        const posts = await prisma.query.posts({
            where:{
                id: args.id,
                OR: [{
                    published: true
                }, {
                    author: {
                        id: userId
                    }
                }]
            }
        }, info)

        if(posts.length === 0) {
            throw new Error("post not found")
        }
        return posts[0]
    }
}

export { Query as default }

