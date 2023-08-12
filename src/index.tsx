async function run() {
    const reactIm = import('react')
    const reactDomClientIm = import('react-dom/client')
    const mainIm = import('./main')

    const { default: React } = await reactIm
    const { createRoot } = await reactDomClientIm
    const { default: Main } = await mainIm

    const rootElement = document.createElement('div')
    const root = createRoot(rootElement)
    root.render(<Main />)

    const loading = document.getElementById('loading')
    loading?.parentElement?.removeChild(loading)

    document.body.insertBefore(rootElement, document.body.firstChild)
}

run()
