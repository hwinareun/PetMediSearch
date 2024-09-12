import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Layout from './layout/Layoout';
import Error from './components/common/Error';
import Posts from './pages/Posts';
import LoginRedirect from './pages/LoginRedirect';

const routeList = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/posts',
    element: <Posts />,
  },
  {
    path: '/oauth/kakao',
    element: <LoginRedirect />,
  },
];

const router = createBrowserRouter(
  routeList.map((item) => {
    if (item.path === '/') return item;
    return {
      ...item,
      element: <Layout>{item.element}</Layout>,
      errorElement: <Error />,
    };
  })
);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
