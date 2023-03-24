import { makeStyles } from "@mui/styles";
import React from "react";

const pagination = makeStyles({
  containerPagination: {
    textAlign: "center",
    userSelect: "none",
    borderRadius: "1rem",
    display: "inline-block",
    margin: "10px",
    boxShadow: "0 5px 10px rgb(1 1 1 / 10%)",
    marginBottom: "10px",
    paddingLeft: "5px",
    paddingRight: "5px",
  },
  previous: {
    display: "inline-block",
    margin: "5px",
    boxShadow: "0 5px 10px rgb(1 1 1 / 10%)",
    width: "70px",
    borderRadius: "40px",
    marginBottom: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    "&:hover": { transform: "translateX(-5px)" },
  },
  next: {
    display: "inline-block",
    margin: "5px",
    boxShadow: "0 5px 10px rgb(1 1 1 / 10%)",
    width: "70px",
    borderRadius: "40px",
    marginBottom: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    "&:hover": { transform: "translateX(5px)" },
  },
  active: {
    borderRadius: "45%",
    width: "2rem",
    cursor: "pointer",
    display: "inline-block",
    margin: "5px",
    boxShadow: "0 5px 8px rgb(1 1 1 / 10%)",
    backgroundColor: "#99f6e4",
    marginBottom: "10px",
  },
  liContainer: {
    display: "inline-block",
    margin: "5px",
    boxShadow: "0 5px 10px rgb(1 1 1 / 10%)",
    marginBottom: "10px",
    lineHeight: "40px",
    listStyle: "none",
    borderRadius: "45%",
    width: "2rem",
    cursor: "pointer",
  },
  link: {
    fontSize: "1rem",
    lineHeight: "40px",
    listStyle: "none",
    textDecoration: "none",
    color: "#0f172a",
  },
});

export default function Pagination({
  totalPages,
  paginate,
  currentPage,
  setCurrentPage,
}) {
  const classes = pagination();
  const maxNumbers = 3;
  let pages = [];
  //Filling array with pages numbers
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  //getting only 10 pages
  let pageNumbers = () => {
    const half = Math.round(maxNumbers / 2);
    let to = maxNumbers;
    if (currentPage + half >= totalPages) {
      to = totalPages;
    } else if (currentPage > half) {
      to = currentPage + half;
    }
    let from = to - maxNumbers;
    if (from < 0) {
      from = 0;
    }
    return pages.slice(from, to);
  };

  return (
    <div className={classes.containerPagination}>
      {currentPage > 1 && (
        <a className={classes.link} href="#" onClick={() => paginate(-1)}>
          <li className={classes.previous}>Prev</li>
        </a>
      )}
      {pageNumbers().map((number) => (
        <a
          key={number}
          className={classes.link}
          href="#"
          onClick={() => setCurrentPage(number)}
        >
          <li
            className={
              number === currentPage ? classes.active : classes.liContainer
            }
          >
            {number}
          </li>
        </a>
      ))}
      {currentPage !== totalPages && (
        <a className={classes.link} href="#" onClick={() => paginate(1)}>
          <li className={classes.next}>Next</li>
        </a>
      )}
    </div>
  );
}
