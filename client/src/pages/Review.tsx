import styled from 'styled-components';

function Review() {
  return (
    <ReviewStyle>
      <h1>Review</h1>
    </ReviewStyle>
  );
}

const ReviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 30px 30px 30px;
`;

export default Review;
