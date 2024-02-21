const AWS = require("aws-sdk");

module.exports = {
  Query: {},

  Mutation: {
    async face() {
      /* 

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
          SimilarityThreshold: 90, // Adjust similarity threshold as needed
        };

        try {
          const response = await rekognition.compareFaces(params).promise();
          return response;
        } catch (error) {
          console.error("Error comparing faces:", error);
          throw error;
        }
      }

      // Usage example
      (async () => {
        try {
          // Dynamic import for fetch
          const fetch = await import("node-fetch");

          // Supabase image URLs
          const imageUrl1 =
            "https://vlxkgewzbkitgpipqpst.supabase.co/storage/v1/object/public/witi-bucket/image3.jpg";
          const imageUrl2 =
            "https://vlxkgewzbkitgpipqpst.supabase.co/storage/v1/object/public/witi-bucket/image3.jpg";

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
          const comparisonResult = await compareFaces(
            imageBuffer1,
            imageBuffer2
          );
          console.log("Face comparison result:", comparisonResult);
        } catch (error) {
          console.error("Error:", error);
        }
      })();*/
    },
  },
};
