import { Box, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createUser } from "../Redux/apiCalls/apiCalls"
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from "@mui/icons-material/Send"
import Alert from "./Alert";

const fromStyle = {
    boxStyle: {
        width: "50%",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        marginTop: "2em",
        border: "2px solid #ddd",
        padding: "2em"
    },
};

function UserForm() {
    const diapatch = useDispatch()
    const pending = useSelector(state => state.userState.pending)
    const error = useSelector(state => state.userState.error)

    const { register, handleSubmit } = useForm();

    const addUserHandler = (data) => {
        createUser(data, diapatch)
    }

    return (
        <>
            <Box sx={fromStyle.boxStyle} component="div">
                <Typography variant="h2" color="initial">
                    Add User
                </Typography>
                <form onSubmit={handleSubmit(addUserHandler)}>
                    <TextField
                        label="Name"
                        sx={{ margin: "10px" }}
                        fullWidth
                        type="text"
                        variant="standard"
                        {...register("name")}
                    />
                    <TextField
                        label="Email"
                        sx={{ margin: "10px" }}
                        fullWidth
                        type="email"
                        variant="standard"
                        {...register("email")}
                    />

                    <LoadingButton
                        type="submit"
                        color="primary"
                        loading={pending}
                        loadingPosition="end"
                        variant="contained"
                        endIcon={<SendIcon />}
                    >
                        Add user
                    </LoadingButton>
                </form>
            </Box>
            {error.status && <Alert isOpen={true} message={error.message} />}
        </>
    );
}

export default UserForm;
