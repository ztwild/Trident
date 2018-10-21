import { createStore, combineReducers } from 'redux';
// import createSagaMiddleware from 'redux-saga'

import chat from '../chatPage/chatReducer';



// const sagaMiddleware = createSagaMiddleware();

export default createStore(
  combineReducers({
    chat,
  }),
  // applyMiddleware(sagaMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// sagaMiddleware.run(mySaga);