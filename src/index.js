import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){    
  return (
    <button 
      className="square" 
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state={
      squares:Array(9).fill(null),
      xIsNext:true,
    }
  }
  renderSquare(i) {
    return <Square 
      value={this.state.squares[i]}
      onClick={()=>this.handleClick(i)}
    />;
  }
  handleClick(i){
    const squares=this.state.squares.slice(); //copy the array
    const winner=calculateWinner(squares);
    const draw=isDraw(squares);
    if(draw || winner || squares[i]){
      return;
    }else{
          squares[i]=this.state.xIsNext?'X':'O';
          this.setState({
            squares:squares,
            xIsNext:!this.state.xIsNext,
          });
    }
  }

  render() {
    const winner=calculateWinner(this.state.squares);
    const draw=isDraw(this.state.squares);
    let status = 'Next player: '+(this.state.xIsNext?'X':'O');
    if(draw){
      status='It´s a draw';
    }
    if(winner){
      status='Winner is '+winner;
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

class Game extends React.Component {
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

function isDraw(squares) {
  const winner=calculateWinner(squares);
  if(winner){
    return false;
  }
  for(let i=0;i<squares.length;i++){
    if(squares[i]==null){
      return false;
    }
  }
  return true;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);