import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import chatReducer from './slices/chatSlice'

// Root Reducer
const rootReducer = combineReducers({
  chat: chatReducer
})

// Redux Persist Config
const persistConfig = {
  key: 'root',
  storage,
  timeout: 10000 // 10 seconds
}

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // Disable serializable check if you're sure all state is serializable
    })
})

// Persistor
export const persistor = persistStore(store)

// Types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
