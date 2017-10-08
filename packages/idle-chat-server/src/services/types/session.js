const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = require('graphql');

const { Message } = require('./message');

const Session = new GraphQLObjectType({
  name: 'Session',
  description: 'Describes a chat session',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The session id'
    },
    user: {
      type: GraphQLString,
      description: 'The user id'
    },
    messages: {
      type: new GraphQLList(Message),
      description: 'The list of messages in the chat'
    }
  })
});

module.exports = { Session };
