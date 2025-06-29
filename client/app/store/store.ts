import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import modeReducer from "./modeSlice";
import groupOrderReducer from "./groupOrderSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import saplingReducer from "./saplingSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  mode: modeReducer,
  groupOrder: groupOrderReducer,
  cart: cartReducer,
  user : userReducer,
  sapling: saplingReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
