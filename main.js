import {ToyReact} from './ToyReact';

class MyComponent {

    render(){
        return <div>cool</div>
    }

    setAttribute(name, value) {
        this[name] = value;
    }

    mountTo(parent){
        let vdom = this.render();
        vdom.mountTo(parent);

    }
}

let a = <MyComponent name="a" id="ida"></MyComponent>

ToyReact.render(a, document.body);

// var a = createElement(MyComponent, {
//     name: 'a'
// })

// let a = <div name="a" id='ids'>
//     <span>hello world</span>
//     <span></span>
//     <span></span>
// </div>

// console.log(a);

// document.body.appendChild(a);


// var a = ToyReact.createElement("div", {
//     name: "a",
//     id: "ids"
//   }, 
//   ToyReact.createElement("span", null, "hello world"), 
//   ToyReact.createElement("span", null), 
//   ToyReact.createElement("span", null));
//   console.log(a);
//   document.body.appendChild(a);