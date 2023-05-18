import * as React from "react";
import logo from "../images/logo.jpg"
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  makeStyles,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: "auto", 
    color: "#1c449c",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  
  
}));


function Header() {
  const classes = useStyles();
  
  return (
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
          <img src={logo} alt="Logo" width={100} height={100} />
            <Typography
              variant="h4"
              className={classes.title}
            >
              Currency Data
            </Typography>
      
          </Toolbar>
        </Container>
      </AppBar>
  );
}

export default Header;


