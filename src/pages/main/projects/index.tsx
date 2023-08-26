import React, { useEffect, useState } from 'react'
import Card from './card'
import { projects } from './data'
import style from './style.module.scss'

interface props {
    inView: boolean
    height: number
}

export default function Projects({ inView, height }: props) {
    const [titleShow, setTitleShow] = useState(' ')
    const [projectsShow, setProjectsShow] = useState(' ')
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        setTimeout(() => setTitleShow(' ' + (inView ? style.show : '')), 500)
        setTimeout(() => setProjectsShow(' ' + (inView ? style.show : '')), 1000)
    }, [inView])

    function renderCards(): React.ReactNode[] {
        const data: React.ReactNode[] = projects.map((project, i) => {
            return (
                <Card
                    key={project.name}
                    image={project.imgPath}
                    url={project.url}
                    zindex={projects.length - i}
                />
            )
        })

        return data
    }

    return (
        <div className={style.container} style={{ height: height.toString() + 'px' }}>
            <p className={style.title + titleShow}>My Projects</p>
            <div className={style.projectsContainer}>
                <div className={style.projects + projectsShow}>
                    <div className={style.deck}>{renderCards()}</div>
                    <div className={style.information}>
                        <span className={style.infoTitle}>{projects[current].name}</span>
                        <span className={style.description}>{projects[current].description}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
