import React from 'react';
import {RouteObject} from 'react-router';
import {Main, PersonalAccount} from 'src/pages';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <Main />
  },
  {
    path: '/personal-account',
    element: <PersonalAccount />
  },
  {
    path: '/chat',
    element: null
  }
];
