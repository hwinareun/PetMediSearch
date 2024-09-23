import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlaceData, PlaceState } from '../../types/place.type';

const initialState: PlaceState = {
  data: [], // 장소 전체 데이터
  searchPlaceResults: [], // 장소 검색 결과
  searchPlaceItem: '', // 검색하려는 장소명
};

const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<PlaceData[]>) {
      state.data = action.payload;
    },
    setSearchPlaceItem(state, action: PayloadAction<string>) {
      state.searchPlaceItem = action.payload;
      state.searchPlaceResults = [];
    },
    setSearchPlaceResults(state, action: PayloadAction<PlaceData[]>) {
      state.searchPlaceResults = action.payload;
    },
  },
});

export const { setData, setSearchPlaceItem, setSearchPlaceResults } =
  placeSlice.actions;
export const placeReducer = placeSlice.reducer;
