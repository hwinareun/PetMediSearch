import { httpClient } from './http';

interface PlaceParams {
  placeLocation: string; // 주소지
  placeName: string; // 장소 상호명
}

export const fetchPlaces = async (params: PlaceParams) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.append(key, value);
    }
  });

  const url = `/search?${query.toString()}`;

  try {
    const response = await httpClient.get(url);
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch drugs with query: ${query.toString()}`,
      error
    );
    throw new Error('Failed to fetch drugs');
  }
};
