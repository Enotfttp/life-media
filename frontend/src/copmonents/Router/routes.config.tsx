import React from 'react';
import {RouteObject} from 'react-router';
import {Main, PersonalAccount, Basket, Chat, ChatAdmin} from 'src/pages';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <Main />
  },
  {
    path: '/personal-account/:id',
    element: <PersonalAccount />
  },
  {
    path: '/chats/:id',
    element: <Chat />
  },
  {
    path: '/chatsAdmin/:id',
    element: <ChatAdmin />
  },
  {
    path: '/basket/:id',
    element: <Basket />
  }
];
