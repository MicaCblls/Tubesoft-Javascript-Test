import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, Paper, Typography, useTheme } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const useStyles = makeStyles({
  paper: {
    padding: "1rem",
    margin: "0.5rem",
    width: 500,
    maxHeight: "max-content",
    height: "auto",
    maxWidth: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    "@media (min-width: 780px)": {
      height: "380px",
    },
  },
  grid: {
    display: "flex!important",
    justifyContent: "center",
    alignContent: "center",
    maxHeight: "max-content",
    height: "auto!important",
    "@media (min-width: 780px)": {
      height: "350px",
    },
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  buttonsGrid: {
    display: "flex",
    justifyContent: "space-evenly",
    alignContent: "center",
  },

  buttonAdd: {
    padding: "6px 6px!important",
    minWidth: "44px!important",
    lineHeight: "1.75!important",
    borderRadius: "4px!important",
    letterSpacing: "0.02em!important",
    textTransform: "uppercase",
    "@media (min-width: 780px)": {
      minWidth: "54px",
      width: "100px",
    },
  },
  amount: {
    display: "flex",
    width: "10px",
    justifyContent: "center",
    alignContent: "center",
    flexWrap: "wrap",
    marginBlock: "0",
  },
  price: {
    maxHeight: "16px",
  },
  text: {
    fontSize: "20px",
  },
});

export default function ProductCard({ product }) {
  const {
    id,
    name,
    brand,
    category,
    color,
    description,
    gender,
    image,
    price,
    size,
  } = product;

  const classes = useStyles();
  const theme = useTheme();
  let [amount, setAmount] = useState(0);
  return (
    <>
      <Paper className={classes.paper}>
        <Grid container spacing={2} className={classes.grid}>
          <Grid item className={classes.image}>
            <img className={classes.img} alt={name} src={image} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid
              item
              xs
              container
              direction="column"
              spacing={2}
              className={classes.text}
            >
              <Grid item xs>
                <Typography gutterBottom>{name}</Typography>
                <Typography gutterBottom>{brand}</Typography>
                <Typography color="textSecondary">{category}</Typography>
                <Typography color="textSecondary">{gender}</Typography>
              </Grid>
              <Grid item className={classes.buttonsGrid}>
                <Button
                  variant="contained"
                  onClick={() => setAmount(amount + 1)}
                >
                  <AddIcon />
                </Button>
                <Typography variant="subtitle1" className={classes.amount}>
                  {amount ? amount : 0}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setAmount(amount ? amount - 1 : 0)}
                >
                  <RemoveIcon />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonAdd}
                >
                  <ShoppingCartIcon />
                </Button>
              </Grid>
            </Grid>
            <Grid item className={classes.price}>
              <Typography variant="subtitle1">${price}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
