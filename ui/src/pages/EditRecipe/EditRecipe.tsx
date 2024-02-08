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
import { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Ingredients } from "../../interfaces/Ingredients";
import { Steps } from "../../interfaces/Steps";

interface Recipe {
  name: string;
  time_to_make: string;
  prep_time: string;
  ingredients: Ingredients[];
  steps: Steps[];
}

interface State extends Recipe {
  ingredientName: string;
  ingredientAmount: string;
  stepDescription: string;
}

const initialState: State = {
  name: "",
  time_to_make: "",
  prep_time: "",
  ingredients: [],
  steps: [],
  ingredientName: "",
  ingredientAmount: "",
  stepDescription: "",
};

type Action =
  | { type: "SET_RECIPE"; payload: Object }
  | { type: "SET_RECIPE_NAME"; payload: string }
  | { type: "SET_RECIPE_COOK_TIME"; payload: string }
  | { type: "SET_RECIPE_PREP_TIME"; payload: string }
  | { type: "SET_RECIPE_INGREDIENT_NAME"; payload: string }
  | { type: "SET_RECIPE_INGREDIENT_AMOUNT"; payload: string }
  | { type: "SET_RECIPE_INGREDIENTS"; payload: Ingredients[] }
  | { type: "SET_RECIPE_STEPS"; payload: Steps[] }
  | { type: "SET_RECIPE_STEP_DESCRIPTION"; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_RECIPE":
      return { ...state, ...action.payload };
    case "SET_RECIPE_NAME":
      return { ...state, name: action.payload };
    case "SET_RECIPE_COOK_TIME":
      return { ...state, time_to_make: action.payload };
    case "SET_RECIPE_PREP_TIME":
      return { ...state, prep_time: action.payload };
    case "SET_RECIPE_INGREDIENT_NAME":
      return { ...state, ingredientName: action.payload };
    case "SET_RECIPE_INGREDIENT_AMOUNT":
      return { ...state, ingredientAmount: action.payload };
    case "SET_RECIPE_INGREDIENTS":
      return { ...state, ingredients: action.payload };
    case "SET_RECIPE_STEP_DESCRIPTION":
      return { ...state, stepDescription: action.payload };
    case "SET_RECIPE_STEPS":
      return { ...state, steps: action.payload };
    default:
      return state;
  }
}

