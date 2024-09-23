import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlaceState } from '../../types/place.type';

const initialState: PlaceState = {
  data: [], // 장소 전체 데이터
  searchPlaceResults: [], // 장소 검색 결과
  searchInputPlace: '', // 검색하려는 장소명
};

const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setSearchInputPlace(state, action: PayloadAction<string>) {
      state.searchInputPlace = action.payload;
      state.searchPlaceResults = [];
    },
  },
});

export const { setSearchInputPlace } = placeSlice.actions;
export const placeReducer = placeSlice.reducer;
