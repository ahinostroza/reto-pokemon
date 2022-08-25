import { BrowserRouter, Route, Routes } from 'react-router-dom'

import MainLayout from '../../layout/Main'

import Detail from '../../pages/Detail'
import Home from '../../pages/Home'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/pokemon/:name' element={<Detail />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}