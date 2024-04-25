import { CircularProgress, Grid } from "@mui/material";
import React from "react";
import Icon from "./Icon";
// import Icon from "./Icon";

const CheckingAuth = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "100vh",

        backgroundColor: "#111827",
        padding: 4,
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        sx={{ scale: "3", width: "fit-content" }}
      >
        {/* <img className="icon w-1/4" src="../../src/assets/icon.png" alt="" /> */}

        <Icon />

        {/* <CircularProgress color="error" /> */}
      </Grid>
    </Grid>
  );
};

export default CheckingAuth;
