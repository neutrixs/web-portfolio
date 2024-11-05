import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './pages/main'

function Main() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    )
}

;(async function run() {
    const rootElement = document.createElement('div')
    const root = createRoot(rootElement)
    rootElement.classList.add('app')
    root.render(
        <StrictMode>
            <Main />
        </StrictMode>,
    )

    const loading = document.getElementById('loading')
    loading?.parentElement?.removeChild(loading)

    document.body.insertBefore(rootElement, document.body.firstChild)
})()
