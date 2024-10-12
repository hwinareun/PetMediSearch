import { authReducer } from '../slices/authSlice';
import { placeReducer } from '../slices/placeSlice';
import { reviewReducer } from '../slices/reviewSlice';

const reducer = {
  auth: authReducer,
  place: placeReducer,
  review: reviewReducer,
};

export default reducer;
