import {ToyReact, Component} from './ToyReact';

class MyComponent extends Component {

    render(){
        return <div>
            <span>hello</span>
            <span> world</span>
                {true}
                {this.children}
            </div>;
    }

    setAttribute(name, value) {
        this[name] = value;
    }

    mountTo(parent){
        let vdom = this.render();
        vdom.mountTo(parent);
    }
}

let a = <MyComponent name="a" id="ida">
    <div>123</div>
</MyComponent>

ToyReact.render(a, document.body);