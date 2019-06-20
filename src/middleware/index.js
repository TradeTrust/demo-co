import { flowRight } from "lodash";

export const withMiddleware = (state, dispatch) => (...middlewares) =>
  flowRight(...middlewares.map(mf => mf(state)))(dispatch);

export const logger1 = state => next => action => {
  console.log("Middleware logger1 logs before dispatch", state, action);
  next(action);
};

export const logger2 = state => next => action => {
  next(action);
  console.log("Middleware logger2 logs after dispatch", state, action);
};
