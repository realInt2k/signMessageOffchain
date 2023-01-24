import { IconButton, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  newSnackBarReason,
  selectSnackBarState,
  setSnackBarState,
} from "@store/snackBarSlice";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
type CustomSnackBarProps = {
  reason: string;
};
export const CustomSnackBar = ({ reason }: CustomSnackBarProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(newSnackBarReason(reason));
  }, []);
  const snackBarState = useSelector(selectSnackBarState);
  const handleClose = (
    event: React.SyntheticEvent | Event,
    eventReason?: string
  ) => {
    if (eventReason === "clickaway") {
      return;
    }
    dispatch(setSnackBarState({ reason, presence: false }));
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <Snackbar
      open={snackBarState.open[reason]}
      autoHideDuration={6000}
      onClose={handleClose}
      message={reason}
      action={action}
    />
  );
};
