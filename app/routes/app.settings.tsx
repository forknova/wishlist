import {
  Box,
  Card,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  TextField,
  Divider,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";

interface FormState {
  name: string;
  description: string;
}

export default function SettingsPage() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    description: "",
  });

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
            <BlockStack gap="400">
              <TextField
                label="App Name"
                autoComplete="off"
                value={formState.name}
                onChange={(value) =>
                  setFormState({ ...formState, name: value })
                }
              />
              <TextField
                label="Description"
                autoComplete="off"
                value={formState.description}
                onChange={(value) =>
                  setFormState({ ...formState, description: value })
                }
              />
            </BlockStack>
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
