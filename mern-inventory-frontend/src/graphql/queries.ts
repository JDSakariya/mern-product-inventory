import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts(
    $page: Int
    $limit: Int
    $search: String
    $categoryIds: [ID!]
    $createdAt: String
  ) {
    products(
      page: $page
      limit: $limit
      search: $search
      categoryIds: $categoryIds
      createdAt: $createdAt
    ) {
      id
      name
      description
      quantity
      categories {
        id
        name
      }
      createdAt
    }
  }
`;
