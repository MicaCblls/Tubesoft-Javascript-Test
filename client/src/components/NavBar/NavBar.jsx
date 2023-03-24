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

/*<div class="container-input">
  <input type="text" placeholder="Search" name="text" class="input">
  <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
    <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fill-rule="evenodd"></path>
</svg>
</div>


.container-input {
  position: relative;
}

.input {
  width: 150px;
  padding: 10px 0px 10px 40px;
  border-radius: 9999px;
  border: solid 1px #333;
  transition: all .2s ease-in-out;
  outline: none;
  opacity: 0.8;
}

.container-input svg {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translate(0, -50%);
}

.input:focus {
  opacity: 1;
  width: 250px;
}
 */
