const _ = require('lodash');
const { GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLList, GraphQLString } = require('graphql');

const { Session } = require('./types/session');
const { User } = require('./types/user');
const { Message } = require('./types/message');

const db = require('./database');

const types = [ Message ];

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: User,
      description: 'The application user',
      args: {
        userId: {
          type: GraphQLID
        }
      },
      resolve: (root, { userId }) => db.fetchUser(userId)
    },
    mockedUser: {
      type: User,
      description: 'The mocked user for demo purpose',
      resolve: () => db.fetchUser()
    }
  })
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: User,
      description: 'Creates a new user',
      args: {
        name: {
          type: GraphQLString,
          description: 'The optional users name'
        }
      },
      resolve: (root, args, context) => {
        const ip = root.ip(args, context.res.req); // Uses the client IP to generate user id
        const { name } = args;

        return db.createUser(ip, name);
      }
    },

    /*initSession: {
      type: Session,
      description: 'Initializes a new session',
      args: {
        userId: {
          type: GraphQLID
        }
      },
      resolve: (root, { userId }, context) => {
        return db.initSession(userId);
      }
    },*/

    addMessage: {
      type: Session,
      description: 'Adds a new message to the session',
      args: {
        userId: {
          type: GraphQLID
        },
        message: {
          type: GraphQLString
        }
      },
      resolve: (root, args) => {
        const { userId, message } = args;

        return db.addMessage(userId, {
          user: userId,
          content: message
        });
      }
    },

    editMessage: {
      type: Session,
      description: 'Alters an existing message content',
      args: {
        userId: {
          type: GraphQLID
        },
        messageId: {
          type: GraphQLID
        },
        content: {
          type: GraphQLString
        }
      },
      resolve: (root, args) => {
        const { userId, messageId, content } = args;

        return db.editMessage(userId, messageId, content);
      }
    },

    deleteMessage: {
      type: Session,
      description: 'Deletes a message from a chat session',
      args: {
        userId: {
          type: GraphQLID
        },
        messageId: {
          type: GraphQLID
        }
      },
      resolve: (root, args) => {
        const { userId, messageId } = args;

        return db.deleteMessage(userId, messageId);
      }
    }
  }
});

module.exports = new GraphQLSchema({ query, mutation, types });
