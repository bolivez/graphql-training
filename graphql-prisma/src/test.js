/*{
    -- .GRAPHQLCONFIG --
    "projects": {
        "prisma":{

            "schema": "http://192.168.99.100:4466",

            "extensions": {
                "codegen": {
                    "generates": 
                }
            }
        }
    }
}

schema: http://localhost:4466
extensions:
  codegen:
    generates:
      src/generated/prisma.graphql:
        plugins:
          - schema-ast
"http://192.168.99.100:4466"

*/




# SET_NULL (default) - CASCADE


type User {
  id: ID! @id
  name: String!
  email: String! @unique
  posts: [Post!]! @relation(name: "PostToUser", onDelete: CASCADE)
  comments: [Comment!]! @relation(name: "CommentToUser", onDelete: CASCADE)
}

type Post {
  id: ID! @id
  title: String!
  body: String!
  published: Boolean!
  author: User! @relation(name: "PostToUser", onDelete: SET_NULL)
  comments: [Comment!]! @relation(name: "CommentToPost", onDelete: CASCADE)
}

type Comment {
  id: ID! @id
  text: String!
  author: User! @relation(name: "CommentToUser", onDelete: SET_NULL)
  post: Post! @relation(name: "CommentToPost", onDelete: SET_NULL)
}








version: '3'
services:
  prisma:
    image: prismagraphql/prisma:1.34
    restart: always
    ports:
    - "4466:4466"
    environment:
      PRISMA_CONFIG: |
        port: 4466
        # uncomment the next line and provide the env var PRISMA_MANAGEMENT_API_SECRET=my-secret to activate cluster security
        # managementApiSecret: my-secret
        databases:
          default:
            connector: postgres
            host: ec2-54-75-229-28.eu-west-1.compute.amazonaws.com
            database: dbrh4lmigrqivv
            user: smkmrebhdigxva
            password: 34053acb05757475cc7dcf2841e7a0bb81642b0634fd6c83dba89c64462f443c
            ssl: true
            rawAccess: true
            port: '5432'
            migrations: true







            endpoint: http://192.168.99.100:4466
datamodel: datamodel.graphql