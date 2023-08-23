import React, { useEffect, useRef, useState } from 'react'
import Introduction from './introduction'
import styles from './style.module.scss'

export default function MainPage() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const slides = useRef<React.ReactNode[]>([
        <Introduction key="introduction" />,
        <div key="dick" />,
    ])

    useEffect(() => {
        function wheel(event: WheelEvent) {
            if (!event.deltaY) return
            scroll(event.deltaY / Math.abs(event.deltaY))
        }

        function keydown(event: KeyboardEvent) {
            switch (event.code) {
                case 'ArrowUp':
                    scroll(-1)
                    break
                case 'ArrowDown':
                    scroll(1)
                    break
            }
        }

        document.addEventListener('wheel', wheel)
        document.addEventListener('keydown', keydown)

        return () => {
            document.removeEventListener('wheel', wheel)
            document.removeEventListener('keydown', keydown)
        }
    }, [])

    function scroll(inc: number) {
        setCurrentSlide((current) => {
            const newSlidePos = current + inc
            if (newSlidePos >= 0 && newSlidePos < slides.current.length) {
                return newSlidePos
            }
            return current
        })
    }

    return (
        <div className={styles.fixedContainer}>
            <div
                className={styles.slidesContainer}
                style={{ transform: `translateY(${-currentSlide * 100}%)` }}
            >
                {slides.current}
            </div>
        </div>
    )
}
