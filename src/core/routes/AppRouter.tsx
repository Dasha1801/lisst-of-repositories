import React from 'react';
import {
  Navigate,
  RouteObject,
  useLocation,
  useRoutes,
} from 'react-router-dom';
import { AllRoutes } from './AllRoutes';
import RepositoriesPage from '../../pages/repositoriesPage/RepositoriesPage';
import DetailInfoRepository from '../../pages/detailInfoRepository/DetailInfoRepository';

interface IRedirect {
  path?: string;
}

export function AppRedirect({ path = '/' }: IRedirect) {
  const location = useLocation();
  return <Navigate to={path} state={{ from: location }} replace />;
}

const baseRoutes: RouteObject = {
  path: AllRoutes.root.path,
  children: [
    {
      index: true,
      element: <Navigate to={AllRoutes.repositories.path} replace />,
    },
    { path: AllRoutes.repositories.path, element: <RepositoriesPage /> },
    {
      path: AllRoutes.repositories.path,
      children: [
        { path: AllRoutes.repositoryId.path, element: <DetailInfoRepository/> },
      ],
    },
    { path: '*', element: <AppRedirect path={AllRoutes.repositories.path} /> },
  ],
};

export const AppRouter = React.memo(() => {
  return useRoutes([baseRoutes]);
});
