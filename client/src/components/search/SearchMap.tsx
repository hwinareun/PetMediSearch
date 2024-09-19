import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import Loading from '../common/Loading';
import { useEffect } from 'react';

function SearchMap() {
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_K_JAVASCRIPT_KEY,
  });

  useEffect(() => {
    if (error) {
      console.error('ReactKakaoMapSDK 로드 중 오류 발생:', error);
    }
  }, [error]);

  return (
    <SearchMapStyle>
      {loading ? (
        <Loading />
      ) : (
        <Map
          center={{ lat: 33.450701, lng: 126.570667 }} // 초기 위치
          style={{ width: '600px', height: '600px' }} // 지도 크기 설정
          level={3} // 지도 확대 레벨
        />
      )}
    </SearchMapStyle>
  );
}

const SearchMapStyle = styled.div``;

export default SearchMap;
