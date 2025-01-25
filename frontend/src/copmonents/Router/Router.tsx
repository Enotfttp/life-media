import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router';
import {Header} from 'src/copmonents/Header/Header';
import {Footer} from 'src/copmonents/Footer/Footer';
import {StyleRouter} from 'src/copmonents/Router/Router.styled';
import {routesConfig} from './routes.config';

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <StyleRouter>
        <Routes>
          {routesConfig.map((route, index) => {
            return (
              <>
                <Route key={index} path={route.path} element={route.element} />
                {route?.children?.map((child, index) => {
                  return (<Route key={index} path={child.path} element={child.element} />);
                })}
              </>
            );
          })}
        </Routes>
      </StyleRouter>
      <Footer />
    </BrowserRouter>
  );
};
