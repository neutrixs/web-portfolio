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
    { type: 'line', time: 108.885041, words: [{ word: 'Coloratura', time: 108.885041 }] },
    {
        type: 'line',
        time: 112.215562,
        words: [
            { word: 'We', time: 112.215562 },
            { word: 'fell', time: 112.416854 },
            { word: 'in', time: 112.658645 },
            { word: 'through', time: 113.330166 },
            { word: 'the', time: 113.775375 },
            { word: 'clouds', time: 113.980375 },
        ],
    },
    {
        type: 'line',
        time: 116.019187,
        words: [
            { word: 'And', time: 116.019187 },
            { word: 'everyone', time: 116.18227 },
            { word: 'before', time: 117.561145 },
            { word: 'us', time: 118.329604 },
        ],
    },
    {
        type: 'line',
        time: 118.735208,
        words: [
            { word: 'Is', time: 118.735208 },
            { word: 'there', time: 119.175833 },
            { word: 'welcoming', time: 119.906833 },
            { word: 'us', time: 121.11902 },
            { word: 'now', time: 121.527312 },
        ],
    },
    {
        type: 'line',
        time: 123.167666,
        words: [
            { word: "It's", time: 123.167666 },
            { word: 'the', time: 123.410645 },
            { word: 'end', time: 123.704 },
            { word: 'of', time: 124.150562 },
            { word: 'death', time: 124.393875 },
            { word: 'and', time: 125.083625 },
            { word: 'doubt', time: 125.325458 },
        ],
    },
    {
        type: 'line',
        time: 126.98527,
        words: [
            { word: 'And', time: 126.98527 },
            { word: 'loneliness', time: 127.227895 },
            { word: 'is', time: 128.641541 },
            { word: 'out', time: 129.046541 },
        ],
    },
    { type: 'line', time: 131.203, words: [{ word: 'Coloratura', time: 131.203 }] },
    {
        type: 'line',
        time: 134.746479,
        words: [
            { word: 'The', time: 134.746479 },
            { word: 'place', time: 134.990062 },
            { word: 'we', time: 135.400333 },
            { word: 'dreamed', time: 135.843187 },
            { word: 'about', time: 136.334687 },
        ],
    },
    {
        type: 'line',
        time: 138.444625,
        words: [
            { word: 'The', time: 138.444625 },
            { word: 'melodies', time: 138.640708 },
            { word: 'inside', time: 139.857916 },
            { word: 'yourself', time: 140.728333 },
        ],
    },
    {
        type: 'line',
        time: 141.953541,
        words: [
            { word: 'And', time: 141.953541 },
            { word: 'love', time: 142.205791 },
            { word: 'come', time: 142.977979 },
            { word: 'pouring', time: 143.220208 },
            { word: 'out', time: 143.951166 },
        ],
    },
    {
        type: 'line',
        time: 145.771833,
        words: [
            { word: 'And', time: 145.771833 },
            { word: "everyone's", time: 145.97377 },
            { word: 'allowed', time: 147.549875 },
        ],
    },
    {
        type: 'line',
        time: 149.648854,
        words: [
            { word: "We're", time: 149.648854 },
            { word: 'feathered', time: 149.892708 },
            { word: 'by', time: 150.621812 },
            { word: 'the', time: 151.311145 },
            { word: 'crowd', time: 151.553562 },
        ],
    },
    { type: 'pause', time: 153.654125 },
    {
        type: 'line',
        time: 161.01152,
        words: [
            { word: 'And', time: 161.01152 },
            { word: 'up', time: 161.208145 },
            { word: 'there', time: 161.450583 },
            { word: 'in', time: 161.895312 },
            { word: 'the', time: 162.588375 },
            { word: 'heavens', time: 162.783437 },
        ],
    },
    {
        type: 'line',
        time: 163.83952,
        words: [
            { word: 'Galileo', time: 163.83952 },
            { word: 'and', time: 165.454458 },
            { word: 'those', time: 165.874229 },
            { word: 'pining', time: 166.324791 },
            { word: 'for', time: 167.181937 },
            { word: 'the', time: 167.912125 },
            { word: 'moon', time: 168.158208 },
        ],
    },
    {
        type: 'line',
        time: 170.836875,
        words: [
            { word: 'Know', time: 170.836875 },
            { word: "it's", time: 171.079645 },
            { word: 'a', time: 171.527166 },
            { word: 'slow', time: 171.763229 },
            { word: 'burn', time: 173.705729 },
        ],
    },
    {
        type: 'line',
        time: 175.098625,
        words: [
            { word: 'Through', time: 175.098625 },
            { word: 'Pioneer', time: 175.550437 },
            { word: 'and', time: 176.733041 },
            { word: 'Helix', time: 177.096937 },
        ],
    },
    {
        type: 'line',
        time: 178.191562,
        words: [
            { word: 'Oumuamua,', time: 178.191562 },
            { word: 'Heliopause', time: 179.973854 },
            { word: 'and', time: 181.511562 },
            { word: 'Neptune', time: 181.917291 },
        ],
    },
    {
        type: 'line',
        time: 185.661437,
        words: [
            { word: "We're", time: 185.661437 },
            { word: 'a', time: 185.822979 },
            { word: 'slow', time: 186.025458 },
            { word: 'burning', time: 188.014895 },
            { word: 'tune', time: 189.832354 },
        ],
    },
    {
        type: 'line',
        time: 192.814125,
        words: [
            { word: 'But', time: 192.814125 },
            { word: "we'll", time: 193.016875 },
            { word: 'get', time: 193.259875 },
            { word: 'there', time: 194.966187 },
        ],
    },
    {
        type: 'line',
        time: 195.696083,
        words: [
            { word: 'So', time: 195.696083 },
            { word: 'for', time: 196.304312 },
            { word: 'now', time: 196.954208 },
        ],
    },
    { type: 'pause', time: 197.925333 },
    {
        type: 'line',
        time: 199.743104,
        words: [
            { word: 'In', time: 199.743104 },
            { word: 'this', time: 199.946666 },
            { word: 'crazy', time: 200.405958 },
            { word: 'world,', time: 202.158145 },
            { word: 'I', time: 203.584104 },
            { word: 'do', time: 204.194395 },
        ],
    },
    {
        type: 'line',
        time: 210.006333,
        words: [
            { word: 'I', time: 210.006333 },
            { word: 'just', time: 210.249583 },
            { word: 'want', time: 210.614375 },
            { word: 'you', time: 211.717458 },
        ],
    },
    { type: 'pause', time: 212.93802 },
    {
        type: 'line',
        time: 225.007812,
        words: [
            { word: 'In', time: 225.007812 },
            { word: 'the', time: 225.21052 },
            { word: 'end,', time: 225.453 },
            { word: "it's", time: 226.054833 },
            { word: 'all', time: 226.256875 },
            { word: 'about', time: 226.94627 },
        ],
    },
    {
        type: 'line',
        time: 228.793916,
        words: [
            { word: 'The', time: 228.793916 },
            { word: 'love', time: 229.037375 },
            { word: "you're", time: 229.727333 },
            { word: 'sending', time: 229.929791 },
            { word: 'out', time: 230.860854 },
        ],
    },
    { type: 'pause', time: 232.763708 },
    {
        type: 'line',
        time: 239.78475,
        words: [
            { word: 'And', time: 239.78475 },
            { word: 'up', time: 239.987583 },
            { word: 'there', time: 240.23102 },
            { word: 'in', time: 240.63775 },
            { word: 'the', time: 241.326645 },
            { word: 'heavens', time: 241.5695 },
        ],
    },
    {
        type: 'line',
        time: 242.657354,
        words: [
            { word: 'The', time: 242.657354 },
            { word: 'explorers', time: 242.900083 },
            { word: "who've", time: 244.232958 },
            { word: 'all', time: 244.645437 },
            { word: 'gathered', time: 245.050937 },
            { word: 'by', time: 246.003687 },
            { word: 'the', time: 246.699458 },
            { word: 'moon', time: 246.902458 },
        ],
    },
    {
        type: 'line',
        time: 249.819458,
        words: [
            { word: 'Saw', time: 249.819458 },
            { word: 'the', time: 250.266041 },
            { word: 'world', time: 250.468854 },
            { word: 'turn', time: 252.490562 },
        ],
    },
    {
        type: 'line',
        time: 253.803875,
        words: [
            { word: 'Through', time: 253.803875 },
            { word: 'Voyager,', time: 254.258125 },
            { word: 'Callisto', time: 255.641916 },
        ],
    },
    {
        type: 'line',
        time: 256.943541,
        words: [
            { word: 'Calliope,', time: 256.943541 },
            { word: 'Betelgeuse,', time: 258.561687 },
            { word: 'the', time: 260.137166 },
            { word: 'Neon', time: 260.331895 },
            { word: 'Moons', time: 261.471041 },
        ],
    },
    {
        type: 'line',
        time: 264.418562,
        words: [
            { word: "We're", time: 264.418562 },
            { word: 'a', time: 264.621312 },
            { word: 'slow', time: 264.863375 },
            { word: 'burning', time: 266.773187 },
            { word: 'tune', time: 268.638625 },
        ],
    },
    {
        type: 'line',
        time: 271.568708,
        words: [
            { word: 'But', time: 271.568708 },
            { word: "we'll", time: 271.771437 },
            { word: 'touch', time: 272.014041 },
            { word: 'down', time: 273.846729 },
            { word: 'soon', time: 274.456645 },
        ],
    },
    {
        type: 'line',
        time: 275.105625,
        words: [
            { word: 'So', time: 275.105625 },
            { word: 'will', time: 275.545625 },
            { word: 'you', time: 275.748333 },
        ],
    },
    { type: 'pause', time: 276.67952 },
    {
        type: 'line',
        time: 278.254666,
        words: [
            { word: 'And', time: 278.254666 },
            { word: 'in', time: 278.45727 },
            { word: 'this', time: 278.699375 },
            { word: 'crazy', time: 279.185895 },
            { word: 'world,', time: 280.905312 },
            { word: 'I', time: 282.418729 },
            { word: 'do', time: 283.188416 },
        ],
    },
    {
        type: 'line',
        time: 288.779937,
        words: [
            { word: 'I', time: 288.779937 },
            { word: 'just', time: 289.025229 },
            { word: 'want', time: 289.47177 },
            { word: 'you', time: 290.493479 },
        ],
    },
    { type: 'pause', time: 291.024645 },
    {
        type: 'line',
        time: 426.877854,
        words: [
            { word: 'And', time: 426.877854 },
            { word: 'up', time: 427.08252 },
            { word: 'there', time: 427.326229 },
            { word: 'in', time: 427.690083 },
            { word: 'the', time: 428.332354 },
            { word: 'heavens', time: 428.575875 },
        ],
    },
    {
        type: 'line',
        time: 429.805729,
        words: [
            { word: 'Galileo', time: 429.805729 },
            { word: 'saw', time: 431.23752 },
            { word: 'reflections', time: 431.764583 },
            { word: 'of', time: 433.027437 },
            { word: 'us,', time: 433.51527 },
            { word: 'too', time: 433.965937 },
        ],
    },
    {
        type: 'line',
        time: 434.656583,
        words: [
            { word: 'Pluribus', time: 434.656583 },
            { word: 'unum,', time: 435.78625 },
            { word: 'unus', time: 436.637604 },
            { word: 'mundus', time: 437.523083 },
        ],
    },
    {
        type: 'line',
        time: 438.65852,
        words: [
            { word: 'All', time: 438.65852 },
            { word: 'the', time: 439.365645 },
            { word: 'satellites', time: 439.608 },
            { word: 'imbue', time: 440.677375 },
        ],
    },
    {
        type: 'line',
        time: 441.81375,
        words: [
            { word: 'The', time: 441.81375 },
            { word: 'purple,', time: 442.0165 },
            { word: 'yellow', time: 442.913208 },
        ],
    },
    {
        type: 'line',
        time: 443.842895,
        words: [
            { word: 'Green,', time: 443.842895 },
            { word: 'red,', time: 444.248541 },
            { word: 'orange', time: 444.698541 },
            { word: 'and', time: 445.585354 },
            { word: 'the', time: 446.0305 },
            { word: 'blue', time: 446.468916 },
        ],
    },
    {
        type: 'line',
        time: 447.403812,
        words: [
            { word: 'Oh,', time: 447.403812 },
            { word: "it's", time: 447.650875 },
            { word: 'a', time: 447.867958 },
            { word: 'crazy', time: 448.516125 },
            { word: 'world,', time: 450.06802 },
            { word: "it's", time: 451.411062 },
            { word: 'true,', time: 451.85625 },
            { word: 'yeah', time: 454.522416 },
        ],
    },
    {
        type: 'line',
        time: 454.765562,
        words: [
            { word: 'Sing', time: 454.765562 },
            { word: 'it', time: 455.00827 },
            { word: 'out', time: 455.492041 },
        ],
    },
    {
        type: 'line',
        time: 457.486354,
        words: [
            { word: 'Oh,', time: 457.486354 },
            { word: 'oh,', time: 458.219229 },
            { word: 'oh,', time: 458.874416 },
            { word: 'oh', time: 459.2805 },
        ],
    },
    {
        type: 'line',
        time: 461.070062,
        words: [
            { word: 'Oh,', time: 461.070062 },
            { word: 'oh,', time: 461.794937 },
            { word: 'oh,', time: 462.442562 },
            { word: 'oh', time: 462.844395 },
        ],
    },
    {
        type: 'line',
        time: 471.81227,
        words: [
            { word: 'Oh,', time: 471.81227 },
            { word: 'oh,', time: 472.500395 },
            { word: 'oh,', time: 473.149854 },
            { word: 'oh', time: 473.569354 },
        ],
    },
    {
        type: 'line',
        time: 475.40125,
        words: [
            { word: 'Oh,', time: 475.40125 },
            { word: 'oh,', time: 476.133979 },
            { word: 'oh,', time: 476.823083 },
            { word: 'oh', time: 477.227479 },
        ],
    },
    { type: 'pause', time: 478.969187 },
    {
        type: 'line',
        time: 486.89075,
        words: [
            { word: 'And', time: 486.89075 },
            { word: 'in', time: 487.092583 },
            { word: 'this', time: 487.335437 },
            { word: 'crazy', time: 487.742125 },
            { word: 'world,', time: 489.518916 },
            { word: 'I', time: 491.013958 },
            { word: 'do', time: 491.719541 },
        ],
    },
    {
        type: 'line',
        time: 497.360833,
        words: [
            { word: 'I', time: 497.360833 },
            { word: 'just', time: 497.604437 },
            { word: 'want—', time: 497.968708 },
        ],
    },
    {
        type: 'line',
        time: 501.384312,
        words: [
            { word: 'In', time: 501.384312 },
            { word: 'this', time: 501.668083 },
            { word: 'crazy', time: 502.281104 },
            { word: 'world,', time: 503.866854 },
            { word: "it's", time: 505.406895 },
            { word: 'true', time: 505.855166 },
        ],
    },
    {
        type: 'line',
        time: 511.675187,
        words: [
            { word: 'I', time: 511.675187 },
            { word: 'just', time: 511.91877 },
            { word: 'want', time: 512.406395 },
            { word: 'you', time: 513.381083 },
        ],
    },
    { type: 'pause', time: 514.840062 },
    {
        type: 'line',
        time: 530.130916,
        words: [
            { word: 'Poets', time: 530.130916 },
            { word: 'prophesy', time: 530.617833 },
            { word: 'up', time: 532.238812 },
            { word: 'in', time: 532.480625 },
            { word: 'the', time: 534.095687 },
            { word: 'blue', time: 534.338854 },
        ],
    },
    {
        type: 'line',
        time: 536.265833,
        words: [
            { word: 'Together,', time: 536.265833 },
            { word: "that's", time: 537.854625 },
            { word: 'how', time: 538.261375 },
            { word: "we'll", time: 539.475791 },
            { word: 'make', time: 539.719416 },
            { word: 'it', time: 541.054541 },
            { word: 'through', time: 541.501083 },
        ],
    },
    { type: 'pause', time: 543.0 },
]

export default transcriptData
