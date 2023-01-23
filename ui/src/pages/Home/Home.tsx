import {
  Box,
  GridItem,
  SimpleGrid,
  Heading,
  Button,
  Input,
  Divider,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { LargeRecipeCard } from "../../components/LargeRecipeCard/LargeRecipeCard";
import { SmallRecipeCard } from "../../components/SmallRecipeCard/SmallRecipeCard";

export const Home = () => {
  const pageHistory = useHistory();
  const [isLarge] = useMediaQuery("(max-width: 1440px)");

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
      <SimpleGrid columns={[1, null, 2]} spacing="40px">
        <Box>
          {isLarge ? (
            <SmallRecipeCard
              title="test"
              rating={Math.floor(Math.random() * 5) + 1}
              timeToCook={"test"}
              id={"test"}
            />
          ) : (
            <LargeRecipeCard
              title="test"
              rating={Math.floor(Math.random() * 5) + 1}
              timeToCook={"test"}
              id={"test"}
            />
          )}
        </Box>
      </SimpleGrid>
      <Text textAlign="center">
        {" "}
        Oh no! you've got no recipes, please add some with the button above! 🙌
      </Text>
    </Box>
  );
};