export const EditRecipe = () => {
  const pageHistory = useHistory();
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(`http://localhost:3080/api/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: "SET_RECIPE", payload: data }));
  }, [id]);

  const SubmitRecipe = async () => {
    if (
      state.name === "" ||
      state.time_to_make === "" ||
      state.ingredients?.length === 0 ||
      state.steps?.length === 0
    ) {
      return;
    }

    const recipeToSend = {
      name: state.name,
      time_to_make: state.time_to_make,
      prep_time: state.prep_time,
      ingredients: state.ingredients.map(({ name, amount }) => ({
        name,
        amount,
      })),
      steps: state.steps.map(({ description }) => ({ description })),
    };

    const response = await fetch(`http://localhost:3080/api/recipe/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeToSend),
    });

    if (response.ok) {
      pageHistory.push(`/view-recipe/${id}`);
    }
  };

  return (
    <Box>
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        paddingBottom="2"
      >
        <Heading> Edit Recipe</Heading>
        <Spacer></Spacer>
        <Button onClick={() => pageHistory.push("/")}>Back</Button>
      </Flex>
      <Divider />
      <SimpleGrid columns={[1, null, 3]} gap={2} mb={10}>
        <Input
          mt={2}
          id="recipeName"
          placeholder={"Name of Recipe"}
          value={state.name}
          onChange={(event) =>
            dispatch({ type: "SET_RECIPE_NAME", payload: event.target.value })
          }
        />
        <Input
          mt={2}
          id="recipePrepTime"
          value={state.prep_time}
          isInvalid={isNaN(parseInt(state.prep_time)) && state.prep_time !== ""}
          placeholder={"Prep time? (mins)"}
          onChange={(event) =>
            dispatch({
              type: "SET_RECIPE_PREP_TIME",
              payload: event.target.value,
            })
          }
        />
        <Input
          mt={2}
          id="recipeCookTime"
          value={state.time_to_make}
          isInvalid={
            isNaN(parseInt(state.time_to_make)) && state.time_to_make !== ""
          }
          placeholder={"Make time? (mins)"}
          onChange={(event) =>
            dispatch({
              type: "SET_RECIPE_COOK_TIME",
              payload: event.target.value,
            })
          }
        />
      </SimpleGrid>
      <Heading mt={2}>Ingredients</Heading>
      <Divider my={2} />
      {state.ingredients ? (
        <UnorderedList mt={2}>
          {state.ingredients.map((item: Ingredients, index: number) => (
            <Flex key={`${item}_${index}`}>
              <ListItem mt={2}>
                {item.name}, {item.amount}
              </ListItem>
              <Spacer />
              <Button
                mb={2}
                maxW="max-content"
                onClick={() => {
                  const newIngredients = [...state.ingredients];
                  newIngredients.splice(index, 1);
                  dispatch({
                    type: "SET_RECIPE_INGREDIENTS",
                    payload: newIngredients,
                  });
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
          value={state.ingredientName}
          onChange={(event) =>
            dispatch({
              type: "SET_RECIPE_INGREDIENT_NAME",
              payload: event.target.value,
            })
          }
        ></Input>
        <Input
          mt={2}
          id="recipeIngredientAmount"
          placeholder={"Amount"}
          value={state.ingredientAmount}
          onChange={(event) =>
            dispatch({
              type: "SET_RECIPE_INGREDIENT_AMOUNT",
              payload: event.target.value,
            })
          }
        ></Input>
        <Button
          my={2}
          id="addIngredient"
          disabled={
            state.ingredientName === "" || state.ingredientAmount === ""
          }
          onClick={() => {
            dispatch({
              type: "SET_RECIPE_INGREDIENTS",
              payload: [
                ...state.ingredients,
                { name: state.ingredientName, amount: state.ingredientAmount },
              ],
            });
            dispatch({ type: "SET_RECIPE_INGREDIENT_NAME", payload: "" });
            dispatch({ type: "SET_RECIPE_INGREDIENT_AMOUNT", payload: "" });
          }}
        >
          Add Ingredient
        </Button>
      </SimpleGrid>

      <Heading mt={2}>Instructions</Heading>
      <Divider />
      {state.steps ? (
        <OrderedList mt={2}>
          {state.steps.map((item: Steps, index: number) => (
            <Flex key={`${item}_${index}`}>
              <ListItem mt={2} key={`${item}_${index}`}>
                {item.description}
              </ListItem>
              <Spacer />
              <Button
                mb={2}
                onClick={() => {
                  const newSteps = [...state.steps];
                  newSteps.splice(index, 1);
                  dispatch({ type: "SET_RECIPE_STEPS", payload: newSteps });
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
          value={state.stepDescription}
          placeholder={"What do we do next?"}
          onChange={(event) =>
            dispatch({
              type: "SET_RECIPE_STEP_DESCRIPTION",
              payload: event.target.value,
            })
          }
        ></Input>
        <Button
          my={2}
          id="addStep"
          disabled={state.stepDescription === ""}
          onClick={() => {
            dispatch({
              type: "SET_RECIPE_STEPS",
              payload: [...state.steps, { description: state.stepDescription }],
            });
            dispatch({ type: "SET_RECIPE_STEP_DESCRIPTION", payload: "" });
          }}
        >
          Add Instructions
        </Button>
      </SimpleGrid>
      <Divider my={2} />
      <Button id="submit" mt={7} float="right" onClick={SubmitRecipe}>
        Update Recipe
      </Button>
    </Box>
  );
};
