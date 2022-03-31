import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button"
import { useDispatch, useSelector } from "react-redux"
import { deleteUser } from '../Redux/apiCalls/apiCalls';
import EditModal from "./EditModal";


const tableStyle = {
    containerStyle: {
        width: "55%",
        margin: "auto",
    },
    dataStyle: {
        fontSize: "1.5em"
    }
}

export default function DataTable() {
    const users = useSelector(state => state.userState.user)
    const dispatch = useDispatch()
    const [isOpen, setOpen] = useState(false)
    const [userId, setUserID] = useState("")

    const removeUsr = (id) => {
        deleteUser(id, dispatch)
    }

    const openModal = (id) => {
        setOpen(true)
        setUserID(id)
    }

    return (
        <>
            <Box sx={tableStyle.containerStyle} component="div">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={tableStyle.dataStyle}>Name</TableCell>
                                <TableCell sx={tableStyle.dataStyle} align="center">Email</TableCell>
                                <TableCell sx={tableStyle.dataStyle} align="center">Edit</TableCell>
                                <TableCell sx={tableStyle.dataStyle} align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users && users.map(user =>
                                <TableRow key={user.id}>
                                    <TableCell sx={tableStyle.dataStyle} align="center">{user.name}</TableCell>
                                    <TableCell sx={tableStyle.dataStyle} align="center">{user.email}</TableCell>
                                    <TableCell sx={tableStyle.dataStyle} align="center">
                                        <Button onClick={(e) => openModal(user.id)} variant="outlined" startIcon={<EditIcon />}>Edit</Button></TableCell>
                                    <TableCell sx={tableStyle.dataStyle} align="center">
                                        <Button onClick={() => removeUsr(user.id)} variant="outlined" startIcon={<DeleteIcon />}> Delete</Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <EditModal userId={userId} openModal={isOpen} setOpen={setOpen} onCloseModal={() => setOpen(false)} />
        </>
    );
}