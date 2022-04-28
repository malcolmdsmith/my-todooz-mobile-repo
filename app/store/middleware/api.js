import axios from "axios";
import * as actions from "../api";
import { baseUrl } from "../../config/settings";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    //console.info("action...", action.type);
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, onSuccess, onError } = action.payload;
    console.info("url...", url, method, data);
    next(action);

    // const result = await axios.request({
    //   url: baseUrl + "/projects",
    //   method: "post",
    //   data: { project_name: "Test8", owner_id: 2 },
    // });
    // console.info("result axios...", result.data);
    // console.info("axios test 2...", result.data);

    try {
      const response = await axios.request({
        url: baseUrl + url,
        method,
        data,
      });
      dispatch(actions.apiCallSuccess(response.data));
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      console.info("error.message...", error);
      dispatch(actions.apiCallFailed(error.message));
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

export default api;
