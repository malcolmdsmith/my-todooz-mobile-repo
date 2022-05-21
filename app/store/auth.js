import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";
import jwtDecode from "jwt-decode";
import storage from "@react-native-async-storage/async-storage";

const tokenKey = "AuthToken";

const slice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: "",
    loading: false,
    lastFetch: null,
  },
  reducers: {
    authenticationRequested: (auth, action) => {
      auth.loading = true;
    },
    userAuthenticated: (auth, action) => {
      auth.token = action.payload.token;
      const jwt = jwtDecode(auth.token);
      auth.user = jwt.sub;
      auth.loading = false;
      auth.lastFetch = Date.now();
    },
    requestFailed: (auth, action) => {
      auth.loading = false;
    },
    userAddedRequested: (auth, action) => {
      auth.loading = true;
    },
    userAdded: (auth, action) => {
      auth.user = action.payload;
      auth.loading = false;
    },
    userRestored: (auth, action) => {
      auth.token = action.payload.token;
      const jwt = jwtDecode(auth.token);
      auth.user = jwt.sub;
      auth.loading = false;
      auth.lastFetch = Date.now();
    },
  },
});

export const {
  authenticationRequested,
  userAuthenticated,
  requestFailed,
  userAdded,
  userRestored,
} = slice.actions;
export default slice.reducer;

const auth_url = "/users";

//Action Creators
export const authenticateUser =
  (username, password) => (dispatch, getState) => {
    //const { lastFetch } = getState().entities.auth;
    //const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
    //if (diffInMinutes < 1) return;

    let url = `${auth_url}/authenticate`;
    //console.info(url);

    const result = dispatch(
      apiCallBegan({
        url,
        method: "post",
        data: { username: username, password: password },
        onSuccess: userAuthenticated.type,
        onError: requestFailed.type,
      })
    );
  };

export const addUser = (data) => (dispatch, getState) => {
  let url = `${auth_url}/register`;
  //console.info(url);

  const result = dispatch(
    apiCallBegan({
      url,
      method: "post",
      data: data,
      onSuccess: userAdded.type,
      onError: requestFailed.type,
    })
  );
  //return result;
};

export const restoreUser = () => async (dispatch, getState) => {
  try {
    const token = await storage.getItem(tokenKey);
    dispatch(userRestored(token));
  } catch (e) {
    dispatch(userRestored(null));
  }
};
