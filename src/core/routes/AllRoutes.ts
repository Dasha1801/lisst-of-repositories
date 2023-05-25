export interface IRouteItem {
  path: string;
  name: string;
}

const baseRoutes = {
  root: {
    path: '/',
    name: 'Root',
  },
  repositories: {
    path: 'repositories',
    name: 'List repositories',
  },
  repositoryId: {
    path: ':repositoryId',
    name: 'Detail repository',
  },
};

type TAllRoutes = {
  [key in keyof typeof routes]: IRouteItem;
};

const routes = {
  ...baseRoutes,
};

export const AllRoutes: TAllRoutes = routes;
