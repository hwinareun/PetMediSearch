import { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Category() {
  const [categorypost, setCategoryPost] = useState({
    category: [],
  });
  // const { id } = useParams();
  const getPost = async () => {
    const res = await axios.get('http://localhost:8080/category');
    setCategoryPost(res.data);
  };
  useEffect(() => {
    getPost();
  }, []);

  return (
    <Container>
      {categorypost.category.map((item: string) => {
        // 카테고리가 all이면 버튼보이지않게
        if (item === 'a') {
          return;
        } else {
          return (
            // eslint-disable-next-line react/jsx-key
            <Bar>
              {item === 'b'
                ? 'b'
                : item === 'c'
                  ? 'c'
                  : item === 'd'
                    ? 'd'
                    : item === 'e'
                      ? 'e'
                      : item === 'f'
                        ? 'f'
                        : ''}
            </Bar>
          );
        }
      })}
    </Container>
  );
}

const Container = styled.div``;

const Bar = styled.div``;
