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

// class Square extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             value: null
//         };
//     }

//     render() {
//         return (
//             <button className="square" onClick={() => this.setState({value: 'x'})}>
//                 {this.state.value ? this.state.value : ""}
//             </button>
//         );
//     }
// }

// class Board extends Component {
//     renderSquare(i) {
//         return <Square value={i} />;
//     }

//     render(){
//         return (
//             <div>
//                 <div className="board-row">
//                     {this.renderSquare(0)}
//                     {this.renderSquare(1)}
//                     {this.renderSquare(2)}
//                 </div>
//                 <div className="board-row">
//                     {this.renderSquare(3)}
//                     {this.renderSquare(4)}
//                     {this.renderSquare(5)}
//                 </div>
//                 <div className="board-row">
//                     {this.renderSquare(6)}
//                     {this.renderSquare(7)}
//                     {this.renderSquare(8)}
//                 </div>
//             </div>
//         )
//     }
// }

// let a = <Board/>;

// ToyReact.render(a, document.body);
class Square extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className="square" onClick={this.props.onClick}>
              {this.props.value ? this.props.value : ""}
            </button>
          ); 
    }
}
// function Square(props) {
//     return (
//       <button className="square" onClick={props.onClick}>
//         {props.value}
//       </button>
//     );
//   }
  
  class Board extends Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
      };
    }
  
    handleClick(i) {
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
    }
  
    renderSquare(i) {
      return (
        <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
      );
    }
  
    render() {
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      return (
        <div>
          <div className="status">{status}</div>
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
      );
    }
  }
  
  class Game extends Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
let game = <Game/>
console.log(game.vdom);

//   ToyReact.render(
    // <Game />,
    // document.body
//   );
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }




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