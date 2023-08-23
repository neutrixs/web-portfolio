import React, { useEffect, useRef, useState } from 'react'
import Introduction from './introduction'
import styles from './style.module.scss'
import arrow from '../../icons/arrow.svg'

export default function MainPage() {
    const isTouchDevice = 'ontouchstart' in document.documentElement
    const [currentSlide, setCurrentSlide] = useState(0)
    const slides = useRef<React.ReactNode[]>([<Introduction key="introduction" />])

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

    function scrollAccessibility() {
        return (
            <div className={styles.scrollAccessibility}>
                <div onClick={() => scroll(-1)}>
                    <img src={arrow} />
                </div>
                <div onClick={() => scroll(1)}>
                    <img src={arrow} />
                </div>
            </div>
        )
    }

    return (
        <div className={styles.fixedContainer}>
            <div
                className={styles.slidesContainer}
                style={{ transform: `translateY(${-currentSlide * 100}%)` }}
            >
                {slides.current}
            </div>
            {isTouchDevice ? scrollAccessibility() : null}
        </div>
    )
}
