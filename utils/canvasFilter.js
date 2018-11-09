/**
 * Author: Alinc
 * Date: 
 * Name: 滤镜
 */
import regeneratorRuntime from './runtime'

class CanvasFilter {
    constructor(options) {
        const opt = options || {}
        this.originInfo = (opt.imageData && Object.assign({}, opt.imageData, { oldData: new Uint8ClampedArray(opt.imageData.data) })) || null
        console.log('this.originInfo', this.originInfo)
    }
    // 卷积核算法
    static async convolutionMatrix(imageData, m, divisor, offset) {
        const { data, oldData, width, height } = imageData
        // 对除了边缘的点之外的内部点的 RGB 进行操作，透明度在最后都设为 255
        for (let y = 1; y < height - 1; y += 1) {
            for (let x = 1; x < width - 1; x += 1) {
                for (let c = 0; c < 3; c += 1) {
                    let i = (y * width + x) * 4 + c;
                    data[i] = offset
                        + (m[0] * oldData[i - width * 4 - 4] + m[1] * oldData[i - width * 4] + m[2] * oldData[i - width * 4 + 4]
                        + m[3] * oldData[i - 4]              + m[4] * oldData[i]             + m[5] * oldData[i + 4]
                        + m[6] * oldData[i + width * 4 - 4]  + m[7] * oldData[i + width * 4] + m[8] * oldData[i + width * 4 + 4])
                        / divisor
                }
                data[(y * width + x) * 4 + 3] = 255 // 设置透明度为不透明
            }
        }
        return data
    }
    // 滤镜-锐化
    async sharpenEffect() {
        const matrix = [0, -1, 0, -1, 5, -1, 0, -1, 0]
        return await CanvasFilter.convolutionMatrix(this.originInfo, matrix, 1, 0)
    }
    // 滤镜-灰色
    async grayEffect() {
        const { data, oldData, width, height } = this.originInfo
        for (let i = 0; i < width * height; i++) {
            let R = oldData[i * 4 + 0]
            let G = oldData[i * 4 + 1]
            let B = oldData[i * 4 + 2]
            let gray = R * 0.3 + G * 0.59 + B * 0.11
            data[i * 4 + 0] = gray
            data[i * 4 + 1] = gray
            data[i * 4 + 2] = gray
        }
        return data
    }
    // 滤镜-模糊
    async blurEffect() {
        const { data, oldData, width, height } = this.originInfo
        let sumred = 0.0, sumgreen = 0.0, sumblue = 0.0
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {

                // Index of the pixel in the array    
                let idx = (x + y * width) * 4
                for (let subCol = -2; subCol <= 2; subCol++) {
                    let colOff = subCol + x
                    if (colOff < 0 || colOff >= width) {
                        colOff = 0
                    }
                    for (let subRow = -2; subRow <= 2; subRow++) {
                        let rowOff = subRow + y
                        if (rowOff < 0 || rowOff >= height) {
                            rowOff = 0
                        }
                        let idx2 = (colOff + rowOff * width) * 4
                        let r = oldData[idx2 + 0]
                        let g = oldData[idx2 + 1]
                        let b = oldData[idx2 + 2]
                        sumred += r
                        sumgreen += g
                        sumblue += b
                    }
                }

                // calculate new RGB value
                let nr = (sumred / 25.0)
                let ng = (sumgreen / 25.0)
                let nb = (sumblue / 25.0)

                // clear previous for next pixel point
                sumred = 0.0
                sumgreen = 0.0
                sumblue = 0.0

                // assign new pixel value    
                data[idx + 0] = nr // Red channel    
                data[idx + 1] = ng // Green channel    
                data[idx + 2] = nb // Blue channel    
                data[idx + 3] = 255 // Alpha channel    
            }
        }
        return data
    }
    // 滤镜-反色
    async reverseEffect() {
        const { data, oldData, width, height } = this.originInfo
        for (let i = 0; i < width * height; i++) {
            let r = oldData[i * 4 + 0]
            let g = oldData[i * 4 + 1]
            let b = oldData[i * 4 + 2]
            data[i * 4 + 0] = 255 - r
            data[i * 4 + 1] = 255 - g
            data[i * 4 + 2] = 255 - b
        }
        return data
    }
    // 滤镜-浮雕
    async reliefEffect() {
        const { data, oldData, width, height } = this.originInfo
        for (let x = 1; x < width - 1; x++) {
            for (let y = 1; y < height - 1; y++) {
                // Index of the pixel in the array    
                let idx = (x + y * width) * 4
                let bidx = ((x - 1) + y * width) * 4
                let aidx = ((x + 1) + y * width) * 4

                // calculate new RGB value
                let nr = oldData[aidx + 0] - oldData[bidx + 0] + 128
                let ng = oldData[aidx + 1] - oldData[bidx + 1] + 128
                let nb = oldData[aidx + 2] - oldData[bidx + 2] + 128
                nr = (nr < 0) ? 0 : ((nr > 255) ? 255 : nr)
                ng = (ng < 0) ? 0 : ((ng > 255) ? 255 : ng)
                nb = (nb < 0) ? 0 : ((nb > 255) ? 255 : nb)

                // assign new pixel value    
                data[idx + 0] = nr // Red channel    
                data[idx + 1] = ng // Green channel    
                data[idx + 2] = nb // Blue channel    
                data[idx + 3] = 255 // Alpha channel    
            }
        }
        return data
    }
    // 滤镜-镜像
    async mirrorEffect() {
        const { data, oldData, width, height } = this.originInfo
        for (let x = 0; x < width; x++) {// column
            for (let y = 0; y < height; y++) { // row
                // Index of the pixel in the array    
                let idx = (x + y * width) * 4
                let midx = (((width - 1) - x) + y * width) * 4

                // assign new pixel value    
                data[midx + 0] = oldData[idx + 0] // Red channel    
                data[midx + 1] = oldData[idx + 1] // Green channel    
                data[midx + 2] = oldData[idx + 2] // Blue channel    
                data[midx + 3] = 255 // Alpha channel    
            }
        }
        return data
    }
    // 原图
    async originEffect() {
        const { oldData } = this.originInfo
        return oldData
    }
}
export default CanvasFilter