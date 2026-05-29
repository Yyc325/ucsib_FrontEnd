import {defineConfig, loadEnv} from "vite";
import type {UserConfig, ConfigEnv} from "vite";
import {wrapperEnv} from "./config/unit";
import {createProxy} from "./config/proxy";
import vue from "@vitejs/plugin-vue";
import {resolve} from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import monacoEditorPlugin from "vite-plugin-monaco-editor";
import postcssPluginPx2rem from "postcss-plugin-px2rem";
import topLevelAwait from "vite-plugin-top-level-await";
import vueJSX from "@vitejs/plugin-vue-jsx";
// px2rem 配置参数
const px2remOptions = {
    rootValue: 16, //换算基数， 默认100 ,也就是1440px ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多少px了
    unitPrecision: 5, //允许REM单位增长到的十进制数字，其实就是精度控制
    // propWhiteList: [], // 默认值是一个空数组，这意味着禁用白名单并启用所有属性。
    // propBlackList: [], // 黑名单
    exclude: false, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
    // selectorBlackList: [], //要忽略并保留为px的选择器
    // ignoreIdentifier: false, //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
    // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
    mediaQuery: false, //（布尔值）允许在媒体查询中转换px
    minPixelValue: 0, //设置要替换的最小像素值(3px会被转rem)。 默认 0
};
// https://vitejs.dev/config/
const viteConfig = ({command, mode}: ConfigEnv): UserConfig => {
    const root = process.cwd();
    const env = loadEnv(mode, root);
    const viteEnv = wrapperEnv(env);
    const {
        VITE_PORT,
        VITE_OPEN,
        VITE_BASE_PATH,
        VITE_DROP_CONSOLE,
        VITE_PACKAGE_NAME,
        VITE_PROXY,
    } = viteEnv;
    return {
        plugins: [
            vue(),
            vueJSX(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
            topLevelAwait({
                promiseExportName: "__tla",
                promiseImportName: (i) => `__tla_${i}`,
            }),
        ],
        resolve: {
            alias: {
                "@": resolve(__dirname, "src"),
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    quietDeps: true,
                    javascriptEnabled: true,
                    // 定义全局 scss 变量文件
                    additionalData: '@use "@/assets/css/common/var.scss" as *;',
                },
            },
            postcss: {
                plugins: [
                    postcssPluginPx2rem(px2remOptions),
                    require('tailwindcss')
                ]
            }
        },
        server: {
            hmr: true,
            host: "0.0.0.0",
            open: VITE_OPEN,
            port: VITE_PORT,
            proxy: createProxy(VITE_PROXY),
        },
        build: {
            minify: "terser",
            target: ["chrome66"],
            cssTarget: ["chrome66"],
            cssCodeSplit: true,
            outDir: VITE_PACKAGE_NAME,
            sourcemap: true,
            terserOptions: {
                compress: {
                    keep_infinity: true,
                    drop_console: VITE_DROP_CONSOLE,
                },
            },
            chunkSizeWarningLimit: 2000,
        },
        esbuild: {
            jsxFactory: "h",
            jsxFragment: "Fragment",
        },
    };
};
export default viteConfig;
