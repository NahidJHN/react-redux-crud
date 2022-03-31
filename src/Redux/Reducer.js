import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		user: localStorage.getItem("users")
			? JSON.parse(localStorage.getItem("users"))
			: [],
		pending: false,
		error: {
			status: false,
			message: "",
		},
	},
	reducers: {
		pending: (state) => {
			state.pending = true;
		},
		addUser: (state, { payload }) => {
			state.user.push(payload);
			state.pending = false;
			localStorage.setItem("users", JSON.stringify(state.user));
		},
		error: (state, { payload }) => {
			state.pending = false;
			state.error.message = payload.message;
			state.error.status = true;
		},
		deleteUsr: (state, { payload }) => {
			let updatedUser = state.user.filter((usr) => usr.id !== payload.id);
			state.user = updatedUser;
			localStorage.setItem("users", JSON.stringify(updatedUser));
		},
		editPending: (state) => {
			state.pending=true;
		},
		editUser: (state, { payload }) => {
			console.log(payload)
			let editUser = state.user.filter((usr) => usr.id !== payload.id);
			let updatedState = [...editUser, payload]
			state.user = updatedState
			localStorage.setItem("users", JSON.stringify(updatedState));
			
			state.pending=false

		},
	},
});

export const { loadUser, pending, error, addUser, deleteUsr,editPending,editUser } =
	userSlice.actions;
export default userSlice.reducer;
