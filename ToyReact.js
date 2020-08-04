class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    //    element.setAttribute(name, attributes[name])
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
        this.root = document.createElement(content);
    }

    appendChild(vChild) {
        vChild.mountTo(this.root)
    } 

    mountTo(parent) {
        parent.appendChild(this.root)
    }
}

export let ToyReact = {
    createElement(type, attributes, ...children){
        let element; 
        if(typeof type === 'string') {
            element = new TextWrapper(type);
        } else {
            element = new type;
        }
        for(let name in attributes) {
            element.setAttribute(name, attributes[name])
        }

        for(let child of children) {
            if(typeof child === 'string') {
                child = new TextWrapper(child);
            }
            element.appendChild(child);
        }
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