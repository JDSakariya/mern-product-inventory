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
  ) {
    products(
      page: $page
      limit: $limit
      search: $search
      categoryIds: $categoryIds
    ) {
      id
      name
      description
      quantity
      createdAt
      categories {
        id
        name
      }
    }
  }
`;
