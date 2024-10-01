import styled from 'styled-components';
import MarkerSprites from '../../../assets/images/MarkerSprites.png';
interface Props {
  onClick: (value: React.SetStateAction<string>) => void;
}
function SearchMapCategory({ onClick }: Props) {
  return (
    <SearchMapCategoryStyle>
      <ul>
        <li id="allPlace" onClick={() => onClick('allPlace')}>
          <span className="marker_comm marker_all"></span>
          <p>전체</p>
        </li>
        <li id="onlyHospital" onClick={() => onClick('onlyHospital')}>
          <span className="marker_comm marker_hospital"></span>
          <p>병원</p>
        </li>
        <li id="onlyPharmacy" onClick={() => onClick('onlyPharmacy')}>
          <span className="marker_comm marker_pharmacy"></span>
          <p>약국</p>
        </li>
      </ul>
    </SearchMapCategoryStyle>
  );
}
const SearchMapCategoryStyle = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 0 10px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 10; /* 지도 위에 표시되도록 z-index 설정 */
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: space-around;
    font-size: 15px;
    gap: 5px;
    li {
      display: flex;
      flex-direction: column;
      text-align: center;
      cursor: pointer;
      padding: 5px 10px;
      gap: 5px;
      border-radius: 8px;
      box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.5);
      p {
        margin: 0;
      }
    }
    li:hover {
      background-color: #e3e3e3; /* 원하는 색상으로 변경 */
      color: #575757;
    }
  }
  .is_selected {
    font-weight: bold;
    background-color: #575757;
    color: white;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    p {
      border-bottom: 1px solid #e3e3e3;
    }
  }
  .marker_comm {
    // 마커 공통 스타일
    display: inline-block;
    width: 25px;
    height: 30px; /* 아이콘 높이 */
    background-image: url(${MarkerSprites}); /* 스프라이트 이미지 경로 */
    background-size: 75px 30px; /* 스프라이트 이미지 전체 크기 */
  }
  .marker_pharmacy {
    background-position: -25px 0px; /* 약국 아이콘의 위치 */
  }
  .marker_hospital {
    background-position: 0px 0px; /* 병원 아이콘의 위치 */
  }
  .marker_all {
    background-position: -50px 0px; /* 전체 아이콘의 위치 */
  }
`;
export default SearchMapCategory;
