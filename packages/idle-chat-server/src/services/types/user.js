const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = require('graphql');

const User = new GraphQLObjectType({
  name: 'Session',
  description: 'Describes a chat session',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The user id'
    },
    avatar: {
      type: GraphQLString,
      description: 'The user avatar resource'
    },
    name: {
      type: GraphQLString,
      description: 'The user name'
    }
  })
});

module.exports = { User };
