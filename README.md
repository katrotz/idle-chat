# IDLE CHAT
    A relay based implementation of a "chat application"

The repository contains two packages (client and server implementations)
The client is written using React + Relay + GraphQL JS.

The backend is an express application that serves a graphQL endpoint.

### Install
The application is managed using [lerna](https://lernajs.io/).

To install the dependencies of the entire repository

```lerna bootstrap```

### Run
Run the following command in the root of the package to start the application (both client and server)

```lerna run start```

It will run the server that can be accessed via [localhost:8080](http://localhost:8080) and the client at [localhost:3000](http://localhost:3000)
The server exposes two main endpoints:


1. `/graphql` that serves the graphql server
2. `/graphql/schema` that generates the schema json

### Notes
Currently the server graphQL schema must be manually generated and copied into the client relay configuration in case the schema changes.