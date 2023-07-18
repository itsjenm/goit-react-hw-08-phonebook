// import { configureStore } from '@reduxjs/toolkit';
// import contactsReducer from './Contacts/slice';
// import userSlice from './Users/userSlice';
// const store = configureStore({
//   reducer: {
//     data: contactsReducer,
//     user: userSlice,
//   },
// });

// // configureStore({
// //   reducer: rootReducer
// // })

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer from './Contacts/slice';
import userReducer from './Users/userSlice'
import { contactsApi } from './Contacts/contactsApi';
import { filterSlice } from './Contacts/filterSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    user: persistReducer(authPersistConfig, userReducer),
    data: contactsReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter: filterSlice.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(contactsApi.middleware);
  },
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);