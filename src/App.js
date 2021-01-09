import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import "./App.css";
import TicTacToe from "./tic-tac-toe";
import TicTacToeImage from "./tic-tac-toe/image.jpg";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 240,
  },
});
function GameItem({ image, imageTitle, title, description, path }) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card elevation={3}>
      <CardActionArea
        onClick={() => {
          history.push(path);
        }}
      >
        <CardMedia className={classes.media} image={image} title={imageTitle} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
function HomePage() {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      spacing={4}
      style={{ height: "100%" }}
      direction="column"
    >
      {games.map((e) => (
        <Grid item key={e.id}>
          <GameItem {...e} />
        </Grid>
      ))}
    </Grid>
  );
}
const games = [
  {
    id: "tic-tac-toe",
    image: TicTacToeImage,
    title: "Tic-Tac-Toe",
    imageTitle: "Tic-Tac-Toe",
    description: "A Tic-Tac-Toe game with AI written by React JS.",
    path: "/tic-tac-toe",
    render: () => <TicTacToe />,
  },
];
function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" style={{ height: "100vh" }}>
        <Router>
          <Switch>
            {games.map((e) => (
              <Route key={e.id} path={e.path}>
                {e.render()}
              </Route>
            ))}
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </Container>
    </React.Fragment>
  );
}

export default App;
