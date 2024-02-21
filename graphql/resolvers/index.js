const { GraphQLUpload } = require("graphql-upload");
const usersResolvers = require("./users");
const faceResolvers = require("./face");

module.exports = {
  Query: {
    ...usersResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...faceResolvers.Mutation,
  },
};
