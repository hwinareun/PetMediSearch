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

function SearchMap() {
  const imgSize = { width: 40, height: 60 }; // 마커 이미지 크기
  const spriteSize = { width: 40, height: 179.5 }; // 전체 스프라이트 이미지 크기

  const hospitalOrigin = { x: 0, y: 120 }; // 스프라이트 이미지 내에서 이미지 위치
  const pharmacyOrigin = { x: 0, y: 0 };

  // 병원 마커가 표시될 임시 좌표 배열
  const hospitalPositions = [
    { lat: 37.571368746820454, lng: 126.95816222481089 },
    { lat: 37.57627704662319, lng: 126.98886064023323 },
    { lat: 37.561787726748726, lng: 126.97917433750797 },
  ];

  // 약국 마커가 표시될 임시 좌표 배열
  const pharmacyPositions = [
    { lat: 37.58125105449183, lng: 126.9989131608954 },
    { lat: 37.558545674285554, lng: 126.99157955346834 },
    { lat: 37.565677924078386, lng: 126.96948429058867 },
  ];

  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_K_JAVASCRIPT_KEY,
  });
  const [selectedCategory, setSelectedCategory] = useState('allPlace');
  const [result, setResult] = useState('');

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

  return (
    <SearchMapStyle>
      {loading ? (
        <Loading />
      ) : (
        <div id="mapwrap">
          <p id="result">{result}</p>
          <Map
            center={{ lat: 37.56729298121172, lng: 126.98014624989 }} // 초기 위치
            style={{ width: '600px', height: '600px' }} // 지도 크기 설정
            level={6} // 지도 확대 레벨
            onClick={(_, mouseEvent) => {
              const latlng = mouseEvent.latLng;
              setResult(
                `클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`
              );
            }}
          >
            <MapTypeControl position={'TOPRIGHT'} />
            <ZoomControl position={'RIGHT'} />
            {selectedCategory === 'allPlace' &&
              hospitalPositions
                .concat(pharmacyPositions) // 병원과 약국 배열 합친 새 배열 반환
                .map((position, index) => (
                  <MapMarker
                    key={`all-${position.lat}-${position.lng}-${index}`}
                    position={position}
                    image={{
                      src: markerImgSrc,
                      size: imgSize,
                      options: {
                        spriteSize: spriteSize,
                        spriteOrigin:
                          index < hospitalPositions.length
                            ? hospitalOrigin
                            : pharmacyOrigin,
                      },
                    }}
                  />
                ))}
            {selectedCategory === 'onlyHospital' &&
              hospitalPositions.map((position) => (
                <MapMarker
                  key={`hospital-${position.lat},${position.lng}`}
                  position={position}
                  image={{
                    src: markerImgSrc,
                    size: imgSize,
                    options: {
                      spriteSize: spriteSize,
                      spriteOrigin: hospitalOrigin,
                    },
                  }}
                />
              ))}
            {selectedCategory === 'onlyPharmacy' &&
              pharmacyPositions.map((position) => (
                <MapMarker
                  key={`pharmacy-${position.lat},${position.lng}`}
                  position={position}
                  image={{
                    src: markerImgSrc,
                    size: imgSize,
                    options: {
                      spriteSize: spriteSize,
                      spriteOrigin: pharmacyOrigin,
                    },
                  }}
                />
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

  #mapwrap {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .category {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 10; /* 지도 위에 표시되도록 z-index 설정 */
    ul {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: space-around;
      li {
        display: flex;
        flex-direction: column;
        text-align: center;
        cursor: pointer;
        padding: 10px;
      }
    }
    .is_selected {
      font-weight: bold;
      border: 2px solid #333;
    }
  }

  .marker_comm {
    // 마커 공통 스타일
    display: inline-block;
    width: 40px; /* 아이콘 너비 */
    height: 60px; /* 아이콘 높이 */
    background-image: url(${markerImgSrc}); /* 스프라이트 이미지 경로 */
    background-size: 40px 179.5px; /* 스프라이트 이미지 전체 크기 */
  }

  .marker_pharmacy {
    background-position: 0px 0px; /* 약국 아이콘의 위치 */
  }

  .marker_hospital {
    background-position: 0px -120px; /* 병원 아이콘의 위치 */
  }

  .marker_all {
    background-position: 0px -60px; /* 전체 아이콘의 위치 */
  }
`;

export default SearchMap;
