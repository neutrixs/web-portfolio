export interface Size {
    width: number
    height: number
}

export enum EncodingType {
    VP8,
    VP8L,
    VP8X,
}

/**
 * https://developers.google.com/speed/webp/docs/riff_container
 */
export default class WebPDecoder {
    private data: Uint8Array
    private VP8Type: EncodingType = EncodingType.VP8
    private VP8Header: Uint8Array = new Uint8Array()
    private VP8Decoder: VP8Base = new VP8(new Uint8Array())

    constructor(data: ArrayBuffer) {
        this.data = new Uint8Array(data)

        if (!this.isValidWebP()) {
            throw new Error('Invalid WebP file')
        }

        this.initEncoding()
    }

    public get decoder() {
        return this.VP8Decoder
    }

    private initEncoding() {
        const encodingString = new TextDecoder().decode(this.data.slice(0x0c, 0x10))
        switch (encodingString) {
            // the space is NECESSARY
            case 'VP8 ':
                this.VP8Type = EncodingType.VP8
                this.VP8Header = this.data.subarray(0x10)
                this.VP8Decoder = new VP8(this.VP8Header)
                break
            //TODO: add support for other VP8 encoding

            // case 'VP8L':
            //     this.VP8Type = EncodingType.VP8L
            //     break
            // case 'VP8X':
            //     this.VP8Type = EncodingType.VP8X
            //     break
            default:
                throw new Error('Unsupported WebP encoding')
        }
    }

    private isValidWebP() {
        const riff = new TextDecoder().decode(this.data.slice(0x0, 0x4)) == 'RIFF'
        const webp = new TextDecoder().decode(this.data.slice(0x8, 0xc)) == 'WEBP'

        return riff && webp
    }
}

abstract class VP8Base {
    protected data: Uint8Array
    protected width: number
    protected height: number
    protected decoded = false

    protected constructor(data: Uint8Array) {
        this.data = data
        this.width = 0
        this.height = 0
        return this
    }

    abstract decode(): this

    getDimension(): Size {
        return {
            width: this.width,
            height: this.height,
        }
    }
}

export class VP8 extends VP8Base {
    constructor(data: Uint8Array) {
        super(data)
    }

    decode() {
        if (this.decoded) {
            return this
        }

        const widthArray = this.data.subarray(0xa, 0xc)
        const heightArray = this.data.subarray(0xc, 0xe)
        // see https://datatracker.ietf.org/doc/html/rfc6386#section-9.1
        const scaleMask = 0x3f

        this.width = widthArray[0] | ((widthArray[1] & scaleMask) << 8)
        this.height = heightArray[0] | ((heightArray[1] & scaleMask) << 8)

        this.decoded = true
        return this
    }
}
