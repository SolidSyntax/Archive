import {GraphQLObjectType, GraphQLString} from "graphql";
const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const mutation = new GraphQLObjectType({
  name: 'UserType',
  fields:{
    email:{
      type: GraphQLString
    }
  }
});

module.exports = mutation;
