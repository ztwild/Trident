import { createStore, combineReducers, applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga'

import chat from '../chatPage/chatReducer';
import connection from '../serverConnection/connectionReducer';

// const sagaMiddleware = createSagaMiddleware();

const watcher = store => next => action => {
  debugger;
  console.log(store.getState());
  console.log(action);
  debugger;
  next(action);
}

export default createStore(
  combineReducers({
    chat,
    connection,
  }),
  applyMiddleware(watcher),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// sagaMiddleware.run(mySaga);