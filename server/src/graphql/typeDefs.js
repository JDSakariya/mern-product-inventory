const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    id: ID!
    name: String!
  }

  type Product {
    id: ID!
    name: String!
    description: String
    quantity: Int
    categories: [Category]
    createdAt: String
  }

  input ProductInput {
    name: String!
    description: String
    quantity: Int
    categoryIds: [ID!]
  }

  type Query {
    products(page: Int, limit: Int, search: String, categoryIds: [ID!]): [Product]
    categories: [Category]
  }

  type Mutation {
    addProduct(input: ProductInput!): Product
    deleteProduct(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
