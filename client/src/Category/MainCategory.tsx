import styled from 'styled-components';

export default function MainCategory({
  category,
  setCategory,
}: {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
  const setCat = async (cat: string) => {
    setCategory(cat);
  };

  return (
    <CategoryContainer>
      <CategoryBt
        onClick={() => setCat('a')}
        style={{
          color: category === 'a' ? '#333' : '#d0d0d0',
        }}
      >
        a
      </CategoryBt>
      <CategoryBt
        onClick={() => setCat('b')}
        style={{
          color: category === 'b' ? '#333' : '#d0d0d0',
        }}
      >
        b
      </CategoryBt>
      <CategoryBt
        onClick={() => setCat('c')}
        style={{
          color: category === 'c' ? '#333' : '#d0d0d0',
        }}
      >
        c
      </CategoryBt>
    </CategoryContainer>
  );
}

const CategoryContainer = styled.div``;

const CategoryBt = styled.div``;
