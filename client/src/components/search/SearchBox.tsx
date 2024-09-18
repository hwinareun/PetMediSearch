import styled from 'styled-components';

const searchPlace = {
  allPlace: '전체',
  onlyHospital: '병원',
  onlyPharmacy: '약국',
};

function SearchBox() {
  const onChange = () => {};
  const onKeyEnter = () => {};

  return (
    <SearchBoxStyle>
      <h1>SearchBox</h1>
      <input
        type="text"
        placeholder={`${searchPlace}(으)로 검색합니다.`}
        onChange={onChange}
        onKeyDown={onKeyEnter}
      />
    </SearchBoxStyle>
  );
}

const SearchBoxStyle = styled.div``;

export default SearchBox;
