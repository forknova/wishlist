import {
  Box,
  Card,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  TextField,
  Divider,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { json, ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

interface FormState {
  name: string;
  description: string;
}

export const loader: LoaderFunction = async () => {
  const settings = {
    name: "My Wishlist Shopify App",
    description: "This app allows customers to add items to their wishlist.",
  };
  return json(settings);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const settings: FormState = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
  };
  console.log(settings);
  return json(settings);
};

export default function SettingsPage() {
  const settings = useLoaderData<FormState>();
  const [formState, setFormState] = useState<FormState>(settings);

  return (
    <Page>
      <TitleBar title="Settings" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: "400", sm: "0" }}
            paddingInlineEnd={{ xs: "400", sm: "0" }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Update app settings and preferences.
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="POST">
              <BlockStack gap="400">
                <TextField
                  label="App Name"
                  name="name"
                  autoComplete="off"
                  value={formState.name}
                  onChange={(value) =>
                    setFormState({ ...formState, name: value })
                  }
                />
                <TextField
                  label="Description"
                  autoComplete="off"
                  name="description"
                  value={formState.description}
                  onChange={(value) =>
                    setFormState({ ...formState, description: value })
                  }
                />
              </BlockStack>
              <Box padding="300"></Box>
              <Button submit={true}>Save</Button>
            </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}

// function Code({ children }: { children: React.ReactNode }) {
//   return (
//     <Box
//       as="span"
//       padding="025"
//       paddingInlineStart="100"
//       paddingInlineEnd="100"
//       background="bg-surface-active"
//       borderWidth="025"
//       borderColor="border"
//       borderRadius="100"
//     >
//       <code>{children}</code>
//     </Box>
//   );
// }
