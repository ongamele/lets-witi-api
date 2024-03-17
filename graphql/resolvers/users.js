const AWS = require("aws-sdk");
const User = require("../../models/User");
const { SECRETE_KEY } = require("../../config");
const { ACCESS_KEY } = require("../../config");

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
      { updateFileNamesInput: { idNumber, selfieFileName, idFileName } }
    ) {
      AWS.config.update({
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRETE_KEY,
        region: "eu-west-2",
      });

      // Create an instance of the Rekognition service
      const rekognition = new AWS.Rekognition();

      // Function to compare faces in two images
      async function compareFaces(image1Buffer, image2Buffer) {
        const params = {
          SourceImage: {
            Bytes: image1Buffer,
          },
          TargetImage: {
            Bytes: image2Buffer,
          },
          SimilarityThreshold: 40, // Adjust similarity threshold as needed
        };

        try {
          const response = await rekognition.compareFaces(params).promise();
          return response;
        } catch (error) {
          console.error("Error comparing faces:", error);
          throw error;
        }
      }

      try {
        // Dynamic import for fetch
        const fetch = await import("node-fetch");

        // Supabase image URLs
        const imageUrl1 = `https://vlxkgewzbkitgpipqpst.supabase.co/storage/v1/object/public/witi-bucket/selfies/${selfieFileName}`;
        const imageUrl2 = `https://vlxkgewzbkitgpipqpst.supabase.co/storage/v1/object/public/witi-bucket/ids/${idFileName}`;

        console.log("Image1 >>>>>>>>>>>>>>>> ", imageUrl1);
        console.log("Image2 >>>>>>>>>>>>>>>> ", imageUrl2);

        // Function to fetch image from Supabase URL and convert it into a buffer
        async function fetchImage(url) {
          try {
            const response = await fetch.default(url);
            const buffer = await response.buffer();
            return buffer;
          } catch (error) {
            console.error("Error fetching image:", error);
            throw error;
          }
        }

        // Fetch images and convert to buffers
        const imageBuffer1 = await fetchImage(imageUrl1);
        const imageBuffer2 = await fetchImage(imageUrl2);

        // Compare faces
        const comparisonResult = await compareFaces(imageBuffer1, imageBuffer2);

        let result = {};

        // Check if there are FaceMatches and if Similarity is present and true
        if (
          comparisonResult.FaceMatches.length > 0 &&
          comparisonResult.FaceMatches[0].Similarity
        ) {
          result.similarity = true;
          result.score = comparisonResult.FaceMatches[0].Similarity;
        } else {
          result.similarity = false;
          result.score = null;
        }
        console.log("Face comparison result:", comparisonResult);

        return result;
      } catch (error) {
        console.error("Error:", error);
        return "No face";
      }
    },
  },
};
