import createSagaMiddleware from 'redux-saga'
import { compose } from 'redux'
import rootReducer from './modules'
import rootSaga from './sagas'

import { configureStore } from '@reduxjs/toolkit'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

export const sagaMiddleware = createSagaMiddleware()
export const sagas = rootSaga

const createStore = () => {
    const middleware=(getDefaultMiddleware: any) => [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];
  
    return {
      ...configureStore({
        reducer: rootReducer,
        middleware,
        devTools: process.env.NODE_ENV === 'development'
      })
    };
  };
  
  type ConfiguredStore = ReturnType<typeof createStore>
  type StoreGetState = ConfiguredStore["getState"]
  export type RootState = ReturnType<StoreGetState>
  export type AppDispatch = ConfiguredStore["dispatch"]
  
  export default createStore