import {
  Box,
  Divider,
  Flex,
  Heading,
  Spacer,
  Text,
  Button,
  SimpleGrid,
  GridItem,
  ListItem,
  OrderedList,
  Image,
  UnorderedList,
} from "@chakra-ui/react";
import { faStar, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { DeleteButtonAndModal } from "../../components/DeleteButtonAndModal";
import { Recipe } from "../../interfaces/Recipe";

export const ViewRecipe = () => {
  const pageHistory = useHistory();
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe>();

  const populatePage = async (id: string) => {
    fetch(`http://localhost:3080/api/recipe/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);
      });
  };

  useEffect(() => {
    populatePage(id);
  }, [id]);

  return (
    <Box>
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        paddingBottom="2"
      >
        <Heading size="xl">{recipe?.name}</Heading>
        <Spacer></Spacer>
        <Button onClick={() => pageHistory.push("/")}>Back</Button>
      </Flex>
      <Divider mb={5} />

      {recipe ? (
        <Box>
          <SimpleGrid
            alignItems="center"
            justifyContent="center"
            columns={[1, null, 3]}
          >
            <Image
              maxW={150}
              src="https://media.istockphoto.com/id/1185879263/vector/recipe-book-hand-drawn-cover-vector-illustration.jpg?s=612x612&w=0&k=20&c=LMU-L5FcyKYdzPdB_ZNc0mQlFCwMyJM4iI94ZzBfpQM="
            />
            <GridItem colSpan={2}>
              <Text mt={2}>
                <FontAwesomeIcon style={{ marginRight: 3 }} icon={faStar} />{" "}
                Prep Time: {recipe?.prep_time} Mins
              </Text>
              <Text mt={2}>
                <FontAwesomeIcon style={{ marginRight: 7 }} icon={faStar} />
                Cooking Time: {recipe?.time_to_make} Mins
              </Text>
            </GridItem>
          </SimpleGrid>
          <Divider my={2} />

          <Heading my={4} size="lg">
            Ingredients & Measurements
          </Heading>
          <SimpleGrid>
            <UnorderedList listStyleType="none" ml="0">
              {recipe?.ingredients.map((item, index) => (
                <GridItem key={`${item.name}_${index}`} colSpan={1}>
                  <ListItem>
                    <Flex gap={3}>
                      <Text casing="capitalize">
                        {" "}
                        <FontAwesomeIcon
                          style={{
                            marginRight: 4,
                            marginBottom: 4,
                            fontSize: 6,
                          }}
                          icon={faCircle}
                        />{" "}
                        {item.name}
                      </Text>{" "}
                      <Text casing="capitalize">{item.amount}</Text>
                    </Flex>
                  </ListItem>
                </GridItem>
              ))}
            </UnorderedList>
          </SimpleGrid>
          <Divider my={2} />
          <Heading my={4} size="lg">
            How To Make
          </Heading>
          <OrderedList mt={2}>
            {recipe?.steps.map((item, index) => (
              <ListItem my={2} key={`${item.description}_${index}`}>
                {item.description}
              </ListItem>
            ))}
          </OrderedList>
        </Box>
      ) : (
        <Text>Loading</Text>
      )}
      <Box mt={5}>
        <Button onClick={() => pageHistory.push(`/edit-recipe/${id}`)}>
          {" "}
          Edit{" "}
        </Button>
        <DeleteButtonAndModal id={id} />
      </Box>
    </Box>
  );
};
