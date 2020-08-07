import React, { Component } from "react";
import Grid from "./components/Grid.component";
import Controller from "./components/Controller.component";
import "./App.css";

interface Cell {
  index: number;
  isAlive: boolean;
  neighbors?: Cell[];
}
interface AppState {
  generationsCount: number;
  cells: Cell[][];
}
class App extends Component<any, AppState> {
  gridSize: number;
  timerID: number;
  interval: number;
  lastTime: number;

  constructor(props: any) {
    super(props);

    this.gridSize = 10;
    this.interval = 1500;
    this.timerID = 0;
    this.lastTime = 0;

    this.state = {
      generationsCount: 0,
      cells: this.createCells(),
    };
  }

  handlePlay = () => {
    const { cells } = this.state;

    const updateCells = (timestamp: any) => {
      if (this.timerID) this.handlePause();

      if (!this.lastTime) {
        this.lastTime = timestamp;
      } else {
        const duration = timestamp - this.lastTime;

        if (duration < this.interval) {
          this.timerID = window.requestAnimationFrame(updateCells);
          return;
        } else {
          this.lastTime = timestamp;
        }
      }

      for (const [rowID, row] of cells.entries()) {
        for (const [colID, cell] of row.entries()) {
          let neighbors = [row[colID + 1], row[colID - 1]];

          cells[rowID - 1] &&
            neighbors.push(
              ...cells[rowID - 1]?.filter(
                (_, index: number): boolean => Math.abs(colID - index) <= 1
              )
            );

          cells[rowID + 1] &&
            neighbors.push(
              ...cells[rowID + 1]?.filter(
                (_, index: number): boolean => Math.abs(colID - index) <= 1
              )
            );

          neighbors = neighbors.filter(
            (cell: Cell): boolean => cell && cell.isAlive
          );

          cell.isAlive = cell.isAlive
            ? neighbors.length > 1 && neighbors.length < 4
            : neighbors.length === 3;
        }
      }

      this.setState((prevState) => ({
        cells,
        generationsCount: prevState.generationsCount + 1,
      }));

      this.timerID = window.requestAnimationFrame(updateCells);
    };

    window.requestAnimationFrame(updateCells);
  };

  handlePause = () => {
    window.cancelAnimationFrame(this.timerID);
  };

  handleReset = () => {
    this.handlePause();
    this.lastTime = 0;
    this.setState({
      generationsCount: 0,
      cells: this.createCells(),
    });
  };

  createCells() {
    return Array.from({ length: this.gridSize }, (_, rowID) =>
      Array(this.gridSize)
        .fill(0)
        .map((_, colID) => ({
          index: parseInt(`${rowID}${colID}`),
          isAlive: Math.random() < 0.4,
        }))
    );
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Game of Life</h1>
          <h3 className='generation'>
            Generations: {this.state.generationsCount}
          </h3>
        </header>
        <main className='main-content'>
          <section className='controller'>
            <Controller
              handlePlay={this.handlePlay}
              handlePause={this.handlePause}
              handlerReset={this.handleReset}
            />
          </section>
          <Grid cells={this.state.cells} />
        </main>
      </div>
    );
  }
}

export default App;
