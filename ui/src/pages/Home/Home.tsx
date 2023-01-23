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
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LargeRecipeCard } from "../../components/LargeRecipeCard/LargeRecipeCard";
import { SmallRecipeCard } from "../../components/SmallRecipeCard/SmallRecipeCard";
import { Recipe } from "../../interfaces/Recipe";

export const Home = () => {
  const pageHistory = useHistory();
  const [isLarge] = useMediaQuery("(max-width: 1440px)");

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const populatePage = async () => {
    fetch("http://localhost:3080/api/recipes")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      });
  };

  useEffect(() => {
    populatePage();
  }, []);

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
      <Input
        mt={2}
        id="searchBar"
        placeholder="Search By Ingredient or Name"
        onChange={() => console.log("Searched Something")}
      />
      <Divider my={2} />
      {recipes.length > 0 ? (
        <SimpleGrid columns={[1, null, 2]} spacing="40px">
          {recipes.map((item, i) => (
            <Box key={i}>
              {isLarge ? (
                <SmallRecipeCard
                  title={item.name}
                  rating={Math.floor(Math.random() * 5) + 1}
                  timeToCook={parseInt(item.time_to_make)}
                  id={item.id}
                />
              ) : (
                <LargeRecipeCard
                  title={item.name}
                  rating={Math.floor(Math.random() * 5) + 1}
                  timeToCook={parseInt(item.time_to_make)}
                  id={item.id}
                />
              )}
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Text textAlign="center">
          {" "}
          Oh no! you've got no recipes, please add some with the button above!
          🙌{" "}
        </Text>
      )}
    </Box>
  );
};
