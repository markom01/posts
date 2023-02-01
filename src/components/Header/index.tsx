import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Header() {
  return (
    <AppBar sx={{ width: "100%" }} position="static" component="header">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Posts
        </Typography>
        {/* <Button color="inherit">Add</Button> */}
      </Toolbar>
    </AppBar>
  );
}
