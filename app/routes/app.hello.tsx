import { TitleBar } from "@shopify/app-bridge-react";
import { BlockStack, Box, Button, Card, Page, Text } from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
import { useState } from "react";

export default function HelloPage() {
  const [loading, setLoading] = useState(false);

  // mimic the loading state 
  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Page>
      <TitleBar title="Hello page" />
      <Card background="bg-surface-secondary">
        <BlockStack gap="300">
          <Text variant="headingMd" as="h1">
            Hello world!
          </Text>
          <Box maxWidth="200px">
            <Button
              icon={PlusIcon}
              variant="primary"
              loading={loading}
              onClick={handleClick}
            >
              Do something
            </Button>
          </Box>
        </BlockStack>
      </Card>
    </Page>
  );
}
