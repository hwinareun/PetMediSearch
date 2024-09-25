import { FaX } from 'react-icons/fa6';
import styled from 'styled-components';
import { PlaceData } from '../../../types/place.type';

interface Props {
  onClick: (markerId: number) => void;
  place: PlaceData;
}

function SearchMapOverlay({ onClick, place }: Props) {
  return (
    <SearchMapOverlayStyle>
      <div className="overlayWrap">
        <div className="info">
          <div className="title">{place.bplcnm}</div>
          <FaX className="closebttn" onClick={() => onClick(place.id)} />
        </div>
        <div className="address">
          <div className="rdnwhladdr">
            {place.rdnwhladdr ? (
              place.rdnwhladdr
            ) : (
              <div className="notPrepared">준비되지 않은 정보입니다</div>
            )}
          </div>
          <div className="sitewhladdr">
            {place.sitewhladdr ? (
              place.sitewhladdr
            ) : (
              <div className="notPrepared">준비되지 않은 정보입니다</div>
            )}
          </div>
        </div>
        <div className="tel">
          {place.sitetel ? (
            place.sitetel
          ) : (
            <div className="notPrepared">준비되지 않은 정보입니다</div>
          )}
        </div>
      </div>
    </SearchMapOverlayStyle>
  );
}

const SearchMapOverlayStyle = styled.div`
  position: absolute;
  bottom: 80px;
  left: -100px;
  cursor: default;

  .overlayWrap {
    border-radius: 16px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    position: relative;
    border-radius: 16px;
    width: 200px;
    white-space: normal;

    .info {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      align-items: center;
      gap: 10px;
      .title {
        font-size: 14px;
        font-weight: bold;
        padding-top: 5px;
      }
      .closebttn {
        cursor: pointer;
        font-size: 12px;
        color: #d9d9d9;
      }
      .closebttn:hover {
        color: black;
      }
    }

    .address {
      padding: 0 10px 5px;
      font-size: 7px;
      .sitewhladdr {
        font-size: 6px;
        color: #464646;
      }
    }

    .tel {
      background-color: #d9d9d9;
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;
      padding: 5px;
      padding-left: 10px;
      font-size: 10px;
    }

    .notPrepared {
      font-size: 6px;
      color: #a0a0a0;
    }
  }
  .overlayWrap:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 21px solid transparent;
    border-top-color: #d9d9d9;
    border-bottom: 0;
    margin-left: -21px;
    margin-bottom: -15px;
  }
`;

export default SearchMapOverlay;
