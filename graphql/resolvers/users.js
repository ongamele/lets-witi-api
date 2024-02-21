const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server-express");
const { parse, join } = require("path");
const { createWriteStream } = require("fs");

const UserModel = require("../../models/User");

const msRest = require("@azure/ms-rest-js");
const Face = require("@azure/cognitiveservices-face");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");
const User = require("../../models/User");
const { SECRETE_KEY } = require("../../config");
const { GraphQLInt } = require("graphql");

module.exports = {
  Query: {
    async getUser(_, { faceFileName }) {},
  },

  Mutation: {
    async login(_, { faceFileName }) {},
    async createUser(
      _,
      {
        registerInput: {
          firstName,
          lastName,
          idNumber,
          phoneNumber,
          email,
          line1,
          line2,
          line3,
          identifier,
          verificationType,
          isCriminalRecord,
        },
      }
    ) {
      try {
        const newUser = new User({
          firstName,
          lastName,
          idNumber,
          phoneNumber,
          email,
          line1,
          line2,
          line3,
          identifier,
          verificationType,
          isCriminalRecord,
          selfieFileName: "",
          idFileName: "",
          createdAt: new Date().toISOString(),
        });
        console.log(newUser);
        await newUser.save();

        return newUser;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async updateFileNames(
      _,
      { updateFileNamesInput: { selfieFineName, idFileName } }
    ) {
      // const { firstName, lastName, idNumber, phoneNumber } = args;
      const user = await User.findOne({ idNumber });
      User.findOneAndUpdate(
        { idNumber: idNumber },
        { firstName: firstName, lastName: lastName, phoneNumber: phoneNumber },
        null,
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            //return user;
          }
        }
      );
      return user;
    },
  },
};
