import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Category } from '../types/post.type';
import { useNavigate } from 'react-router-dom';

function Categories() {
  const [category, setCategory] = useState<Category[]>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:8080/category');
      setCategory(response.data);
    };
    fetchData();
  }, []);

  const handleCategoryClick = (id) => {
    navigate(`/posts?categoryId=${id}`); // 해당 카테고리 ID로 URL 변경
  };

  return (
    <>
      {category?.map((item) => (
        <button
          key={item.category_id}
          onClick={() => handleCategoryClick(item.category_id)}
        >
          {item.category_name}
        </button>
      ))}
    </>
  );
}

export default Categories;
