import {
  Box,
  Divider,
  Flex,
  Heading,
  Spacer,
  Button,
  SimpleGrid,
  Input,
  UnorderedList,
  ListItem,
  Text,
  OrderedList,
} from "@chakra-ui/react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Ingredients } from "../../interfaces/Ingredients";
import { Steps } from "../../interfaces/Steps";

export const AddNewRecipe = () => {
  const pageHistory = useHistory();
  const [recipeName, setRecipeName] = useState<string>("");
  const [recipeCookTime, setRecipeCookTime] = useState<string>("");
  const [recipePrepTime, setRecipePrepTime] = useState<string>("");
  const [recipeIngredientName, setRecipeIngredientName] = useState<string>("");
  const [recipeIngredientAmount, setRecipeIngredientAmount] =
    useState<string>("");
  const [recipeIngredients, setRecipeIngredients] = useState<Ingredients[]>();
  const [recipeSteps, setRecipeSteps] = useState<Steps[]>();
  const [recipeStepDescription, setRecipeStepDescription] =
    useState<string>("");

  const SubmitRecipe = async () => {
    if (
      recipeName === "" ||
      recipeCookTime === "" ||
      recipeIngredients?.length === 0 ||
      recipeSteps?.length === 0
    ) {
      return;
    }

    fetch("http://localhost:3080/api/recipes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: recipeName,
        time_to_make: recipeCookTime,
        prep_time: recipePrepTime,
        ingredients: recipeIngredients,
        steps: recipeSteps,
      }),
    }).then(() => {
      pageHistory.push("/");
    });
  };

  const removeItemFromArrayByIndex = (
    toRemove: number,
    func: Function,
    arrayToRemove: Array<Ingredients | Steps>
  ) => {
    const newArray = arrayToRemove?.filter((_, index) => {
      return index !== toRemove;
    });

    func(newArray);
  };

  return (
    <Box>
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        paddingBottom="2"
      >
        <Heading> Add Recipe</Heading>
        <Spacer></Spacer>
        <Button onClick={() => pageHistory.push("/")}>Back</Button>
      </Flex>
      <Divider />
      <SimpleGrid columns={[1, null, 3]} gap={2} mb={10}>
        <Input
          mt={2}
          id="recipeName"
          placeholder={"Name of Recipe"}
          value={recipeName}
          onChange={(event) => setRecipeName(event.target.value)}
        />
        <Input
          mt={2}
          id="recipePrepTime"
          value={recipePrepTime}
          isInvalid={isNaN(parseInt(recipePrepTime)) && recipePrepTime !== ""}
          placeholder={"Prep time? (mins)"}
          onChange={(event) => setRecipePrepTime(event.target.value)}
        />
        <Input
          mt={2}
          id="recipeCookTime"
          value={recipeCookTime}
          isInvalid={isNaN(parseInt(recipeCookTime)) && recipeCookTime !== ""}
          placeholder={"Make time? (mins)"}
          onChange={(event) => setRecipeCookTime(event.target.value)}
        />
      </SimpleGrid>
      <Heading mt={2}>Ingredients</Heading>
      <Divider my={2} />
      {recipeIngredients ? (
        <UnorderedList mt={2}>
          {recipeIngredients.map((item, index) => (
            <Flex key={`${item}_${index}`}>
              <ListItem mt={2}>
                {item.name}, {item.amount}
              </ListItem>
              <Spacer />
              <Button
                mb={2}
                maxW="max-content"
                onClick={() => {
                  removeItemFromArrayByIndex(
                    index,
                    setRecipeIngredients,
                    recipeIngredients
                  );
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Flex>
          ))}
        </UnorderedList>
      ) : (
        <Text mt={2}>Add your ingredients here! 😃</Text>
      )}
      <SimpleGrid columns={[1, null, 3]} gap={2} mb={10}>
        <Input
          mt={2}
          id="recipeIngredientName"
          placeholder={"Name of ingredient"}
          value={recipeIngredientName}
          onChange={(event) => setRecipeIngredientName(event.target.value)}
        ></Input>
        <Input
          mt={2}
          id="recipeIngredientAmount"
          placeholder={"Amount"}
          value={recipeIngredientAmount}
          onChange={(event) => setRecipeIngredientAmount(event.target.value)}
        ></Input>
        <Button
          my={2}
          id="addIngredient"
          disabled={
            recipeIngredientName === "" || recipeIngredientAmount === ""
          }
          onClick={() => {
            setRecipeIngredients([
              ...(recipeIngredients ?? []),
              { name: recipeIngredientName, amount: recipeIngredientAmount },
            ]);
            setRecipeIngredientName("");
            setRecipeIngredientAmount("");
          }}
        >
          Add Ingredient
        </Button>
      </SimpleGrid>

      <Heading mt={2}>Instructions</Heading>
      <Divider />
      {recipeSteps ? (
        <OrderedList mt={2}>
          {recipeSteps.map((item, index) => (
            <Flex key={`${item}_${index}`}>
              <ListItem mt={2} key={`${item}_${index}`}>
                {item.description}
              </ListItem>
              <Spacer />
              <Button
                mb={2}
                onClick={() => {
                  removeItemFromArrayByIndex(
                    index,
                    setRecipeSteps,
                    recipeSteps
                  );
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Flex>
          ))}
        </OrderedList>
      ) : (
        <Text mt={2}>Add your secret recipe here! 👩‍🍳👨‍🍳</Text>
      )}
      <SimpleGrid columns={[1, null, 2]} gap={2}>
        <Input
          mt={2}
          id="recipeStepDescription"
          value={recipeStepDescription}
          placeholder={"What do we do next?"}
          onChange={(event) => setRecipeStepDescription(event.target.value)}
        ></Input>
        <Button
          my={2}
          id="addStep"
          disabled={recipeStepDescription === ""}
          onClick={() => {
            setRecipeSteps([
              ...(recipeSteps ?? []),
              { description: recipeStepDescription },
            ]);
            setRecipeStepDescription("");
          }}
        >
          Add Instructions
        </Button>
      </SimpleGrid>
      <Divider my={2} />
      <Button id="submit" mt={7} float="right" onClick={SubmitRecipe}>
        Submit Recipe
      </Button>
    </Box>
  );
};
