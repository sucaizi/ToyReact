class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }

    appendChild(vChild) {
        vChild.mountTo(this.root)
    }

    mountTo(parent) {
        parent.appendChild(this.root)
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
    }

    mountTo(parent) {
        parent.appendChild(this.root)
    }
}

export class Component {
    constructor() {
        this.children = [];
    }

    setAttribute(name, value) {
        this[name] = value;
    }

    mountTo(parent) {
        let vdom = this.render();
        vdom.mountTo(parent);
    }

    appendChild(vchild) {
        this.children.push(vchild);
    }
}

export let ToyReact = {
    createElement(type, attributes, ...children) {

        debugger;
        let element;

        // 创建vdom节点
        if (typeof type === 'string') {
            // 标签
            element = new ElementWrapper(type);
        } else {
            // 自定义component
            element = new type;
        }

        // 设置属性
        for (let name in attributes) {
            element.setAttribute(name, attributes[name])
        }

        // 插入子节点
        let insertChildren = (children) => {
            for (let child of children) {
                if (typeof child === 'object' && child instanceof Array) {
                    // 如果子节点存在子节点，则递归处理子节点
                    insertChildren(child)
                } else {
                    if (!(child instanceof Component) 
                        && !(child instanceof ElementWrapper)
                        && !(child instanceof TextWrapper)) {
                        // 正常的标签
                        child = String(child);
                    }

                    // 文本节点
                    if (typeof child === 'string') {
                        child = new TextWrapper(child);
                    }

                    element.appendChild(child);
                }
            }
        }

        insertChildren(children);
        return element;
    },

    /**
     * virtual dom to real dom
     * @param {ba} vdom 
     * @param {*} element 
     */
    render(vdom, element) {
        vdom.mountTo(element)
    }
};