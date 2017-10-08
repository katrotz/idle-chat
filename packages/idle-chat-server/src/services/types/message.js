const {
  GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString, GraphQLFloat, GraphQLBoolean
} = require('graphql');

const Message = new GraphQLObjectType({
  name: 'Message',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The session id'
    },
    user: {
      type: GraphQLString,
      description: 'The user id the message belongs to'
    },
    content: {
      type: GraphQLString,
      description: 'The message content'
    },
    deleted: {
      type: GraphQLBoolean,
      description: 'The property that marks the message as soft deleted'
    },
    created: {
      type: GraphQLFloat,
      description: 'The timestamp when the message was added to the session'
    },
    updated: {
      type: GraphQLFloat,
      description: 'The timestamp when the message was last edited'
    },
    versions: {
      type: new GraphQLList(GraphQLString),
      description: 'The list of versions of the current message content'
    }
  })
});

module.exports = { Message };
