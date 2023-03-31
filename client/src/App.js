import { Route } from "react-router-dom";
import Home from "./components/Home";
import CssBaseline from "@material-ui/core/CssBaseline";
import useFetch from "./useFetch";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@mui/styles";

const theme = createTheme({
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 6,
        padding: "6px 6px",
        minWidth: "25px",
        minHeight: "25px",
        lineHeight: "1.75",
        borderRadius: "4px",
        letterSpacing: 0,
        textTransform: "uppercase",
        "@media (min-width: 780px)": {
          minWidth: "30px",
          minHeight: "30px",
        },
      },
      containedPrimary: {
        backgroundColor: "#2dd4bf",
        "&:hover": {
          backgroundColor: "#2dd4bf",
        },
      },
      containedSecondary: {
        backgroundColor: "#e0e0e0",
        "&:hover": {
          backgroundColor: "#e0e0e0",
        },
      },
    },

    MuiCssBaseline: {
      "@global": {
        html: {
          width: "100%",
          height: "auto",
          margin: 0,
          "@media (min-width: 1590px)": {
            height: "100%",
          },
        },
        body: {
          width: "100%",
          height: "auto",
          margin: 0,
          "@media (min-width: 1080px)": {
            height: "100%",
          },
        },
        "#root": {
          width: "100%",
          height: "auto",
          margin: 0,
          "@media (min-width: 1080px)": {
            height: "100%",
          },
        },
      },
    },
  },
});

const App = () => {
  const url = "http://localhost:3000/products";
  const { data, isLoading, error } = useFetch(url);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>an error occured</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Route path={"/"}>
        <Home products={data} />
      </Route>
    </ThemeProvider>
  );
};

export default App;
