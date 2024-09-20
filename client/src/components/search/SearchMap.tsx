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

function SearchMap() {
  const markerImgSrc = ''; // 스프라이트 이미지
  const imgSize = { width: 22, height: 26 };
  const spriteSize = { width: 36, height: 98 };

  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_K_JAVASCRIPT_KEY,
  });
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (error) {
      console.error('ReactKakaoMapSDK 로드 중 오류 발생:', error);
    }
  }, [error, selectedCategory]);

  return (
    <SearchMapStyle>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Map
            center={{ lat: 37.56729298121172, lng: 126.98014624989 }} // 초기 위치
            style={{ width: '600px', height: '600px' }} // 지도 크기 설정
            level={6} // 지도 확대 레벨
          >
            <MapTypeControl position={'TOPRIGHT'} />
            <ZoomControl position={'RIGHT'} />
            <MapMarker
              position={{
                lat: 37.56729298121172,
                lng: 126.98014624989,
              }}
              image={{
                src: markerImgSrc,
                size: imgSize,
                options: {
                  spriteSize: spriteSize,
                },
              }}
            />
          </Map>
          {/* 지도 위에 표시될 마커 카테고리 */}
          <div className="category">
            <ul>
              <li id="allPlace" onClick={() => setSelectedCategory('all')}>
                <span className="ico_comm ico_all"></span>
                전체
              </li>
              <li
                id="onlyHospital"
                onClick={() => setSelectedCategory('hospital')}
              >
                <span className="ico_comm ico_hospital"></span>
                병원
              </li>
              <li
                id="onlyPharmacy"
                onClick={() => setSelectedCategory('pharmacy')}
              >
                <span className="ico_comm ico_pharmacy"></span>
                약국
              </li>
            </ul>
          </div>
        </div>
      )}
    </SearchMapStyle>
  );
}

const SearchMapStyle = styled.div``;

export default SearchMap;
