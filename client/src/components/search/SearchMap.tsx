import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MapTypeControl,
  useKakaoLoader,
  ZoomControl,
} from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import Loading from '../common/Loading';
import { useEffect, useState } from 'react';
import markerImgSrc from '../../assets/images/marker/MarkerSprites.png';
import { PlaceData } from '../../types/place.type';
import proj4 from 'proj4';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setTransformedResults } from '../../store/slices/placeSlice';
import React from 'react';
import SearchMapOverlay from './map/SearchMapOverlay';

proj4.defs(
  'EPSG:5181',
  '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs'
);

function SearchMap() {
  const dispatch = useDispatch();
  const { searchPlaceResults, transformedResults } = useSelector(
    (state: RootState) => state.place
  );
  const [selectedCategory, setSelectedCategory] = useState('allPlace');
  const [openedMarkers, setOpenedMarkers] = useState<number[]>([]);
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_K_JAVASCRIPT_KEY,
  });

  const imgSize = { width: 40, height: 60 }; // 마커 이미지 크기
  const spriteSize = { width: 40, height: 179.5 }; // 전체 스프라이트 이미지 크기

  const hospitalOrigin = { x: 0, y: 120 }; // 스프라이트 이미지 내에서 이미지 위치
  const pharmacyOrigin = { x: 0, y: 0 };

  const isValidLatLng = (lat: number, lng: number) => {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  };

  const handleMarkerClick = (markerId: number) => {
    if (openedMarkers.includes(markerId)) {
      setOpenedMarkers(openedMarkers.filter((id) => id !== markerId));
    } else {
      setOpenedMarkers([...openedMarkers, markerId]);
    }
  };

  useEffect(() => {
    setOpenedMarkers([]);

    const transformed = searchPlaceResults
      .map((place) => {
        const x = Number(place.x);
        const y = Number(place.y);

        if (!isNaN(x) && !isNaN(y) && isFinite(x) && isFinite(y)) {
          try {
            let [lng, lat] = proj4('EPSG:5181', 'EPSG:4326', [x, y]);

            // 변환된 좌표 값을 소수점 10자리로 반올림
            lat = parseFloat(lat.toFixed(10));
            lng = parseFloat(lng.toFixed(10));

            if (isValidLatLng(lat, lng)) {
              return {
                ...place,
                x: lat, // 변환된 위도
                y: lng, // 변환된 경도
              };
            } else {
              console.warn(
                `Invalid converted coordinates for place ID ${place.id}:`,
                lat,
                lng
              );
              return null;
            }
          } catch (projError) {
            console.error(
              `Projection error for place ID ${place.id}:`,
              projError
            );
            return null;
          }
        } else {
          console.warn(`Invalid coordinates for place ID: ${place.id}`, place);
          return null;
        }
      })
      .filter((place) => place !== null); // null 값 필터링

    dispatch(setTransformedResults(transformed as PlaceData[]));
  }, [dispatch, error, searchPlaceResults]);

  useEffect(() => {
    const allPlace = document.getElementById('allPlace');
    const onlyHospital = document.getElementById('onlyHospital');
    const onlyPharmacy = document.getElementById('onlyPharmacy');

    if (allPlace && onlyHospital && onlyPharmacy) {
      if (selectedCategory === 'allPlace') {
        allPlace.className = 'is_selected';
        onlyHospital.className = '';
        onlyPharmacy.className = '';
      } else if (selectedCategory === 'onlyHospital') {
        allPlace.className = '';
        onlyHospital.className = 'is_selected';
        onlyPharmacy.className = '';
      } else if (selectedCategory === 'onlyPharmacy') {
        allPlace.className = '';
        onlyHospital.className = '';
        onlyPharmacy.className = 'is_selected';
      }
    }
  }, [error, selectedCategory]);

  // 카테고리에 따라 필터링된 장소 데이터를 반환
  const filteredResults = transformedResults
    .filter((place) => {
      if (selectedCategory === 'allPlace') return true;
      if (selectedCategory === 'onlyHospital') return place.type === '병원';
      if (selectedCategory === 'onlyPharmacy') return place.type === '약국';
      return false;
    })
    .filter((place) => isValidLatLng(place.x as number, place.y as number));

  return (
    <SearchMapStyle>
      {loading ? (
        <Loading />
      ) : (
        <div id="mapwrap">
          <Map
            center={{ lat: 37.56729298121172, lng: 126.98014624989 }} // 초기 위치
            style={{ width: '350px', height: '500px' }} // 지도 크기 설정
            level={7} // 지도 확대 레벨
          >
            <MapTypeControl position={'TOPRIGHT'} />
            <ZoomControl position={'RIGHT'} />
            {/* 검색 결과 마커 표시 */}
            {filteredResults.map((place) => (
              <React.Fragment key={`place-${place.id}`}>
                <MapMarker
                  position={{ lat: place.x as number, lng: place.y as number }}
                  image={{
                    src: markerImgSrc,
                    size: imgSize,
                    options: {
                      spriteSize: spriteSize,
                      spriteOrigin:
                        place.type === '병원' ? hospitalOrigin : pharmacyOrigin,
                    },
                  }}
                  onClick={() => handleMarkerClick(place.id)}
                />
                {/* 마커 클릭 시 나타나는 오버레이 */}
                {openedMarkers.includes(place.id) && (
                  <CustomOverlayMap
                    position={{
                      lat: place.x as number,
                      lng: place.y as number,
                    }}
                  >
                    <SearchMapOverlay
                      onClick={handleMarkerClick}
                      place={place}
                    />
                  </CustomOverlayMap>
                )}
              </React.Fragment>
            ))}
          </Map>
          {/* 지도 위에 표시될 마커 카테고리 */}
          <div className="category">
            <ul>
              <li id="allPlace" onClick={() => setSelectedCategory('allPlace')}>
                <span className="marker_comm marker_all"></span>
                전체
              </li>
              <li
                id="onlyHospital"
                onClick={() => setSelectedCategory('onlyHospital')}
              >
                <span className="marker_comm marker_hospital"></span>
                병원
              </li>
              <li
                id="onlyPharmacy"
                onClick={() => setSelectedCategory('onlyPharmacy')}
              >
                <span className="marker_comm marker_pharmacy"></span>
                약국
              </li>
            </ul>
          </div>
        </div>
      )}
    </SearchMapStyle>
  );
}

