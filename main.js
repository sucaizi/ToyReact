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
    <div>345</div>
    <div>
        <span>678</span>
    </div>
</MyComponent>

ToyReact.render(a, document.body);

// jsx 遍历标签，自动使用createElement转化为vdom对象

// var a = ToyReact.createElement(MyComponent, {
//     name: "a",
//     id: "ida"
//   }, ToyReact.createElement("div", null, "123"));
//   console.log(a);
//   ToyReact.render(a, document.body);

// var a = ToyReact.createElement(MyComponent, {
//     name: "a",
//     id: "ida"
//   }, ToyReact.createElement("div", null, "123"), ToyReact.createElement("div", null, "345"));
//   ToyReact.render(a, document.body);

// var a = ToyReact.createElement(MyComponent, {
//     name: "a",
//     id: "ida"
//   }, ToyReact.createElement("div", null, "123"), 
//     ToyReact.createElement("div", null, "345"), 
//     ToyReact.createElement("div", null, 
//         ToyReact.createElement("span", null, "678"))
//     );
//   ToyReact.render(a, document.body);