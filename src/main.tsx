import MainPage from './pages/main'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function Main() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    )
}
