import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog as MuiDialog,
} from "@mui/material";
import React from "react";

const Dialog = ({ open, handleClose, title, children, onSubmit }) => {
  return (
    <MuiDialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "30px",
        },
      }}
    >
      <DialogTitle sx={{ fontSize: "2rem" }}>{title}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }} onSubmit={onSubmit}>
          {children}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="red">
          {title.toLowerCase().includes("picture") ? "Close" : "Cancel"}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
