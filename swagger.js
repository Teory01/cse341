const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Author-Books API",
    description: "API for managing authors and books",
  },
  host: "https://cse341-qvea.onrender.com",
  basePath: "/",
  schemes: ["https"],
  tags: [
    {
      name: "Books",
      description: "Endpoints for books"
    },
    {
      name: "Authors",
      description: "Endpoints for authors"
    }
  ]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"]; // or your routes file if different

swaggerAutogen(outputFile, endpointsFiles, doc);