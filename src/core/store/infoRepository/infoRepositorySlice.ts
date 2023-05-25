import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IInfoRepository,
  initInfoRepositoryState,
} from './infoRepositoryState';

export const infoRepositorySlice = createSlice({
  name: 'infoRepository',
  initialState: initInfoRepositoryState,
  reducers: {
    addDetailInfo: (state, { payload }: PayloadAction<IInfoRepository>) => {
      state.info = payload;
    },
  },
});

export const { addDetailInfo } = infoRepositorySlice.actions;
export const { reducer: infoRepositoryReducer } = infoRepositorySlice;
