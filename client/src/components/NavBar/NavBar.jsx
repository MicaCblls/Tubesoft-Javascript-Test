import React from "react";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@material-ui/icons/Search";

const styles = makeStyles({
  navContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
    padding: "1rem",
    width: "100%",
    maxWidth: "100%",
    borderBottom: "1px solid #64748b",
    background: "rgb(103,151,148)",
    background:
      "linear-gradient(165deg, rgba(103,151,148,1) 0%, rgba(17,94,89,1) 85%)",
  },
  formContainer: {
    display: "block",
    position: "relative",
  },
  svg: {
    position: "relative",
    top: "40%",
    right: "160px",
    transition: "all .3s ease-in-out",
    transform: "translate(0, -30%)",
  },
  input: {
    width: "170px",
    padding: "10px 0px 10px 40px",
    borderRadius: "9999px",
    border: "solid 1px #333",
    transition: "all .3s ease-in-out",
    outline: "none",
    opacity: "0.9",
    "&:focus": {
      // Estilos del input cuando tiene focus
      width: "250px",
      opacity: 1,
      "& ~ $svg": {
        // Selector adyacente para el elemento svg hermano
        right: "240px",
      },
    },
  },
});

export default function NavBar() {
  const classes = styles();
  return (
    <header className={classes.navContainer}>
      <form className={classes.formContainer}>
        <input
          type="text"
          placeholder="Search by name..."
          className={classes.input}
        />
        <SearchIcon className={classes.svg} />
      </form>
    </header>
  );
}
