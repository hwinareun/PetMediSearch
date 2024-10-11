import { useRef, useState, useMemo, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CreateCategory from '../Category/CreateCategory';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(['all']); //카테고리
  const quillRef = useRef<ReactQuill>(null);

  const handleCategory = (e: any) => {
    const checkCat = category.includes(e.target.value);
    if (checkCat) {
      setCategory(category.filter((prev: any) => prev !== e.target.value));
    } else {
      setCategory((prev: any) => [...prev, e.target.value]);
    }
  };

  const newPost = {
    title,
    content,
    category,
    create_at: Date.now(),
  };

  const formSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (title.length === 0) {
      alert('제목을 입력해주세요');
    } else if (content.length === 0) {
      alert('내용을 입력해 주세요');
    } else {
      if (window.confirm('게시글을 등록하시겠습니까?')) {
        axios
          .post('http://localhost:8080/api/posts', newPost)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .then((res) => {
            alert('게시글이 등록되었습니다.');
            navigate('/posts');
          })

          .catch(function (error) {
            console.log(error);
          });
      } else {
        return false;
      }
    }
  };

  const formCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (window.confirm('게시글 작성을 취소하시겠습니까?')) {
      navigate('/posts');
    } else {
      return false;
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            { align: [] },
          ],
          ['link', 'image'],
        ],
      },
    }),
    []
  );
  const formats = [
    'size',
    'color',
    'background',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];
  useEffect(() => {
    axios.get('http://localhost:8080/api/post').then((response) => {
      setCategory(response.data);
    });
  }, []);

  return (
    <StyledAddPageWrapper>
      <form>
        <CreateCategory
          category={category}
          setCategory={setCategory}
          handleCategory={handleCategory}
        />
        <Title>
          <label htmlFor="title">제목 : </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
          ></input>
        </Title>
        <ReactQuill
          style={{ width: '100%', height: '500px' }}
          ref={quillRef}
          value={content}
          modules={modules}
          formats={formats}
          onChange={setContent}
          theme="snow"
          placeholder="내용을 입력해주세요."
        />
      </form>
      <StyledButtonWrapper>
        <button onClick={formSubmit}>등록</button>
        <button onClick={formCancel}>취소</button>
      </StyledButtonWrapper>
    </StyledAddPageWrapper>
  );
};
export default CreatePost;

const Title = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  height: 30px;
  #title {
    width: 88%;
    height: 30px;
  }
`;

const StyledButtonWrapper = styled.div`
  float: right;
  margin-top: 80px;
`;

const StyledAddPageWrapper = styled.div`
  margin-top: 50px;
`;