const SearchMapStyle = styled.div`
  position: relative;
  padding-top: 20px;
  padding-bottom: 50px;

  #mapwrap {
    position: relative;
  }

  .result {
    font-size: 8px;
  }

  .category {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 0 10px;
    border-radius: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 10; /* 지도 위에 표시되도록 z-index 설정 */
    ul {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: space-around;
      font-size: 10px;
      li {
        display: flex;
        flex-direction: column;
        text-align: center;
        cursor: pointer;
        padding-top: 5px;
        padding-left: 10px;
        padding-right: 10px;
        gap: 5px;
        border-radius: 8px;
        border: solid #eeeeee;
      }
    }
    .is_selected {
      font-weight: bold;
      background-color: #e2e2e2;
      border: solid #333;
    }
  }

  .marker_comm {
    // 마커 공통 스타일
    display: inline-block;
    width: 20px; /* 아이콘 너비 */
    height: 30px; /* 아이콘 높이 */
    background-image: url(${markerImgSrc}); /* 스프라이트 이미지 경로 */
    background-size: 20px 89.75px; /* 스프라이트 이미지 전체 크기 */
  }

  .marker_pharmacy {
    background-position: 0px 0px; /* 약국 아이콘의 위치 */
  }

  .marker_hospital {
    background-position: 0px -60px; /* 병원 아이콘의 위치 */
  }

  .marker_all {
    background-position: 0px -30px; /* 전체 아이콘의 위치 */
  }
`;

export default SearchMap;
