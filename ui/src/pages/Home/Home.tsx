import {
  Box,
  GridItem,
  SimpleGrid,
  Heading,
  Button,
  Input,
  Divider,
  Text,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";

export const Home = () => {
  const pageHistory = useHistory();

  return (
    <Box>
      <SimpleGrid columns={[1, null, 3]}>
        <GridItem colSpan={2}>
          <Heading>Your Cookbook</Heading>
        </GridItem>
        <Button id="addRecipe" onClick={() => pageHistory.push("/add-recipe")}>
          Add New Recipe
        </Button>
      </SimpleGrid>
      <Input my={2} placeholder="Search for recipe" />
      <Divider mb={2} />
      <RecipeCard title={"TEST"} rating={0} timeToCook={"3"} id={"123"} />
      <Text textAlign="center">
        {" "}
        Oh no! you've got no recipes, please add some with the button above! 🙌
      </Text>
    </Box>
  );
};
