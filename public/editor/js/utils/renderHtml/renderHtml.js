const renderHtml = (htmlStr="")=>{
    const parser = new DOMParser();
    const html = parser.parseFromString(htmlStr, "text/html");
    const body_children_nodes = html.body.childNodes
    return createElement("div", {},createHtmlLabel(body_children_nodes))
}
const createHtmlLabel = (nodes)=>{
    const children_render_nodes = []
    if(nodes.length == 0){
        return children_render_nodes
    }
    for(let i=0;i<nodes.length;i++){
        const node = nodes[i]
        let renderNode = null
        if(node.nodeName !=="#text"){
            const props = {}
            for (let j = 0; j < node.attributes.length; j++) {
                if(attributes_map[node.attributes[j].nodeName]){
                    props[attributes_map[node.attributes[j].nodeName]] = node.attributes[j].nodeValue
                }else{
                    props[node.attributes[j].nodeName] = node.attributes[j].nodeValue
                }
            }
            renderNode = createElement(node.localName,{
                ...props
            }, createHtmlLabel(nodes[i].childNodes))
        }else{
            renderNode = node.data
        }
        children_render_nodes.push(renderNode)
    }
    return children_render_nodes
}

window.renderHtml = renderHtml;
