export interface PlaceData {
  id: number;
  bplcnm: string; // 장소명
  type: string; // 장소종류(병원 | 약국)
  sitewhladdr: string; // 주소지
  rdnwhladdr: string; // 주소지(도로명)
  sitetel: string; // 전화번호
  x: number; // 위도
  y: number; // 경도
}

export interface PlaceState {
  data: PlaceData[]; //  장소 전체 데이터
  searchPlaceResults: PlaceData[]; // 장소 검색 결과
  searchInputPlace: string; // 검색하려는 장소명
}
