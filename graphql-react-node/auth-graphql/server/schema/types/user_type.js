import {GraphQLObjectType, GraphQLString} from "graphql";
const graphql = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields:{
        email:{
            type: GraphQLString
        }
    }
});

module.exports = UserType;
