# Kanban

# Deploy Link :
## [Kanban](https://first-time-deploy-d2b3b.firebaseapp.com/#)

# Endpoint:
## [http://localhost:3000](http://localhost:3000)

# POST /register
## Endpoint
> /users/register

## Request body:
```
{
    email: string,
    name:string,
    password: string
}
```
All req.body is **required**

## Response
Status 201
```
{
    id: 1,
    email: "test@mail.com",
    name: "testname"
    password: "hashedPassword",
    createdAt: 2020-03-03T15:01:27.405Z,
    updatedAt: 2020-03-03T15:01:27.405Z
}
```
Status 400
```
{
   status: 400,
   msg: Please Fill All The Form
}
```
Status 500
```
{
   status: 500,
   msg: "err message"
}
```

# POST /login
## Endpoint
> /users/login

## Request body:
```
{
    email: string,
    password: string
}
```
All req.body is **required**

## Response
Status 200
```
{
   access_token: "YOUR_TOKEN"
}
```
Status 400
```
{
   status: 400,
   msg: error message
}
```
Status 500
```
{
   status: 500,
   msg: "Internal Server Error"
}
```

# GET /tasks - Get All Tasks
## Endpoint
> /tasks

## Authentication:
Token (required)

## Request header: 
```
access_token: YOUR_TOKEN
```
## Response:
Status 200
```
[
    {
        id: 1,
        title: "Try To Make Kanban Documentation",
        category: "Back-Log"
        description: "Kanban Using Vue.js",
        createdAt: 2020-03-03T15:01:27.405Z,
        updatedAt: 2020-03-03T15:01:27.405Z
    }
]
```
Status 401
```
{
   status: 401,
   msg: error message
}
```
Status 403
```
{
   status: 403,
   msg: error message
}
```
Status 500
```
{ 
   status: 500,
   msg: "Internal Server Error"
}
```

# POST /tasks - Add Task
## Endpoint
> /tasks

## Authentication:
Token (required)

## Request header: 
```
access_token: YOUR_TOKEN
```

## Request body:
```
{
    title: string,
    description: string,
    category: string
}
```
## Response
Status 201
```
{
    id: 1,
    title: "Learn how to fly",
    description: "Explore how to fly",
    category: "Back-Log"
    createdAt: 2020-03-03T15:01:27.405Z,
    updatedAt: 2020-03-03T15:01:27.405Z
}
```
Status 400
```
{
   status: 400,
   msg: error message
}
```
Status 401
```
{
   status: 401,
   msg: error message
}
```
Status 403
```
{
   status: 403,
   msg: error message
}
```
Status 500
```
{
   status: 500,
   msg: "Internal Server Error"
}
```

# GET /tasks/:id - Get One Task
## Endpoint
> /tasks/:id

## Authentication:
Token (required)

## Request header: 
```
access_token: YOUR_TOKEN
```
## Response:
Status 200
```
{
    id: 1,
    title: "Learn how to fly",
    description: "Explore how to fly",
    category: "Back-Log"
    createdAt: 2020-03-03T15:01:27.405Z,
    updatedAt: 2020-03-03T15:01:27.405Z
}
```
Status 401
```
{
   status: 401,
   msg: error message
}
```
Status 403
```
{
   status: 403,
   msg: error message
}
```
Status 404
```
{
   status: 404,
   msg: "Error Not Found"
}
```
Status 500
```
{
   status: 500,
   msg: "Internal Server Error"
}
```

# DELETE /tasks/:id - Delete Task
## Endpoint
>/tasks/:id
## Authentication:
Token (required)

## Request header: 
```
access_token: YOUR_TOKEN
```
## Response:
Status 200
```
{
    msg: '1'
}
```
Status 401
```
{
   status: 401,
   msg: error message
}
```
Status 403
```
{
   status: 403,
   msg: error message
}
```
Status 404
```
{
   status: 404,
   msg: "Error Not Found"
}
```
Status 500
```
{
   status: 500,
   msg: "Internal Server Error"
}
```

# PUT /tasks/edit/:id - Edit Task
## Endpoint
> /tasks/edit/:id

## Authentication:
Token (required)

## Request header: 
```
access_token: YOUR_TOKEN
```
## Request body:
```
{
    title": string,
    description": string,
    category": boolean
}
```
## Response:
Status 200
```
{
    id: 1,
    title: "Learn how to make kanban",
    description: "Explore how to make kanban using vue.js",
    category: "Back-Log"
}
```
Status 400
```
{
   status: 400,
   msg: error message
}
```
Status 401
```
{
   status: 401,
   msg: error message
}
```
Status 403
```
{
   status: 403,
   msg: error message
}
```
Status 404
```
{
   status: 404,
   msg: "Error Not Found"
}
```
Status 500
```
{
   status: 500,
   msg: "Internal Server Error"
}
```