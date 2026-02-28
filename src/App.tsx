import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { TripsPage } from './pages/TripsPage';
import { TimelinePage } from './pages/TimelinePage';

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'trips', element: <TripsPage /> },
      { path: 'timeline', element: <TimelinePage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
