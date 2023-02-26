import { Box } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { AddNewRecipe } from "./pages/AddNewRecipe/AddNewRecipe";
import { Error } from "./pages/Error/Error";
import { Home } from "./pages/Home/Home";
import { ViewRecipe } from "./pages/ViewRecipe/ViewRecipe";

const App = () => {
  return (
    <Box
      w={["96%", "90%", null, "70%", "40%"]}
      margin="auto"
      display="flex"
      flexDirection="column"
      mt={5}
    >
      <Header title="Master Kitchen 🍽️" />
      <Router>
        <Box mt={10}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/add-recipe" component={AddNewRecipe} />
            <Route exact path="/view-recipe/:id" component={ViewRecipe} />
            <Route path="*" component={Error} />
          </Switch>
        </Box>
      </Router>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default App;
