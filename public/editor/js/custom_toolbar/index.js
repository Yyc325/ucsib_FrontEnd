const { Toolbar } = window.Doc.Plugins;
console.log(window);
class InlineCodeToolbarDescriptor extends Toolbar.ToolbarUIDescriptor {
    static Type = 'Button';

    // 点击事件回调
    onEvent(eventName, payload) {
        // 当前光标位置插入行内代码
        // @ts-expect-error not error
        this.editor.execCommand('code');
    }

    getInitUIState() {
        return {
            disabled: this.disabled, // 是否处于禁用状态
            // 自定义图标，自行调节lineHeight让它视觉居中，字号一般是16
            icon: () => {
                return createElement('img',{
                    src:"https://niu.xycloud.net.cn/knowledge/123/123/2024-12-16/B612EED2-599D-4B9A-BFD7-74D031E9352E.png",
                    width:30,
                    height:30,
                })
            },
            className: 'ne-ui-toolbar-inline-code',
            // 展示tooltip
            tooltip: Toolbar.ToolbarUIDescriptor.getTooltip(
                this.editor,
                '行内代码',
                this.name,
            ),
        };
    }

    getUIState() {
        const { editor } = this;

        return {
            // @ts-expect-error not error
            disabled: this.disabled || !editor.queryCommandEnabled('code'),
        };
    }
}

window.customToolbars = {
    inlineCodeToolbarDescriptor: InlineCodeToolbarDescriptor,
}
