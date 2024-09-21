import styled from 'styled-components';
import Button from '../common/Button';

interface Props {
  onClick: () => void;
}

function SearchButton({ onClick }: Props) {
  return (
    <SearchButtonStyle size="medium" scheme="normal" onClick={onClick}>
      검색
    </SearchButtonStyle>
  );
}

const SearchButtonStyle = styled(Button)``;

export default SearchButton;
