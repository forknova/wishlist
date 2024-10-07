import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { Page, Layout, Card, DataTable, Thumbnail, Pagination } from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { PRODUCTS_QUERY } from "app/gql/queries";
import { Product } from "app/types/Product";
import { TitleBar } from "@shopify/app-bridge-react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const url = new URL(request.url);
  const cursor = url.searchParams.get("cursor") || null;

  const response = await admin.graphql(
    PRODUCTS_QUERY,
    { variables: { cursor } }
  );

  const responseJson = await response.json();
  const { products } = responseJson.data;

  return json({
    products: products.edges.map((edge: any) => edge.node),
    pageInfo: products.pageInfo
  });
};

export default function ProductsPage() {
  const { products, pageInfo } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const rows = products.map((product: Product) => [
    <Thumbnail
       source={product.featuredImage?.url || "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png"}
       alt={product.featuredImage?.altText || "Product image"}
     />,
    product.title,
    product.vendor,
    `$${product.variants.edges[0].node.price}`,
    product.status
  ]);

  const handleNextPage = () => {
    navigate(`?cursor=${pageInfo.endCursor}`);
  };

  const handlePreviousPage = () => {
    navigate(-1);
  };

  return (
    <Page>
      <TitleBar title="Products" />
      <Layout>
        <Layout.Section>
          <Card>
            <DataTable
              columnContentTypes={[
                'text',
                'text',
                'text',
                'numeric',
                'text',
              ]}
              headings={[
                'Image',
                'Title',
                'Vendor',
                'Price',
                'Status'
              ]}
              rows={rows}
            />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <Pagination
                hasPrevious={searchParams.has("cursor")}
                onPrevious={handlePreviousPage}
                hasNext={pageInfo.hasNextPage}
                onNext={handleNextPage}
              />
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
