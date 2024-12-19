import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router';
import {Header} from 'src/copmonents/Header/Header';
import {Footer} from 'src/copmonents/Footer/Footer';
import {StyleRouter} from 'src/copmonents/Router/Router.styled';
import {routesConfig} from './routes.config';

export const Router = () => {
    return (
        <BrowserRouter>
            <Header/>
            <StyleRouter>
                <Routes>
                    {routesConfig.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element}/>))}
                </Routes>
            </StyleRouter>
            <Footer/>
        </BrowserRouter>
    );
};
