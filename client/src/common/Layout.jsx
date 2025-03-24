import React from "react";
import { Link, Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

const Layout = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            🏠 אפליקציית ניהול משימות
          </Typography>
          <Button color="inherit" component={Link} to="/">דף הבית</Button>
          <Button color="inherit" component={Link} to="/Todos">✅ משימות</Button>
          <Button color="inherit" component={Link} to="/Photos">📷 תמונות</Button>
          <Button color="inherit" component={Link} to="/Posts">📝 פוסטים</Button>
          <Button color="inherit" component={Link} to="/Users">👤 משתמשים</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
