const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const { Session } = require('./session');

const User = new GraphQLObjectType({
  name: 'User',
  description: 'Describes an application user',
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
    },
    session: {
      type: Session,
      description: 'The users chat session'
    }
  })
});

module.exports = { User };
