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