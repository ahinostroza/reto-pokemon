import { combineReducers } from 'redux'

import { reducer as pokemon } from './pokemon/reducer'

const rootReducer = combineReducers({
    pokemon
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer