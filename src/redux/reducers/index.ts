import { combineReducers } from 'redux';
import { blogReducer } from './blog';
import { bondsReducer } from './bonds';

const rootReducer = combineReducers({
  blog: blogReducer,
  bonds: bondsReducer,
  // Add other reducers here
});

export default rootReducer;