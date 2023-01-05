import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useAuth } from "./../context/auth"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import MenuIcon from "@mui/icons-material/Menu";

export default function ButtonAppBar()
{
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    isAuthenticated()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleHome = () => navigate("/")
  const handleSignin = () => navigate("/signin")
  const handleMyPage = () => navigate("/mypage")
  const handleAdmin = () => navigate("/admin")
  const handleLogOut = () => logout()

  console.log(user)

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={handleHome}>
              Home
            </Button>
            {user === null && (
              <Button color="inherit" onClick={handleSignin}>
                Login
              </Button>
            )}
            {user && (
              <div>
                <Button color="inherit" onClick={handleMyPage}>
                  Mypage
                </Button>
                <Button onClick={handleLogOut} color="inherit">
                  Logout
                </Button>
              </div>
            )}
            {user && user.admin && (
              <div>
                <Button color="inherit" onClick={handleAdmin}>
                  Admin
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    );
}
