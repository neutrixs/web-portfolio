export interface WordData {
    word: string
    time: number
}

export interface LineData {
    type: 'line'
    time: number
    words: WordData[]
}

export interface PauseData {
    type: 'pause'
    time: number
}

const transcriptData: (LineData | PauseData)[] = [
    { type: 'pause', time: 0 },
    { type: 'line', time: 106.878082, words: [{ word: 'Coloratura', time: 106.878082 }] },
    {
        type: 'line',
        time: 110.230686,
        words: [
            { word: 'We', time: 110.230686 },
            { word: 'fell', time: 110.431874 },
            { word: 'in', time: 110.671999 },
            { word: 'through', time: 111.316374 },
            { word: 'the', time: 111.759603 },
            { word: 'clouds', time: 111.960791 },
        ],
    },
    {
        type: 'line',
        time: 113.940124,
        words: [
            { word: 'And', time: 113.940124 },
            { word: 'everyone', time: 114.181582 },
            { word: 'before', time: 115.589853 },
            { word: 'us', time: 116.241499 },
            { word: 'is', time: 116.728707 },
            { word: 'there', time: 117.211624 },
            { word: 'welcoming', time: 117.85627 },
            { word: 'us', time: 118.983916 },
            { word: 'now', time: 119.467457 },
        ],
    },
    {
        type: 'line',
        time: 121.165041,
        words: [
            { word: "It's", time: 121.165041 },
            { word: 'the', time: 121.366728 },
            { word: 'end', time: 121.648686 },
            { word: 'of', time: 122.051166 },
            { word: 'death', time: 122.29277 },
            { word: 'and', time: 122.976686 },
            { word: 'doubt', time: 123.218186 },
        ],
    },
    {
        type: 'line',
        time: 124.914353,
        words: [
            { word: 'And', time: 124.914353 },
            { word: 'loneliness', time: 125.115811 },
            { word: 'is', time: 126.528082 },
            { word: 'out', time: 126.973061 },
        ],
    },
    { type: 'line', time: 129.156145, words: [{ word: 'Coloratura', time: 129.156145 }] },
    {
        type: 'line',
        time: 132.710561,
        words: [
            { word: 'The', time: 132.710561 },
            { word: 'place', time: 132.952041 },
            { word: 'we', time: 133.399624 },
            { word: 'dreamed', time: 133.80252 },
            { word: 'about', time: 134.327561 },
        ],
    },
    {
        type: 'line',
        time: 136.46702,
        words: [
            { word: 'The', time: 136.46702 },
            { word: 'melodies', time: 136.66827 },
            { word: 'inside', time: 137.835791 },
            { word: 'yourself', time: 138.600749 },
        ],
    },
    {
        type: 'line',
        time: 139.892311,
        words: [
            { word: 'And', time: 139.892311 },
            { word: 'love', time: 140.133686 },
            { word: 'come', time: 140.819957 },
            { word: 'pouring', time: 141.061624 },
            { word: 'out', time: 141.989561 },
        ],
    },
    {
        type: 'line',
        time: 143.683228,
        words: [
            { word: 'And', time: 143.683228 },
            { word: "everyone's", time: 143.933186 },
            { word: 'allowed', time: 145.54552 },
        ],
    },
    {
        type: 'line',
        time: 147.643061,
        words: [
            { word: "We're", time: 147.643061 },
            { word: 'feathered', time: 147.924978 },
            { word: 'by', time: 148.571582 },
            { word: 'the', time: 149.296978 },
            { word: 'crowd', time: 149.498166 },
        ],
    },
    { type: 'pause', time: 151.638916 },
    {
        type: 'line',
        time: 158.945478,
        words: [
            { word: 'And', time: 158.945478 },
            { word: 'up', time: 159.186811 },
            { word: 'there', time: 159.387957 },
            { word: 'in', time: 159.875228 },
            { word: 'the', time: 160.56452 },
            { word: 'heavens', time: 160.765853 },
        ],
    },
    {
        type: 'line',
        time: 161.900957,
        words: [
            { word: 'Galileo', time: 161.900957 },
            { word: 'and', time: 163.436061 },
            { word: 'those', time: 163.838624 },
            { word: 'pining', time: 164.281291 },
            { word: 'for', time: 165.128811 },
            { word: 'the', time: 165.853728 },
            { word: 'moon', time: 166.054957 },
        ],
    },
    {
        type: 'line',
        time: 168.796457,
        words: [
            { word: 'Know', time: 168.796457 },
            { word: "it's", time: 169.037853 },
            { word: 'a', time: 169.442561 },
            { word: 'slow', time: 169.684249 },
            { word: 'burn', time: 171.659999 },
        ],
    },
    {
        type: 'line',
        time: 173.000791,
        words: [
            { word: 'Through', time: 173.000791 },
            { word: 'Pioneer', time: 173.403249 },
            { word: 'and', time: 174.612832 },
            { word: 'Helix', time: 175.019936 },
        ],
    },
    {
        type: 'line',
        time: 176.148541,
        words: [
            { word: 'Oumuamua,', time: 176.148541 },
            { word: 'Heliopause,', time: 177.966666 },
            { word: 'and', time: 179.459478 },
            { word: 'Neptune', time: 179.902207 },
        ],
    },
    {
        type: 'line',
        time: 183.578103,
        words: [
            { word: "We're", time: 183.578103 },
            { word: 'a', time: 183.782207 },
            { word: 'slow', time: 183.983457 },
            { word: 'burning', time: 186.035853 },
            { word: 'tune', time: 187.815145 },
        ],
    },
    {
        type: 'line',
        time: 190.72427,
        words: [
            { word: 'But', time: 190.72427 },
            { word: "we'll", time: 190.926311 },
            { word: 'get', time: 191.167728 },
            { word: 'there', time: 193.018416 },
        ],
    },
    {
        type: 'line',
        time: 193.665916,
        words: [
            { word: 'So', time: 193.665916 },
            { word: 'for', time: 194.269811 },
            { word: 'now', time: 194.874082 },
        ],
    },
    {
        type: 'line',
        time: 197.629353,
        words: [
            { word: 'In', time: 197.629353 },
            { word: 'this', time: 197.870874 },
            { word: 'crazy', time: 198.318478 },
            { word: 'world,', time: 200.131728 },
            { word: 'I', time: 201.542707 },
            { word: 'do', time: 202.066499 },
        ],
    },
    {
        type: 'line',
        time: 208.012291,
        words: [
            { word: 'I', time: 208.012291 },
            { word: 'just', time: 208.214728 },
            { word: 'want', time: 208.576957 },
            { word: 'you', time: 209.622832 },
        ],
    },
    { type: 'pause', time: 210.91552 },
    {
        type: 'line',
        time: 222.990478,
        words: [
            { word: 'In', time: 222.990478 },
            { word: 'the', time: 223.15252 },
            { word: 'end,', time: 223.393936 },
            { word: "it's", time: 223.997707 },
            { word: 'all', time: 224.243478 },
            { word: 'about', time: 224.967791 },
        ],
    },
    {
        type: 'line',
        time: 226.780395,
        words: [
            { word: 'The', time: 226.780395 },
            { word: 'love', time: 226.981582 },
            { word: "you're", time: 227.629728 },
            { word: 'sending', time: 227.872436 },
            { word: 'out', time: 228.799895 },
        ],
    },
    { type: 'pause', time: 230.739082 },
    {
        type: 'line',
        time: 237.686166,
        words: [
            { word: 'And', time: 237.686166 },
            { word: 'up', time: 237.931791 },
            { word: 'there', time: 238.174186 },
            { word: 'in', time: 238.616832 },
            { word: 'the', time: 239.265999 },
            { word: 'heavens', time: 239.467186 },
        ],
    },
    {
        type: 'line',
        time: 240.635145,
        words: [
            { word: 'The', time: 240.635145 },
            { word: 'explorers', time: 240.877541 },
            { word: "who've", time: 242.165999 },
            { word: 'all', time: 242.608936 },
            { word: 'gathered', time: 243.094978 },
            { word: 'by', time: 243.941291 },
            { word: 'the', time: 244.667124 },
            { word: 'moon', time: 244.828082 },
        ],
    },
    {
        type: 'line',
        time: 247.779186,
        words: [
            { word: 'Saw', time: 247.779186 },
            { word: 'the', time: 248.222124 },
            { word: 'world', time: 248.463478 },
            { word: 'turn', time: 250.440291 },
        ],
    },
    {
        type: 'line',
        time: 251.811832,
        words: [
            { word: 'Through', time: 251.811832 },
            { word: 'Voyager,', time: 252.254624 },
            { word: 'Callisto,', time: 253.627999 },
            { word: 'Calliope', time: 254.997791 },
        ],
    },
    {
        type: 'line',
        time: 256.529624,
        words: [
            { word: 'Betelgeuse,', time: 256.529624 },
            { word: 'the', time: 258.14452 },
            { word: 'neon', time: 258.346436 },
            { word: 'moons', time: 259.391957 },
        ],
    },
    {
        type: 'line',
        time: 262.33727,
        words: [
            { word: "We're", time: 262.33727 },
            { word: 'a', time: 262.538478 },
            { word: 'slow', time: 262.784145 },
            { word: 'burning', time: 264.79802 },
            { word: 'tune', time: 266.582582 },
        ],
    },
    {
        type: 'line',
        time: 269.532582,
        words: [
            { word: 'But', time: 269.532582 },
            { word: "we'll", time: 269.737228 },
            { word: 'touch', time: 269.979041 },
            { word: 'down', time: 271.751791 },
            { word: 'soon', time: 272.397957 },
        ],
    },
    {
        type: 'line',
        time: 273.040416,
        words: [
            { word: 'So', time: 273.040416 },
            { word: 'will', time: 273.523436 },
            { word: 'you', time: 273.805082 },
        ],
    },
    {
        type: 'line',
        time: 276.22977,
        words: [
            { word: 'And', time: 276.22977 },
            { word: 'in', time: 276.471978 },
            { word: 'this', time: 276.713624 },
            { word: 'crazy', time: 277.116416 },
            { word: 'world,', time: 278.893291 },
            { word: 'I', time: 280.422186 },
            { word: 'do', time: 281.22752 },
        ],
    },
    {
        type: 'line',
        time: 286.808916,
        words: [
            { word: 'I', time: 286.808916 },
            { word: 'just', time: 287.010228 },
            { word: 'want', time: 287.374707 },
            { word: 'you', time: 288.342332 },
        ],
    },
    { type: 'pause', time: 289.267186 },
    {
        type: 'line',
        time: 424.786082,
        words: [
            { word: 'And', time: 424.786082 },
            { word: 'up', time: 425.027436 },
            { word: 'there', time: 425.26902 },
            { word: 'in', time: 425.713228 },
            { word: 'the', time: 426.32127 },
            { word: 'heavens', time: 426.562707 },
        ],
    },
    {
        type: 'line',
        time: 427.73302,
        words: [
            { word: 'Galileo', time: 427.73302 },
            { word: 'saw', time: 429.262832 },
            { word: 'reflections', time: 429.665624 },
            { word: 'of', time: 431.039645 },
            { word: 'us', time: 431.482145 },
            { word: 'too', time: 431.884353 },
        ],
    },
    {
        type: 'line',
        time: 432.612145,
        words: [
            { word: 'Pluribus', time: 432.612145 },
            { word: 'unum,', time: 433.740166 },
            { word: 'unus', time: 434.626311 },
            { word: 'mundus', time: 435.472645 },
        ],
    },
    {
        type: 'line',
        time: 436.318874,
        words: [
            { word: 'And', time: 436.318874 },
            { word: 'all', time: 436.563478 },
            { word: 'the', time: 437.328645 },
            { word: 'satellites', time: 437.529957 },
            { word: 'imbue', time: 438.619207 },
        ],
    },
    {
        type: 'line',
        time: 439.790749,
        words: [
            { word: 'The', time: 439.790749 },
            { word: 'purple,', time: 439.994416 },
            { word: 'yellow,', time: 440.884145 },
            { word: 'green,', time: 441.776395 },
            { word: 'red,', time: 442.22327 },
            { word: 'orange', time: 442.713624 },
            { word: 'and', time: 443.562061 },
            { word: 'the', time: 444.046499 },
            { word: 'blue', time: 444.449332 },
        ],
    },
    {
        type: 'line',
        time: 445.375478,
        words: [
            { word: 'Oh,', time: 445.375478 },
            { word: "it's", time: 445.616978 },
            { word: 'a', time: 445.86252 },
            { word: 'crazy', time: 446.506874 },
            { word: 'world,', time: 448.079791 },
            { word: "it's", time: 449.415999 },
            { word: 'true', time: 449.859811 },
        ],
    },
    {
        type: 'line',
        time: 452.766228,
        words: [
            { word: 'Sing', time: 452.766228 },
            { word: 'it', time: 453.007666 },
            { word: 'out', time: 453.415082 },
        ],
    },
    {
        type: 'line',
        time: 455.476082,
        words: [
            { word: 'Oh', time: 455.476082 },
            { word: 'oh', time: 456.160582 },
            { word: 'oh', time: 456.850124 },
            { word: 'oh,', time: 457.297895 },
            { word: 'oh', time: 459.110728 },
            { word: 'oh', time: 459.796895 },
            { word: 'oh', time: 460.443374 },
            { word: 'oh', time: 460.846291 },
        ],
    },
    {
        type: 'line',
        time: 469.849686,
        words: [
            { word: 'Oh', time: 469.849686 },
            { word: 'oh', time: 470.538645 },
            { word: 'oh', time: 471.183145 },
            { word: 'oh,', time: 471.588395 },
            { word: 'oh', time: 473.35802 },
            { word: 'oh', time: 474.043957 },
            { word: 'oh', time: 474.692853 },
            { word: 'oh', time: 475.13652 },
        ],
    },
    { type: 'pause', time: 476.103228 },
    {
        type: 'line',
        time: 484.823666,
        words: [
            { word: 'And', time: 484.823666 },
            { word: 'in', time: 485.065082 },
            { word: 'this', time: 485.306436 },
            { word: 'crazy', time: 485.750874 },
            { word: 'world,', time: 487.445041 },
            { word: 'I', time: 489.057936 },
            { word: 'do', time: 489.703061 },
        ],
    },
    {
        type: 'line',
        time: 495.352082,
        words: [
            { word: 'I', time: 495.352082 },
            { word: 'just', time: 495.557853 },
            { word: 'want—', time: 495.919999 },
        ],
    },
    {
        type: 'line',
        time: 499.389082,
        words: [
            { word: 'In', time: 499.389082 },
            { word: 'this', time: 499.630728 },
            { word: 'crazy', time: 500.274957 },
            { word: 'world,', time: 501.806436 },
            { word: "it's", time: 503.41727 },
            { word: 'true', time: 503.818478 },
        ],
    },
    {
        type: 'line',
        time: 509.682041,
        words: [
            { word: 'I', time: 509.682041 },
            { word: 'just', time: 509.887061 },
            { word: 'want', time: 510.289978 },
            { word: 'you', time: 511.497853 },
        ],
    },
    { type: 'pause', time: 512.791541 },
    {
        type: 'line',
        time: 528.05127,
        words: [
            { word: 'Poets', time: 528.05127 },
            { word: 'prophesy', time: 528.618936 },
            { word: 'up', time: 530.275478 },
            { word: 'in', time: 530.516978 },
            { word: 'the', time: 532.008249 },
            { word: 'blue', time: 532.249499 },
        ],
    },
    {
        type: 'line',
        time: 533.981936,
        words: [
            { word: 'Together,', time: 533.981936 },
            { word: "that's", time: 535.799228 },
            { word: 'how', time: 536.244499 },
            { word: "we'll", time: 537.45227 },
            { word: 'make', time: 537.693874 },
            { word: 'it', time: 539.064874 },
            { word: 'through', time: 539.427145 },
        ],
    },
    { type: 'pause', time: 540.317228 },
]

export default transcriptData
