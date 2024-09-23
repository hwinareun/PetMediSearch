export interface PlaceData {
  placeId: number;
  placeName: string; // 장소명
  placeType: string; // 장소종류(병원 | 약국)
  placeLocation: string; // 주소지
  contact: string; // 전화번호
  latitude: number; // 위도
  longitude: number; // 경도
}

export interface PlaceState {
  data: PlaceData[]; //  장소 전체 데이터
  searchPlaceResults: PlaceData[]; // 장소 검색 결과
  searchPlaceItem: string; // 검색하려는 장소명
}
