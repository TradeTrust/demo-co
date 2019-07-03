import { flowRight } from "lodash";

export const withMiddleware = (state, dispatch) => (...middlewares) =>
  flowRight(...middlewares.map(mf => mf(state)))(dispatch);
