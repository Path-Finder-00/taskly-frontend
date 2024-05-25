import React, { createContext, useContext, useState } from 'react';

const SnackbarContext = createContext(null);

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

export const SnackbarProvider = ({ children }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');

    const openSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const closeSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ snackbarOpen, snackbarMessage, snackbarSeverity, openSnackbar, closeSnackbar }}>
            {children}
        </SnackbarContext.Provider>
    );
};
