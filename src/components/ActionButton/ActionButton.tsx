import { Button } from "@mui/material";
import React from "react";
import { ActionButtonProps } from "./ActionButtonProps.types";

const ActionButton: React.FC<ActionButtonProps> = ({ handleTime, label }) => {
  return (
    <Button
      onClick={handleTime}
      variant="contained"
      sx={{ mt: 3, mb: 2, marginLeft: "10px" }}
    >
      {label}
    </Button>
  );
};

export default ActionButton;
