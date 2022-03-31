import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = ({ isOpen, message }) => {
    return (
        <Snackbar open={isOpen} autoHideDuration={6000}>
            <MuiAlert severity="error" sx={{ width: '100%' }}>
                {message}
            </MuiAlert>
        </Snackbar>
    );
};

export default Alert;