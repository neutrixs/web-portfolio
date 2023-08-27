import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../store'
import style from './style.module.scss'

interface props {
    image: string
    url: string
    zindex: number
    index: number
    currentIndex: number
}

const DEF_ROTATE_X = '5deg'

function getRandomRotation() {
    return Math.random() * 30 - 15
}

export default function Card({ image, url, zindex, index, currentIndex }: props) {
    const [randomRotation, setRandomRotation] = useState(getRandomRotation())
    const [rotateX, setRotateX] = useState(DEF_ROTATE_X)
    const [scale, setScale] = useState(1)
    const [open, setOpen] = useState(false)
    const [popState, setPopState] = useState(false)
    const pop = popState || open

    const [cardELement, setCardElement] = useState<HTMLDivElement | null>(null)
    const [buttonElement, setButtonElement] = useState<HTMLDivElement | null>(null)
    const [containerElement, setContainerElement] = useState<HTMLDivElement | null>(null)

    const [fixed, setFixed] = useState(false)
    const [rect, setRect] = useState(new DOMRect())

    const { parentHeight } = useContext(Context)

    const locked = useRef(false)

    useEffect(() => {
        if (!cardELement || !buttonElement) return

        function enter() {
            locked.current = true
            setPopState(true)
        }

        function leave() {
            if (locked.current) {
                locked.current = false
                return
            }
            setPopState(false)
            setOpen(false)
        }

        function open() {
            locked.current = true
            setOpen(true)
        }

        cardELement.addEventListener('click', enter)
        buttonElement.addEventListener('click', open)
        document.body.addEventListener('click', leave)

        return () => {
            cardELement.removeEventListener('click', enter)
            buttonElement.removeEventListener('click', open)
            document.body.removeEventListener('click', leave)
        }
    }, [cardELement])

    useEffect(() => {
        if (pop && index != currentIndex) return setPopState(false)

        setRotateX(pop ? '0' : DEF_ROTATE_X)
        setRandomRotation(pop ? 0 : getRandomRotation())
        setScale(pop ? 1.5 : 1)
    }, [pop])

    useEffect(() => {
        if (!containerElement) return

        if (pop) {
            setTimeout(() => {
                setRect(containerElement.getBoundingClientRect())
                setFixed(true)
            }, 200)
        } else {
            setFixed(false)
        }
    }, [pop, containerElement])

    useEffect(() => {
        console.log(open)
    }, [open])

    const fixedStyleData: React.CSSProperties = {
        position: 'fixed',
        left: open ? '50%' : rect.left,
        //TODO: implement detection of the current slide number,
        // currently, it's just assuming it's the second page
        // which may cause problem later on
        top: open ? `calc(${parentHeight}px + 50vh)` : rect.top + parentHeight,
        transform: open ? 'translate(-50%, -50%)' : 'translate(0,0)',
        transitionProperty: 'top, left, transform',
        transitionDuration: open ? '200ms' : '0',
    }

    function mouseEvent(popVal: boolean) {
        if (index != currentIndex) return
        setPopState(popVal)
    }

    return (
        <div
            className={style.cardContainer}
            style={{ zIndex: zindex, ...(fixed ? fixedStyleData : {}) }}
            ref={setContainerElement}
        >
            <div
                className={style.card}
                style={{
                    transform: `rotateX(${rotateX}) rotate(${randomRotation}deg) scale(${scale})`,
                }}
                ref={setCardElement}
                onMouseEnter={() => mouseEvent(true)}
                onMouseLeave={() => mouseEvent(false)}
            >
                <div className={style.roundedContainer}>
                    <img src={image} />
                    <div className={style.open} style={{ opacity: pop ? 1 : 0 }}>
                        <div className={style.openButton} ref={setButtonElement}>
                            Open
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
