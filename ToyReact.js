class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }

    setAttribute(name, value) {
        if (name.match(/^on([\s\S]+)$/)) {
            console.log(RegExp.$1);
            let eventName = RegExp.$1.replace(/^[\s\S]/, (s) => s.toLowerCase());
            this.root.addEventListener(eventName, value);
        }
        if (name === 'className') {
            name = "class";
        }
        this.root.setAttribute(name, value)
    }

    appendChild(vChild) {
        let range = document.createRange();
        if (this.root.children.length) {
            range.setStartAfter(this.root.lastChild);
            range.setEndAfter(this.root.lastChild);
        } else {
            range.setStart(this.root, 0);
            range.setEnd(this.root, 0);

        }
        vChild.mountTo(range)
    }

    mountTo(range) {
        range.deleteContents();
        range.insertChildren(this.root);
        // parent.appendChild(this.root)
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
    }

    mountTo(range) {
        range.deleteContents();
        range.appendChild(this.root)
    }
}

export class Component {
    constructor() {
        this.children = [];
        this.props = Object.create(null);
    }

    setAttribute(name, value) {
        if (name.match(/^on([\s\S]+)$/)) {
            console.log(RegExp.$1);
        }
        this.props[name] = value;
        this[name] = value;
    }

    mountTo(range) {
        this.range = range;
        this.update();

        // let range = document.createRange();
        // range.setStartAfter(parent.lastChild);
        // range.setEndAfter(parent.lastChild);
    }

    update() {

        let placeholder = document.createComment("placeholder");
        let range = document.createRange();
        range.setStart(this.range.endContainer, this.reange.endOffset);
        range.setEnd(this.range.endContainer, this.range.endOffset);
        range.insertNode(placeholder);

        this.range.deleteContents();
        let vdom = this.render();
        vdom.mountTo(this.range);

    }

    appendChild(vchild) {
        this.children.push(vchild);
    }

    setState(state) {
        let merge = (oldState, newState) => {
            for (let p of newState) {
                if (typeof newState[p] === 'object') {
                    if (typeof oldState[p] != 'object') {
                        oldState[p] = {};
                    }
                    merge(oldState[p], newState[p]);
                } else {
                    oldState[p] = newState[p];
                }
            }
        }

        if (!this.state && state) {
            this.state = {};
        }
        merge(this.state, state);
        this.update();
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
                    if (!(child instanceof Component) &&
                        !(child instanceof ElementWrapper) &&
                        !(child instanceof TextWrapper)) {
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

        let range = document.createRange();
        if (element.children.length) {
            range.setStartAfter(element.lastChild);
            range.setEndAfter(element.lastChild);
        } else {
            range.setStart(element, 0);
            range.setEnd(element, 0);
        }
        vdom.mountTo(range)
    }
};