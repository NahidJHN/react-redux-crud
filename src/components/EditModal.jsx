import React, { useEffect, useState } from 'react';
import { Dialog, Typography, TextField, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import SendIcon from "@mui/icons-material/Send"
import Alert from "./Alert";
import { editUserFunc } from '../Redux/apiCalls/apiCalls';


const fromStyle = {
    boxStyle: {
        width: "70%",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        padding: "2em",
        height: "80%"
    },
};


const EditModal = ({ openModal, onCloseModal, userId, setOpen }) => {
    const dispatch = useDispatch()
    const pending = useSelector(state => state.userState.pending)
    const error = useSelector(state => state.userState.error)
    const user = useSelector(state => state.userState.user.find(usr => usr.id === userId))
    const [editValue, setEditValue] = useState({
        name: "",
        email: ""
    })

    useEffect(() => {
        setEditValue({
            name: user?.name,
            email: user?.email
        })
    }, [user?.email, user?.name])


    const handleOnChange = (e) => {
        setEditValue(
            { [e.target.name]: e.target.value }
        )
    }

    const editHandler = (e, id) => {
        e.preventDefault()
        editUserFunc(id, dispatch, editValue)
        setTimeout(() => {
            setOpen(false)
        }, 2000)

    }

    return (
        <Dialog
            sx={{ padding: "5em" }}
            open={openModal}
            onClose={onCloseModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Box sx={fromStyle.boxStyle} component="div">
                <Typography variant="h2" color="initial">
                    Edit User
                </Typography>
                <form onSubmit={(e) => editHandler(e, userId)}>
                    <TextField
                        label="Name"
                        sx={{ margin: "10px" }}
                        fullWidth
                        type="text"
                        variant="standard"
                        name="name"
                        value={editValue.name}
                        onChange={handleOnChange}
                    />
                    <TextField
                        label="Email"
                        sx={{ margin: "10px" }}
                        fullWidth
                        type="email"
                        variant="standard"
                        name="email"
                        value={editValue.email}
                        onChange={handleOnChange}


                    />

                    <LoadingButton
                        type="submit"
                        color="primary"
                        loading={pending}
                        loadingPosition="end"
                        variant="contained"
                        endIcon={<SendIcon />}
                    >
                        Edit User
                    </LoadingButton>
                </form>
            </Box>
            {error.status && <Alert isOpen={true} message={error.message} />}

        </Dialog>
    );
};

export default EditModal;