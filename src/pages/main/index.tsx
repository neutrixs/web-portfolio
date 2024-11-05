import React, { useEffect, useRef, useState } from 'react'
import Introduction from './introduction'
import About from './about'
import Showcase from '../showcase/showcase'
import styles from './index.module.scss'
import arrow from '../../img/arrow.svg'
import { ScrollableContext } from '../../context'

export default function MainPage() {
    const isTouchDevice = 'ontouchstart' in document.documentElement
    const [parent, setParent] = useState<HTMLDivElement | null>(null)
    const [parentHeight, setParentHeight] = useState(0)
    const [scrollable, setScrollable] = useState(true)

    const scrollableRef = useRef<boolean>(true)
    useEffect(() => {
        scrollableRef.current = scrollable
    }, [scrollable])

    const [currentSlide, setCurrentSlide] = useState(0)
    const slides: React.ReactNode[] = [
        <Introduction key="introduction" inView={currentSlide == 0} height={parentHeight} />,
        <About key="about" inView={currentSlide == 1} height={parentHeight} />,
        <Showcase key="showcase" inView={currentSlide == 2} height={parentHeight} />,
    ]

    useEffect(() => {
        const override = parseFloat(localStorage.getItem('_PAGE_NUMBER_OVERRIDE_') ?? '')
        if (!isNaN(override)) {
            setCurrentSlide(override)
        }
    }, [])

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
        if (!scrollableRef.current) return

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
                {currentSlide != 0 ? (
                    <div onClick={() => scroll(-1)} className={styles.arrow}>
                        <img alt={'go to the previous slide'} src={arrow} />
                    </div>
                ) : (
                    <div />
                )}

                {currentSlide < slides.length - 1 ? (
                    <div onClick={() => scroll(1)} className={styles.arrow}>
                        <img alt={'go to the next slide'} src={arrow} />
                    </div>
                ) : (
                    <div />
                )}
            </div>
        )
    }

    return (
        <ScrollableContext.Provider value={{ scrollable, setScrollable }}>
            <div className={styles.fixedContainer + ' noselect'} ref={setParent}>
                <div
                    className={styles.slidesContainer}
                    style={{ transform: `translateY(${-currentSlide * parentHeight}px)` }}
                >
                    {slides}
                </div>
                {isTouchDevice && scrollable ? scrollAccessibility() : null}
            </div>
        </ScrollableContext.Provider>
    )
}
