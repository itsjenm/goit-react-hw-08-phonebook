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
import authReducer from './Users/userSlice';
import { filterReducer } from './Contacts/filterSlice';
import contactsReducer from './Contacts/slice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    contacts: contactsReducer,
    // [contactsApi.reducerPath]: contactsApi.reducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
