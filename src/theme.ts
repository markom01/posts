import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    mode: "dark",
  },
});

theme = responsiveFontSizes(theme);

export default theme;
