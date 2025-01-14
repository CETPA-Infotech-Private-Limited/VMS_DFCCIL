import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import personalDetailsReducer from '../features/visitor/personalDetailsSlice';
import employeeReducer from '../features/employee/employeeSlice';

const rootReducer = combineReducers({
  personalDetails: personalDetailsReducer,
  employee: employeeReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['personalDetails', 'employee'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
