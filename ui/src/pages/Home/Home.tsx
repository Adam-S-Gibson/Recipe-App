import { useEffect, useMemo, useState } from "react";
import {
  SimpleGrid,
  GridItem,
  Heading,
  Box,
  Button,
  useMediaQuery,
  Divider,
  Input,
  Text,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { SmallRecipeCard } from "../../components/SmallRecipeCard";
import { LargeRecipeCard } from "../../components/LargeRecipeCard";
import { debounce } from "lodash";
import { Recipe } from "../../interfaces/Recipe";

export const Home = () => {
  const pageHistory = useHistory();
  const [isLarge] = useMediaQuery("(max-width: 1440px)");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const populatePage = async () => {
    const response = await fetch("http://localhost:3080/api/recipes");
    const data = await response.json();
    setRecipes(data);
  };

  useEffect(() => {
    populatePage();
  }, []);

  const onSearchInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const response = await fetch(
      `http://localhost:3080/api/recipes?search=${e.target.value}`
    );
    const data = await response.json();
    setRecipes(data);
  };

  const debouncedChangeHandler = useMemo(() => {
    return debounce(onSearchInputChange, 300);
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
        onChange={debouncedChangeHandler}
      />
      <Divider my={2} />
      {recipes.length > 0 ? (
        <SimpleGrid columns={[1, null, 2]} spacing="40px">
          {recipes.map((item, i) => (
            <Box key={i}>
              {isLarge ? (
                <LargeRecipeCard
                  title={item.name}
                  rating={Math.floor(Math.random() * 5) + 1}
                  timeToCook={parseInt(item.time_to_make)}
                  id={item.id}
                />
              ) : (
                <SmallRecipeCard
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
