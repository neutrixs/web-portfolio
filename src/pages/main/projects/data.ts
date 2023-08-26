import spotifinfo from '../../../img/spotifinfo.webp'

export interface project {
    name: string
    description: string
    url: string
    imgPath: string
}

export type projectsList = project[]
export const projects: projectsList = [
    {
        name: 'Spotifinfo',
        description:
            'Stats for spotify, basically. See your now playing, recently played, top tracks or artists over the last month, 6 months, or all time.',
        url: 'https://spotifinfo.neutrixs.my.id',
        imgPath: spotifinfo,
    },
]
