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
    fetchUserSessions: {
      type: new GraphQLList(Session),
      description: 'Fetches all chat sessions initiated by a user',
      args: {
        userId: {
          type: GraphQLID
        }
      },
      resolve: (root, { userId }) => db.fetchUserSessions(userId)
    },
    fetchSession: {
      type: Session,
      description: 'Fetches a chat session',
      args: {
        sessionId: {
          type: GraphQLID
        }
      },
      resolve: (root, { sessionId }) => db.fetchSession(sessionId)
    }
  })
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    initSession: {
      type: Session,
      description: 'Initializes a new session',
      args: {
        userId: {
          type: GraphQLID
        }
      },
      resolve: (root, args, context) => {
        const ip = root.ip(args, context.res.req);
        const { userId } = args;

        return db.initSession(ip, userId);
      }
    },

    addMessage: {
      type: Session,
      description: 'Adds a new message to the session',
      args: {
        sessionId: {
          type: GraphQLID
        },
        userId: {
          type: GraphQLID
        },
        message: {
          type: GraphQLString
        }
      },
      resolve: (root, args) => {
        const { sessionId, userId, message } = args;

        return db.addMessage(sessionId, {
          user: userId,
          content: message
        });
      }
    },

    editMessage: {
      type: Session,
      description: 'Alters an existing message content',
      args: {
        sessionId: {
          type: GraphQLID
        },
        messageId: {
          type: GraphQLString
        },
        content: {
          type: GraphQLString
        }
      },
      resolve: (root, args) => {
        const { sessionId, messageId, content } = args;

        return db.editMessage(sessionId, messageId, content);
      }
    },

    deleteMessage: {
      type: Session,
      description: 'Deletes a message from a chat session',
      args: {
        sessionId: {
          type: GraphQLID
        },
        messageId: {
          type: GraphQLString
        }
      },
      resolve: (root, args) => {
        const { sessionId, messageId } = args;

        return db.deleteMessage(sessionId, messageId);
      }
    }
  }
});

module.exports = new GraphQLSchema({ query, mutation, types });
