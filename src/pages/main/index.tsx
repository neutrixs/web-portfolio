import React, { useEffect, useState } from 'react'
import Introduction from './introduction'
import Projects from './projects'
import styles from './style.module.scss'
import arrow from '../../icons/arrow.svg'

export default function MainPage() {
    const isTouchDevice = 'ontouchstart' in document.documentElement
    const [parent, setParent] = useState<HTMLDivElement | null>(null)
    const [parentHeight, setParentHeight] = useState(0)

    const [currentSlide, setCurrentSlide] = useState(0)
    const slides: React.ReactNode[] = [
        <Introduction key="introduction" height={parentHeight} />,
        <Projects key="projects" inView={currentSlide == 1} height={parentHeight} />,
    ]

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

    useEffect(() => {
        if (!parent) return

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setParentHeight(entry.contentRect.height)
            }
        })
        observer.observe(parent)
        return () => observer.unobserve(parent)
    }, [parent])

    function scroll(inc: number) {
        setCurrentSlide((current) => {
            const newSlidePos = current + inc
            if (newSlidePos >= 0 && newSlidePos < slides.length) {
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
        <div className={styles.fixedContainer} ref={setParent}>
            <div
                className={styles.slidesContainer}
                style={{ transform: `translateY(${-currentSlide * parentHeight}px)` }}
            >
                {slides}
            </div>
            {isTouchDevice ? scrollAccessibility() : null}
        </div>
    )
}
