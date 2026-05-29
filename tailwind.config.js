/** @type {import('tailwindcss').Config} */
module.exports = {
    corePlugins: {
        // 禁用预定义的按钮样式（与Element Plus冲突）
        button: false,
        // 禁用表单样式
        form: false,
        // 禁用输入框样式
        input: false,
    },
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,vue,svelte}", // 根据你的框架调整
    ],
    theme: {
        extend: {
            rotate: {
                '315': '315deg',
            },
            width: {
                '45': '11.25rem',
                '104': '26rem'
            },
            flex: {
                '2': '2 2 0%',
                '4': '4 4 0%',
                '5': '5 5 0%',
                '6': '6 6 0%',
                '7': '7 7 0%',
                '8': '8 8 0%',
                '9': '9 9 0%',
            },
            colors: {
                'line-color': '#E5E8EF',
                'hover-bg': '#F0F5FF',
                'title-grey': '#787878',
                'search-color': '#160082',
                'history-bg': '#D9D9D9',
                'header-color': '#394A92',
                'tbg': '#020047'
            },
            lineClamp: {
                7: '7',
                8: '8',
                9: '9',
                10: '10',
                11: '11',
                12: '12',
            },
            spacing: {
                '3.125': '3.125rem',
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}

