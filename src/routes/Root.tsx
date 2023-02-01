import { Container, Stack } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Posts from "../../types";
import Header from "../components/Header";
import Context from "../Context";

export default function Root() {
  const state = useState<Posts>();

  return (
    <Stack sx={{ mb: 3 }} spacing={3} alignItems="center">
      <Header />
      <Container
        component="main"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Context.Provider value={state}>
          <Outlet />
        </Context.Provider>
      </Container>
    </Stack>
  );
}
