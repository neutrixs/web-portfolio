import React, { createContext } from 'react'

interface scrollableContext {
    scrollable: boolean
    setScrollable: React.Dispatch<React.SetStateAction<boolean>> | null
}

export const ScrollableContext = createContext<scrollableContext>({
    scrollable: false,
    setScrollable: null,
})
