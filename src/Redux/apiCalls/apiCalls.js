import axios from "axios";
import {
	addUser,
	error,
	pending,
	deleteUsr,
	editPending,
	editUser,
} from "../Reducer";

const baseURI = axios.create({
	baseURL: "https://62443ed53da3ac772b0d35d5.mockapi.io",
});

//add user
export const createUser = (data, dispatch) => {
	dispatch(pending());
	baseURI
		.post("/users", data)
		.then((res) => {
			dispatch(addUser(res.data));
		})
		.catch((err) => {
			dispatch(error({ message: "Error occured" }));
		});
};

//delete user

export const deleteUser = (id, dispatch) => {
	baseURI.delete("/users/" + id).then((res) => {
		dispatch(deleteUsr({ id }));
		console.log(res);
	});
};

//edit user

export const editUserFunc = (id, dispatch, data) => {
    console.log(data)
	dispatch(editPending());
	baseURI.put("/users/" + id, data).then((res) => {
		dispatch(editUser(res.data))
	}).catch(err => {
		dispatch(error({ message: "Error occured" }))
	})
	
};
