import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

function Star() {
  return (
    <StarStyle>
      <FaStar />
      <FaStar />
      <FaStar />
      <FaStar />
      <FaStar />
    </StarStyle>
  );
}

const StarStyle = styled.div``;

export default Star;
