import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";

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
export default function Home({ games }) {
  return (
    <div id="home" className="h-nopadding-screen padding-container">
      <Grid
        container
        justify="center"
        alignItems="center"
        //   spacing={4}
        direction="column"
        className="h-full-parent"
      >
        {games.map((e) => (
          <Grid item key={e.id}>
            <GameItem {...e} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
