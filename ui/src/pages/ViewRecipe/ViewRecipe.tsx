import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  ListItem,
  Spacer,
  UnorderedList,
  Text,
  OrderedList,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

export const ViewRecipe = () => {
  const pageHistory = useHistory();

  return (
    <Box>
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        paddingBottom="2"
      >
        <Heading>Your Recipe</Heading>
        <Spacer />
        <Button onClick={() => pageHistory.push("/")}>Back</Button>
      </Flex>
      <Divider />
      <Box>
        <Heading size="lg">Ingredients</Heading>
        <UnorderedList>
          <ListItem>
            <Text casing="capitalize">Ingredient</Text>
          </ListItem>
          <ListItem>
            <Text casing="capitalize">Ingredient</Text>
          </ListItem>
          <ListItem>
            <Text casing="capitalize">Ingredient</Text>
          </ListItem>
          <ListItem>
            <Text casing="capitalize">Ingredient</Text>
          </ListItem>
        </UnorderedList>
        <Divider my={2} />
        <Heading my={4} size="lg">
          Instructions
        </Heading>
        <OrderedList>
          <ListItem>
            <Text casing="capitalize">Ingredient</Text>
          </ListItem>
          <ListItem>
            <Text casing="capitalize">Ingredient</Text>
          </ListItem>
          <ListItem>
            <Text casing="capitalize">Ingredient</Text>
          </ListItem>
          <ListItem>
            <Text casing="capitalize">Ingredient</Text>
          </ListItem>
        </OrderedList>
      </Box>
      <Button float="right" colorScheme="red">
        Delete
      </Button>
    </Box>
  );
};
