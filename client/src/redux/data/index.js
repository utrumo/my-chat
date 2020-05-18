import * as Operation from './actions';
import * as Selector from './selectors';

export { Operation, Selector };
// eslint-plugin-import bug:
// https://github.com/benmosher/eslint-plugin-import/issues/1753
// export * as Operation from './actions';
// export * as Selector from './selectors';
export { reducer } from './reducers';
