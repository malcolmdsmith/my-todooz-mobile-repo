import axios from "axios";
import * as actions from "../api";
import { baseUrl } from "../../config/settings";

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    //console.info("action...", action.type);
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, onSuccess, onError } = action.payload;
    next(action);

    const token = getState().entities.auth.token;

    let response;
    try {
      if (token === "") {
        response = await axios.request({
          url: baseUrl + url,
          method,
          data,
        });
      } else {
        response = await axios.request({
          url: baseUrl + url,
          method,
          data,
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      dispatch(actions.apiCallSuccess(response.data));
      let respData = null;
      if (method === "delete") respData = data;
      else respData = response.data;

      if (onSuccess) dispatch({ type: onSuccess, payload: respData });
      //console.info("onSuccess...", onSuccess);
    } catch (error) {
      //console.info("error....", error.response, url);
      dispatch(actions.apiCallFailed(error.response.data.message));
      if (onError)
        dispatch({ type: onError, payload: error.response.data.message });
    }
  };

export default api;
