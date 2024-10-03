import { TitleBar } from "@shopify/app-bridge-react";
import { BlockStack, Box, Button, Card, Page, Text } from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
import { useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import { json } from "@remix-run/node";
import { User } from "app/types/User";

interface FetcherData {
  users?: User[];
}

export async function action() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  return json({ users });
}

export default function HelloPage() {
  const [users, setUsers] = useState<User[]>([]);
  const fetcher = useFetcher();

  const handleClick = () => {
    fetcher.submit(null, { method: "POST" });
  };

  // Update users when fetcher data is available
  useEffect(() => {
    if (fetcher.data && (fetcher.data as FetcherData).users) {
      setUsers((fetcher.data as FetcherData).users!);
    }
  }, [fetcher.data]);

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
              loading={fetcher.state === "submitting"}
              onClick={handleClick}
            >
              Fetch Users
            </Button>
          </Box>
          <Text as="p" variant="bodyMd">
            Fetched {users.length} users
          </Text>
        </BlockStack>
      </Card>
    </Page>
  );
}
