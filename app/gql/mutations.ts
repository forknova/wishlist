export const CREATE_PRODUCT_MUTATION = `
  mutation populateProduct($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
        title
        handle
        status
        variants(first: 10) {
          edges {
            node {
              id
              price
              barcode
              createdAt
            }
          }
        }
      }
    }
  }`;

export const UPDATE_PRODUCT_MUTATION = `
  mutation shopifyRemixTemplateUpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
    productVariantsBulkUpdate(productId: $productId, variants: $variants) {
      productVariants {
        id
        price
        barcode
        createdAt
      }
    }
  }`;
