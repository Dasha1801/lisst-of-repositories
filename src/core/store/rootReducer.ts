import { combineReducers } from '@reduxjs/toolkit';
import { infoRepositoryReducer } from './infoRepository/infoRepositorySlice';
import { SystemReducer } from './system/systemSlice';

export const rootReducer = combineReducers({
  system: SystemReducer,
  infoRepository: infoRepositoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
