import {
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

interface Props {
  results: PlaceData[]; // 상위에서 전달받은 검색 결과
}

function SearchMap({ results }: Props) {
  const imgSize = { width: 40, height: 60 }; // 마커 이미지 크기
  const spriteSize = { width: 40, height: 179.5 }; // 전체 스프라이트 이미지 크기

  const hospitalOrigin = { x: 0, y: 120 }; // 스프라이트 이미지 내에서 이미지 위치
  const pharmacyOrigin = { x: 0, y: 0 };

  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_K_JAVASCRIPT_KEY,
  });
  const [selectedCategory, setSelectedCategory] = useState('allPlace');

  useEffect(() => {
    if (error) {
      console.error('ReactKakaoMapSDK 로드 중 오류 발생:', error);
    }

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
  const filteredResults = results.filter((place) => {
    if (selectedCategory === 'allPlace') return true;
    if (selectedCategory === 'onlyHospital') return place.type === '병원';
    if (selectedCategory === 'onlyPharmacy') return place.type === '약국';
  });

  return (
    <SearchMapStyle>
      {loading ? (
        <Loading />
      ) : (
        <div id="mapwrap">
          {results.length > 0 ? (
            <ul>
              {results.map((place) => (
                <li key={place.id}>
                  {place.bplcnm} - {place.x}, {place.y}
                </li>
              ))}
            </ul>
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
          {/* {results.length === 0 && <p>검색 결과가 없습니다.</p>} */}
          <Map
            center={{ lat: 37.56729298121172, lng: 126.98014624989 }} // 초기 위치
            style={{ width: '350px', height: '500px' }} // 지도 크기 설정
            level={6} // 지도 확대 레벨
          >
            <MapTypeControl position={'TOPRIGHT'} />
            <ZoomControl position={'RIGHT'} />
            {/* 검색 결과 마커 표시 */}
            {filteredResults.map((place, index) => (
              <MapMarker
                key={`place-${place.x}-${place.y}-${index}`}
                position={{ lat: place.x, lng: place.y }}
                image={{
                  src: markerImgSrc,
                  size: imgSize,
                  options: {
                    spriteSize: spriteSize,
                    spriteOrigin:
                      place.type === '병원' ? hospitalOrigin : pharmacyOrigin,
                  },
                }}
              />
            ))}
            <MapMarker
              position={{
                lat: 0,
                lng: 0,
              }}
            />
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
