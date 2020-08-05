class ElementWrapper {
    constructor(type) {
        this.type = type;
        this.props = Object.create(null);
        this.children = [];
    }

    setAttribute(name, value) {
        this.props[name] = value;
    }

    appendChild(vChild) {
        this.children.push(vChild);
    }

    mountTo(range) {

        this.reange = range;
        range.deleteContents();
        let element = document.createElement(this.type);

        // 设置属性
        for(let name in this.props) {
            let value = this.props[name];

            if (name.match(/^on([\s\S]+)$/)) {
                let eventName = RegExp.$1.replace(/^[\s\S]/, (s) => s.toLowerCase());
                element.addEventListener(eventName, value);
            }
            if (name === 'className') {
                name = "class";
            }
            element.setAttribute(name, value)
        }

        // 设置子节点
        for(let child of this.children) {
            let range = document.createRange();
            if (element.children.length) {
                range.setStartAfter(element.lastChild);
                range.setEndAfter(element.lastChild);
            } else {
                range.setStart(element, 0);
                range.setEnd(element, 0);
            }
            child.mountTo(range);
        }

        range.insertNode(element);

    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
        this.type = "#text";
        this.children = [];
        this.props = Object.create(null);
    }

    mountTo(range) {
        this.range = range;
        range.deleteContents();
        range.insertNode(this.root)
    }
}

export class Component {
    constructor() {
        this.children = [];
        this.props = Object.create(null);
    }

    get type(){
        return this.constructor.name;
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
    }

    update() {
        let vdom = this.render();
        if(this.vdom) {
            let isSameNode = (node1, node2) => {
                if(node1.type !== node2.type) {
                    return false;
                }
                for(let name in node1.props) {
                    if(typeof node1.props[name] === 'function' 
                        && typeof node2.props[name] === 'function'
                        && node1.props[name].toString() === node2.props[name].toString() ) {
                            continue;
                    }
                    if(typeof node1.props[name] === 'object' 
                        && typeof node2.props[name] === 'object'
                        && JSON.stringify(node1.props[name]) === JSON.stringify(node2.props[name])) {
                        continue;
                    } 
                    if(node1.props[name] !== node2.props[name]) {
                        return false;
                    }
                }

                if(Object.keys(node1.props).length != Object.keys(node2.props)) {
                    return false;
                }
                return true;
            }

            let isSameTree = (node1, node2) => {
                if(!isSameNode(node1, node2)) {
                    return false;
                }
                if(node1.children.length !== node2.children.length) {
                    return false;
                }

                for(let i = 0; i < node1.children; i++) {
                    if(!isSameTree(node1.children[i], node2.children[i])) {
                        return false;
                    }
                }
                return true;
            }

            let replace = (newTree, oldTree) => {
                if(isSameTree(newTree, oldTree)) {
                    return;
                }

                if(!isSameNode(newTree, oldTree)) {
                    newTree.mountTo(oldTree.range);
                } else {
    
                    for(let i = 0; i < newTree.children.length; i++) {
                        replace(newTreee.children[i], oldTree.children[i]);
                    }
                }
            };
            replace(vdom, this.vdom);

            console.log("new", vdom);
            console.log("old", this.vdom);
        } else {
            vdom.mountTo(this.range);
        }

        this.vdom = vdom;
    }

    appendChild(vchild) {
        this.children.push(vchild);
    }

    setState(state) {
        let merge = (oldState, newState) => {
            for (let p in newState) {
                if (typeof newState[p] === 'object' && newState[p] !== null) {
                    if (typeof oldState[p] != 'object') {
                        if(newState[p] instanceof Array) {
                            oldState[p] = [];
                        } else {
                            oldState[p] = {};
                        }
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

        // debugger;
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
                    if (typeof child === null || child === void 0) {
                        return;
                    }
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