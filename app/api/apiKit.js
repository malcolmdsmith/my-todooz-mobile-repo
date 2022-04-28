import axios from "axios";
import { logOut } from "../api/logOut";
import baseURL from "../config/settings";

let APIKit = {};
// Create axios client, pre-configured with baseURL
// let APIKit = axios.create({
//   baseURL,
//   timeout: 10000,
// });

// APIKit.interceptors.response.use(
//   (response) => {
//     //console.info("response...", response);
//     return response.data;
//   },
//   (error) => {
//     if (error.response.status) {
//       if (error.response.status === 401) {
//         //place your reentry code
//         logOut();
//         window.location = "/SignIn";
//       }
//     }
//     return error;
//   }
// );

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = (token) => {
  delete axios.defaults.headers.common["Authorization"];
  const stripped = token.replace(/\"/g, "");
  APIKit.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${stripped}`;
    return config;
  });
};

export default APIKit;
