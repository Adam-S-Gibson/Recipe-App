import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

export const AddNewRecipe = () => {
  const pageHistory = useHistory();

  return (
    <Box>
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        paddingBottom="2"
      >
        <Heading>Add Recipe</Heading>
        <Spacer />
        <Button onClick={() => pageHistory.push("/")}>Back</Button>
      </Flex>
      <Divider />
      <SimpleGrid mt={2} columns={[1, null, 3]} gap={2} mb={10}>
        <Input
          id="recipeName"
          placeholder={"Name of Recipe"}
          onChange={() => console.log("Changed")}
        ></Input>
        <Input
          id="recipePrepTime"
          placeholder={"Prep time? (mins)"}
          onChange={() => console.log("Changed")}
        ></Input>
        <Input
          id="recipeCookTime"
          placeholder={"Make time? (mins)"}
          onChange={() => console.log("Changed")}
        ></Input>
      </SimpleGrid>

      <Heading> Ingredients</Heading>
      <Divider />
      <SimpleGrid mt={2} columns={[1, null, 3]} gap={2} mb={10}>
        <Input
          id="recipeIngredientName"
          placeholder={"Ingredient Name"}
          onChange={() => console.log("Changed")}
        ></Input>
        <Input
          id="recipeIngredientAmount"
          placeholder={"Amount"}
          onChange={() => console.log("Changed")}
        ></Input>
        <Button>Add Ingredient</Button>
      </SimpleGrid>
      <Heading>Instructions</Heading>
      <Divider />
      <SimpleGrid mt={2} columns={[1, null, 2]} gap={2} mb={10}>
        <Input
          id="recipeStepDescription"
          placeholder={"What do we do next?"}
          onChange={() => console.log("Changed")}
        ></Input>
        <Button>Add Ingredient</Button>
      </SimpleGrid>
      <Divider />
      <Button
        id="submit"
        mt={7}
        float="right"
        onClick={() => console.log("submitted")}
      >
        Submit Recipe
      </Button>
    </Box>
  );
};
