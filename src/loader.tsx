;(async function run() {
    const reactRouterDOMImport = import('react-router-dom')
    const reactImport = import('react')
    const reactDomImport = import('react-dom/client')
    const mainImport = import('./main')

    await reactRouterDOMImport
    const { default: React, StrictMode } = await reactImport
    const { createRoot } = await reactDomImport
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
