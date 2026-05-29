// 基础转换函数
class RemPxConverter {
    baseFontSize:number
    constructor() {
        const rootFontSize = document.documentElement.style.fontSize;
        this.baseFontSize = parseFloat(rootFontSize);
    }

    // px 转 rem
    pxToRem(pxValue:number):number {
        return pxValue / this.baseFontSize;
    }

    // rem 转 px
    remToPx(remValue:number):number {
        return remValue * this.baseFontSize;
    }

    // 设置基准字体大小
    setBaseFontSize(size) {
        this.baseFontSize = size;
        return this;
    }

    // 获取当前基准字体大小
    getBaseFontSize() {
        return this.baseFontSize;
    }
}