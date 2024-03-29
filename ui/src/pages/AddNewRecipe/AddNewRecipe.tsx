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
import { useReducer } from "react";
import { useHistory } from "react-router-dom";
import { Ingredients } from "../../interfaces/Ingredients";
import { Steps } from "../../interfaces/Steps";

type State = {
  recipeName: string;
  recipeCookTime: string;
  recipePrepTime: string;
  recipeIngredientName: string;
  recipeIngredientAmount: string;
  recipeIngredients: Ingredients[];
  recipeSteps: Steps[];
  recipeStepDescription: string;
};

type Action =
  | { type: "SET_RECIPE_NAME"; payload: string }
  | { type: "SET_RECIPE_COOK_TIME"; payload: string }
  | { type: "SET_RECIPE_PREP_TIME"; payload: string }
  | { type: "SET_RECIPE_INGREDIENT_NAME"; payload: string }
  | { type: "SET_RECIPE_INGREDIENT_AMOUNT"; payload: string }
  | { type: "SET_RECIPE_INGREDIENTS"; payload: Ingredients[] }
  | { type: "SET_RECIPE_STEPS"; payload: Steps[] }
  | { type: "SET_RECIPE_STEP_DESCRIPTION"; payload: string };

const initialState: State = {
  recipeName: "",
  recipeCookTime: "",
  recipePrepTime: "",
  recipeIngredientName: "",
  recipeIngredientAmount: "",
  recipeIngredients: [],
  recipeSteps: [],
  recipeStepDescription: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_RECIPE_NAME":
      return { ...state, recipeName: action.payload };
    case "SET_RECIPE_COOK_TIME":
      return { ...state, recipeCookTime: action.payload };
    case "SET_RECIPE_PREP_TIME":
      return { ...state, recipePrepTime: action.payload };
    case "SET_RECIPE_INGREDIENT_NAME":
      return { ...state, recipeIngredientName: action.payload };
    case "SET_RECIPE_INGREDIENT_AMOUNT":
      return { ...state, recipeIngredientAmount: action.payload };
    case "SET_RECIPE_INGREDIENTS":
      return { ...state, recipeIngredients: action.payload };
    case "SET_RECIPE_STEPS":
      return { ...state, recipeSteps: action.payload };
    case "SET_RECIPE_STEP_DESCRIPTION":
      return { ...state, recipeStepDescription: action.payload };
    default:
      return state;
  }
}

export const AddNewRecipe = () => {
  const pageHistory = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);

  const SubmitRecipe = async () => {
    if (
      state.recipeName === "" ||
      state.recipeCookTime === "" ||
      state.recipeIngredients?.length === 0 ||
      state.recipeSteps?.length === 0
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
        name: state.recipeName,
        time_to_make: state.recipeCookTime,
        prep_time: state.recipePrepTime,
        ingredients: state.recipeIngredients,
        steps: state.recipeSteps,
      }),
    }).then(() => {
      pageHistory.push("/");
    });
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
          value={state.recipeName}
          onChange={(event) =>
            dispatch({ type: "SET_RECIPE_NAME", payload: event.target.value })
          }
        />
        <Input
          mt={2}
          id="recipePrepTime"
          value={state.recipePrepTime}
          isInvalid={
            isNaN(parseInt(state.recipePrepTime)) && state.recipePrepTime !== ""
          }
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
          value={state.recipeCookTime}
          isInvalid={
            isNaN(parseInt(state.recipeCookTime)) && state.recipeCookTime !== ""
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
      {state.recipeIngredients ? (
        <UnorderedList mt={2}>
          {state.recipeIngredients.map((item, index) => (
            <Flex key={`${item}_${index}`}>
              <ListItem mt={2}>
                {item.name}, {item.amount}
              </ListItem>
              <Spacer />
              <Button
                mb={2}
                maxW="max-content"
                onClick={() => {
                  const newIngredients = [...state.recipeIngredients];
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
          value={state.recipeIngredientName}
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
          value={state.recipeIngredientAmount}
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
            state.recipeIngredientName === "" ||
            state.recipeIngredientAmount === ""
          }
          onClick={() => {
            dispatch({
              type: "SET_RECIPE_INGREDIENTS",
              payload: [
                ...(state.recipeIngredients ?? []),
                {
                  name: state.recipeIngredientName,
                  amount: state.recipeIngredientAmount,
                },
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
      {state.recipeSteps ? (
        <OrderedList mt={2}>
          {state.recipeSteps.map((item, index) => (
            <Flex key={`${item}_${index}`}>
              <ListItem mt={2} key={`${item}_${index}`}>
                {item.description}
              </ListItem>
              <Spacer />
              <Button
                mb={2}
                onClick={() => {
                  const newSteps = [...state.recipeSteps];
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
          value={state.recipeStepDescription}
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
          disabled={state.recipeStepDescription === ""}
          onClick={() => {
            dispatch({
              type: "SET_RECIPE_STEPS",
              payload: [
                ...(state.recipeSteps ?? []),
                { description: state.recipeStepDescription },
              ],
            });
            dispatch({ type: "SET_RECIPE_STEP_DESCRIPTION", payload: "" });
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
