import React from "react";
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
import "./App.css";

function GameItem({ image, imageTitle, title, description }) {
  return (
    <Card elevation={3}>
      <CardActionArea>
        <CardMedia
          // className={classes.media}
          image={image}
          title={imageTitle}
        />
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

function App() {
  const games = [
    {
      id: "tic-tac-toe",
      title: "Tic-Tac-Toe",
      imageTitle: "Tic-Tac-Toe",
      description: "A Tic-Tac-Toe game with AI written by React JS.",
    },
  ];
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" style={{ height: "100vh" }}>
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
      </Container>
    </React.Fragment>
  );
}

export default App;
