import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
;(async function run() {
    const mainImport = import('./main')
    const { default: Main } = await mainImport

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
