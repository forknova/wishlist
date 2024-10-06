export interface Product {
  id: string;
  title: string;
  vendor: string;
  status: string;
  featuredImage: FeaturedImage | null;
  variants: {
    edges: VariantEdge[];
  };
}

interface FeaturedImage {
  url: string;
  altText: string | null;
}

interface VariantEdge {
  node: {
    price: string;
  };
}
