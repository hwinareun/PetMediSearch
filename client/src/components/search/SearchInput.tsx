import styled from 'styled-components';
import Input from '../common/Input';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function SearchInput({ onChange, onKeyDown }: Props) {
  return (
    <SearchInputStyle
      id="keywordSearch"
      type="text"
      size="medium"
      value=""
      placeholder="검색어를 입력해주세요"
      onChange={onChange}
      onKeyDown={onKeyDown}
    ></SearchInputStyle>
  );
}

const SearchInputStyle = styled(Input).attrs<Props>((props) => ({
  onChange: props.onChange,
  onKeyDown: props.onKeyDown,
}))``;

export default SearchInput;
