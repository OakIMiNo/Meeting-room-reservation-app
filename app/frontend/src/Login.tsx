import React from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";

const Login: React.FC = () => {
  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 2, width: "20ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField id="outlined-basic" label="Login" variant="outlined" />

          <TextField
            error
            id="outlined-error-helper-text"
            label="Error"
            defaultValue="email"
            helperText="Incorrect entry."
          />
        </div>
      </Box>
    </>
  );
};

export default Login;
