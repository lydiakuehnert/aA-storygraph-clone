// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const CREATE_READ = "songs/READ_BOOK";
const DELETE_READ = "songs/UNREAD_BOOK";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const createReadAction = (user) => {
	return {
		type: CREATE_READ,
		user
	}
}

const deleteReadAction = (user) => {
	return {
		type: DELETE_READ,
		user
	}
}

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (payload) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		// headers: { "Content-Type": "application/json" },
		// body: JSON.stringify(payload),
		body: payload
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const createReadThunk = (bookId) => async dispatch => {
	try {
		const res = await fetch(`/api/read/${bookId}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		})
		if (res.ok) {
			const user = await res.json()
			dispatch(createReadAction(user))
			return user
		} else {
			const data = await res.json()
			return data
		}
	} catch (e) {
		console.error("an error has occured:", e)
		return null
	}
}

export const deleteReadThunk = (bookId) => async dispatch => {
	try {
		const res = await fetch(`/api/read/${bookId}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		})

		if (res.ok) {
			const user = await res.json()
			dispatch(deleteReadAction(user))
			return user
		}
	} catch (e) {
		const data = await e.json()
		return data
	}
}

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case CREATE_READ:
			newState = { ...state, user: {} }
			newState.user = action.user
			return newState;
		case DELETE_READ:
			newState = { ...state, user: {} }
			newState.user = action.user
			return newState;
		default:
			return state;
	}
}