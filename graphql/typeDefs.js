const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    phoneNumber: String!
    idNumber: String!
    email: String!
    line1: String!
    line2: String
    line3: String
    identifier: String!
    verificationType: String!
    isCriminalRecord: Boolean!
    selfieFileName: String
    idFileName: String
    createdAt: String
  }
  input RegisterInput {
    firstName: String!
    lastName: String!
    idNumber: String!
    phoneNumber: String!
    line1: String!
    line2: String
    line3: String
    email: String!
    identifier: String!
    verificationType: String!
    isCriminalRecord: Boolean!
  }

  input UpdateFileNamesInput {
    idNumber: String!
    selfieFileName: String!
    idFileName: String!
  }

  type VerificationResult {
    similarity: Boolean
    score: Float
  }

  type Query {
    getUser(faceWidth: Float!): User
  }
  type Mutation {
    createUser(registerInput: RegisterInput): User!
    addFace(selfieFileName: String!, idFileName: String!): String
    login(faceImage: String!): User
    updateFileNames(
      updateFileNamesInput: UpdateFileNamesInput
    ): VerificationResult
    face: String
  }
`;
