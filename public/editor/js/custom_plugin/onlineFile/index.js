const { createElement } = window.React;
// 在线文件
class OnlineFile extends React.Component {
    cardShowType = {
        text: "icon-text-link",
        card: "abstract-card"
    };
    state = {
        viewer: null,
        editor: null,
        cardValue: {
            docInfo:null,
            type: this.cardShowType.text
        },
        cardType: "inline",
        toolbarItems: [
            // {
            //     type: "textButton",
            //     icon: "iconfont icon-a-bianzu43",
            //     name: "分屏打开",
            //     command: "split-screen-open"
            // },
            {
                type: "textButton",
                icon: "iconfont icon-a-bianzu43",
                name: "打开",
                command: "open-in-browser"
            },
            {
                type: "button",
                icon: "iconfont icon-a-bianzu43",
                name: "复制链接",
                command: "copy-link"
            },
            {
                type: "separation"
            },
            {
                type: "button",
                icon: "iconfont icon-a-bianzu43",
                name: "图标文本链接",
                command: "icon-text-link"
            },
            {
                type: "button",
                icon: "iconfont icon-a-bianzu43",
                name: "摘要卡片",
                command: "abstract-card"
            }
        ],
        documentList:[],
        operationVisible:false
    };
    componentDidMount(){
        this.initComponentOption();
        this.queryDocumentList()
        document.addEventListener("click",()=>{
            this.setState({operationVisible:false});
        })
    }
    // 查询文档列表
    queryDocumentList(){
        window.request.get("hangyi-knowledge/route/query/1897206023878983680").then(res=>{
            this.setState({documentList:res.data.data});
        })
    }
    // 初始化数据
    initComponentOption() {
        if (!this.editor && this.props.editor) {
            this.setState({ editor: this.props.editor });
        }
        if (!this.viewer && this.props.viewer) {
            this.setState({ viewer: this.props.viewer });
        }
        this.setState({ cardValue: this.props.cardValue || this.state.cardValue });
    }

    // 数据更新
    updateCardValue(value) {
        this.props.updateCardValue(value);
    }
    // 创建文本类型展示样式
    createTextElement() {
        return createElement("span", {
            onClick:(event)=>{
                event.stopPropagation();
                this.setState({operationVisible:true})
            }
        }, this.state.cardValue.docInfo.meta.title);
    }

    // 创建卡片类型展示样式
    createCardElement() {
        return createElement("div",
            {
                className: "i-online-file-card",
                style: {
                    width:"100%"
                },
                onClick: (event)=>{
                    event.stopPropagation();
                    this.setState({operationVisible:true})
                }
            },
            [
                createElement(
                    "div", {
                        className: "i-online-file-left"
                    },
                    "图片"
                ),
                createElement(
                    "div",
                    {
                        className: "i-online-file-right"
                    },
                    [
                        createElement(
                            "div",
                            {},
                            createElement("span", {}, this.state.cardValue.docInfo.meta.title)
                        ),
                        createElement(
                            "div",
                            {},
                            createElement("span", {}, `更新于:${this.state.cardValue.docInfo.meta.createTime}`)
                        )
                    ]
                )
            ]
        );
    }



    // 菜单容器
    createMenu() {
        return createElement("div", {
            className: "i-online-file-menu"
        }, [this.state.toolbarItems.map((vm) => {
            return this.createMenuItem(vm);
        })]);
    }

    // 菜单项
    createMenuItem(item) {
        switch (item.type) {
            case "separation":
                return createElement("div", { className: "i-online-file-item-line" });
            case "button":
                return createElement("div", {
                    className: `i-online-file-menu-item ${item.command === this.state.cardValue.type?"is-active":""}`,
                    onClick: () => {
                        this.handleMenuCommand(item.command);
                    }
                }, createElement("i", { className: item.icon }));
            case "textButton":
                return createElement("div", {
                    className: "i-online-file-menu-item text-button",
                    onClick: () => {
                        this.handleMenuCommand(item.command);
                    }
                }, [
                    createElement("div", { className: "i-online-file-menu-item-icon" }, createElement("i", { className: item.icon })),
                    createElement("div", { className: "i-online-file-menu-item-label" }, item.name)
                ]);
            default:
                return "";
        }

    }

    // 菜单操作项
    handleMenuCommand(command) {
        this.setState({operationVisible:false})
        switch (command) {
            case "split-screen-open":
                break;
            case "copy-link":
                break;
            case "open-in-browser":
                break;
            case "icon-text-link":
                this.toggleCardType(this.cardShowType.text)
                break;
            case "abstract-card":
                this.toggleCardType(this.cardShowType.card)
                break;
            default:
                break;
        }
    }
    // 打开文档
    openDocInOther(){

    }
    // 切换卡片展示样式
    toggleCardType(type){
        this.setState({cardValue:Object.assign(this.state.cardValue,{type:type})});
        this.updateCardValue(this.state.cardValue);
    }
    // 已选择文档时的展示样式
    createDocumentShow(){
        return createElement(window.antd.Popover, {
            className: "i-online-file-container",
            content: this.createMenu(),
            arrow: false,
            trigger: "click",
            placement: "bottom",
            open:this.state.operationVisible,
            destroyTooltipOnHide: true,
        }, [this.state.cardValue.type === this.cardShowType.card ? (this.createCardElement()) : (this.createTextElement())])
    }
    // 创建文件选择窗
    createDocumentSelector(){
        return createElement("div", {},this.state.documentList.map((v)=>createElement("div", {
            className:"i-online-file-selector-item",
            onClick: () => {
                this.setState({cardValue:Object.assign(this.state.cardValue,{docInfo:v})});
            }
        },v.meta.title)));
    }
    // 创建空状态
    createEmptyElement() {
        return createElement(window.antd.Popover,{
            className: "i-online-file-selector",
            content: this.state.editor?this.createDocumentSelector():'',
            arrow: false,
            trigger: "click",
            placement: "bottom",
        }, this.state.editor?createElement('span',{},'请选择插入文档'):"")
    }
    // 容器
    createContainerElement() {
        return this.state.cardValue.docInfo?this.createDocumentShow():this.createEmptyElement();
    }

    render() {
        return this.createContainerElement();
    }
}


window.onlineFile = OnlineFile
