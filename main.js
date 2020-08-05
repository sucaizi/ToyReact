import {ToyReact, Component} from './ToyReact';

// class MyComponent extends Component {

//     render(){
//         return <div>
//             <span>hello</span>
//             <span> world</span>
//                 {true}
//                 {this.children}
//             </div>;
//     }

//     setAttribute(name, value) {
//         this[name] = value;
//     }

//     mountTo(parent){
//         let vdom = this.render();
//         vdom.mountTo(parent);
//     }
// }

// let a = <MyComponent name="a" id="ida">
//     <div>123</div>
//     <div>345</div>
//     <div>
//         <span>678</span>
//     </div>
// </MyComponent>

class Square extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
    }

    render() {
        return (
            <button className="square" onClick={() => this.setState({value: 'x'})}>
                {this.state.value ? this.state.value : ""}
            </button>
        );
    }
}

class Board extends Component {
    renderSquare(i) {
        return <Square value={i} />;
    }

    render(){
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

let a = <Board/>;

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