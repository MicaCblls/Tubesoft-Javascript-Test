import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import ProductCard from "./Cards/ProductCard";
import { Box } from "@material-ui/core";
import Pagination from "./Pagination/Pagination";
import NavBar from "./NavBar/NavBar";

const home = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "auto",
    maxWidth: "100%",
    "@media (min-width: 1080px)": {
      height: "100%",
    },
  },
  productsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
    height: "auto",
    padding: "5px 0",
    maxWidth: "100%",
    flex: "1 1",
    "@media (min-width: 1080px)": {
      height: "700px",
    },
  },
});

export default function Home({ products }) {
  const classes = home();
  let [currentPage, setCurrentPage] = useState(1);
  let currentProducts;

  let totalPages = Math.ceil(products?.length / 6);
  //setting current page
  if (currentPage === 1) {
    currentProducts = products?.slice(0, 5);
  } else {
    currentProducts = products?.slice(
      (currentPage - 1) * 5, //slice desde 9, a 19, la primera vez que entra a esta condicion current page vale 2, por eso el -1
      (currentPage - 1) * 5 + 5
    );
  }

  if (products?.length) {
    totalPages = Math.ceil(products?.length / 6);
  }

  //Change page
  const paginate = (number) => {
    setCurrentPage(currentPage + number);
  };

  return (
    <Box className={classes.container}>
      <NavBar />
      <Box className={classes.productsContainer}>
        {currentProducts && currentProducts.length
          ? currentProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
          : null}
      </Box>

      <Pagination
        totalPages={totalPages}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
}
