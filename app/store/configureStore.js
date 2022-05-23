import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import api from "./middleware/api";
import toast from "./middleware/toast";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["entities/auth"],
  //blacklist: ["projects"],
};

export default function () {
  const persistedReducer = persistReducer(persistConfig, reducer);

  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: { ignoreActions: ["persist/PERSIST"] },
      })
        .concat(logger)
        .concat(api)
        .concat(toast),
  });
}
