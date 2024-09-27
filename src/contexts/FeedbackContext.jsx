import React, { createContext, useState, useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState({ message: '', severity: 'success' });
  const [open, setOpen] = useState(false);

  const showFeedback = (message, severity = 'success') => {
    setFeedback({ message, severity });
    setOpen(true);
  };

  const hideFeedback = () => {
    setOpen(false);
  };

  return (
    <FeedbackContext.Provider value={{ showFeedback }}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={hideFeedback}>
        <Alert onClose={hideFeedback} severity={feedback.severity} sx={{ width: '100%' }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => useContext(FeedbackContext);