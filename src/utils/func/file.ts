
/**
 * base64图片 转 图片文件对象
 * */
export function base64ToFile(base64: Base64URLString, fileName:string) {
    let arr = base64.split(',') as any;
    let mime = arr[0].match(/:([\s\S]+);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
}

export const rgbStringToHex = (rgbStr: string) => {
    // 提取 RGB 数值（匹配 "rgb(255, 165, 0)" 或 "rgba(255, 165, 0, 0.5)"）
    const match = rgbStr.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i);
    if (!match) return ''; // 格式错误返回 null

    // 提取 R, G, B 值（并确保在 0-255 范围内）
    const r = Math.max(0, Math.min(255, parseInt(match[1], 10)));
    const g = Math.max(0, Math.min(255, parseInt(match[2], 10)));
    const b = Math.max(0, Math.min(255, parseInt(match[3], 10)));

    // 转换为 2 位 HEX
    const toHex = val => val.toString(16).padStart(2, '0').toUpperCase();
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

    return hex;
};
