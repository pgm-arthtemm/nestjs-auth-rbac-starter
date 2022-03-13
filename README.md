# NestJS Authentication and Role Based Access Control with GraphQL example

[![License](https://img.shields.io/github/license/saluki/nestjs-template.svg)](https://github.com/pgm-arthtemm/nestjs-auth-rbac-starter/blob/main/LICENSE)

Quick starter template for a [NestJS](https://nestjs.com/) **GraphQL** API with **user authentication** and **role based access control**.  
This template uses:

- GraphQL
- TypeORM
- Postgres
- Apollo Server
- Passport-JWT

## Setup

Start by cloning the repository into your local workstation:

```sh
git clone https://github.com/pgm-arthtemm/nestjs-auth-rbac-starter.git my-project
```

This project is made with pnpm. If you use yarn of npm, remove the pnpm-lock.yaml file and run `yarn add` or `npm install`

```sh
cd ./my-project
pnpm install
```

Create two `.env` files in the root of the project:

- `.env.development`
- `.env.production`

In the `.env.development` file, put the environment variables used in **development**.  
The `.env.production` file will contain all the environment variables for **production**.

To make connection with the database, fill in the right environment variables in the app.module.ts.

## Usage

When the database is connected, you can start up the server by running `pnpm start:dev`.
A GraphQL schema will be generated. This will contain a Users table and all the dto's for user authentication.

To register a user:

- Go to the [GraphQL Playground](http://localhost:4000/graphql)
- Run the signup mutation using `email`, `password` and `username` variables

Running this mutation will create a new entry in the Users table **if the email is not already registered**.  
The default Role will be set as USER. you can change this by creating a new role in the `roles.enum.ts` and chaning the default role in the `user.entity.ts` file.

To login a user:

- Go to the [GraphQL Playground](http://localhost:4000/graphql)
- Run the login mutation using `email` and `password` variables

Running this mutation will check the credentials of the user, if the credentials are correct, the mutation will return a JWT.
This token contains the user information, including the user role.

## Jwt Guards

To protect an API route, you can use a **JwtGuard**. This guard checks if the user has a valid JWT. You can apply this guard to the **UseGuard decorator** to queries and mutations inside a resolver.
In this example the findAll users query inside the `users.resolver.ts` file is protected using this guard.

```js
  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
```

To send an authenticated request in the GraphQL playground, you can use the JWT that was returned after loggin in.
Add this to the HTTP Headers.  
**Remove the "<>"**.

```json
{
  "Authorization": "Bearer <your token>"
}
```

## Role Guards

The protect an API route from a specific user Role, you can use a **Roles** guard. This guard checks if the user has the correct roles to access the specified route.
In this example the findAll users query inside the `users.resolver.ts` file is protected using this guard.  
Only a user with the ADMIN role can access this endpoint.

```js
  @Query(() => [User], { name: 'users' })
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
```
