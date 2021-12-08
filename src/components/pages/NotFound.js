import React from "react";
import { useTheme } from "@mui/material/styles";
import background from "../../assets/error_page.jpg";

const NotFound = () => {
  const theme = useTheme();
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <div style={{ margin: "15rem", color: theme.palette.primary.main }}>
        <h1>Not Found</h1>
        <p className='lead'>The page you are looking for does not exist...</p>
      </div>
    </div>
  );
};

export default NotFound;
