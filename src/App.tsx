import { useState } from "react";
import { Dialog } from "./Dialog";
import {
  defaultDarkModeOverride,
  ThemeProvider,
  Card,
  Text,
  ToggleButton,
  ToggleButtonGroup,
  ColorMode,
  Heading,
  Grid,
  Flex,
  Link,
} from "@aws-amplify/ui-react";

function App() {
  const [colorMode, setColorMode] = useState<ColorMode>("system");
  const theme = {
    name: "my-theme",
    overrides: [defaultDarkModeOverride],
  };
  return (
    <ThemeProvider theme={theme} colorMode={colorMode}>
      <Grid
        height="100vh"
        backgroundColor="background.primary"
        templateRows="min-content 1fr min-content"
      >
        <Flex alignItems="center" justifyContent="center" direction="column">
          <Heading level={1}>Amplify UI Dialog</Heading>
          <Link href="https://github.com/jonathanhudak/amplify-ui-dialog">
            https://github.com/jonathanhudak/amplify-ui-dialog
          </Link>
          <pre>
            <Text as="em">
              {`
<Dialog.Provider>
  <Dialog.OpenerButton>open dialog "A"</Dialog.OpenerButton>
  <Dialog.Element initialOpen>
    <Flex direction="column" gap="space.small">
      <Heading level={2}>Dialog A</Heading>
      <Text variation="primary" as="p">
        hello i am dialog "A" I am initially open.
      </Text>
      <Dialog.SubmitButton>OK</Dialog.SubmitButton>
    </Flex>
  </Dialog.Element>
</Dialog.Provider>`}
            </Text>
          </pre>
        </Flex>
        <Flex justifyContent="center" alignContent="center" alignItems="center">
          <Dialog.Provider>
            <Dialog.OpenerButton>open dialog "A"</Dialog.OpenerButton>
            <Dialog.Element initialOpen>
              <Flex direction="column" gap="space.small">
                <Heading level={2}>Dialog A</Heading>
                <Text variation="primary" as="p">
                  hello i am dialog "A" I am initially open.
                </Text>
                <Dialog.SubmitButton>OK</Dialog.SubmitButton>
              </Flex>
            </Dialog.Element>
          </Dialog.Provider>
          <Dialog.Provider>
            <Dialog.OpenerButton>open dialog "B"</Dialog.OpenerButton>
            <Dialog.Element>
              <Flex direction="column" gap="space.small">
                <Heading level={2}>Dialog B</Heading>
                <Text variation="primary" as="p">
                  hello i am dialog "B"
                </Text>
                <Dialog.SubmitButton>OK</Dialog.SubmitButton>
              </Flex>
            </Dialog.Element>
          </Dialog.Provider>
        </Flex>

        <Card>
          <Flex
            justifyContent="center"
            alignContent="center"
            alignItems="center"
          >
            <Text>Color Mode:</Text>
            <ToggleButtonGroup
              value={colorMode}
              isExclusive
              onChange={(value) => setColorMode(value as ColorMode)}
            >
              <ToggleButton value="light">Light</ToggleButton>
              <ToggleButton value="dark">Dark</ToggleButton>
              <ToggleButton value="system">System</ToggleButton>
            </ToggleButtonGroup>
          </Flex>
        </Card>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
