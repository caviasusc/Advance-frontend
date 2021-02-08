import './App.css';
import React, { useEffect, useState } from 'react';
import List from './components/list';
import Employee from './components/employee'
import { Button, Paper } from '@material-ui/core';


class App extends React.Component {
  state = {
    show: null,
    id:0,
  }

  onEdit(){
    this.setState({show:'update'})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Mi prueba
        </p>
        </header>
        <main>
          <Paper elevation={3} className="card list">
          <List edit={(id) => this.setState({ show: 'update', id:id })}/>
          <br/>
          <div className="buttons">
            <Button className="newEmp" variant="outlined" color="primary" onClick={() => this.setState({show:'create'})}>Nuevo empleado</Button>
            </div>
            </Paper>
          <Paper elevation={3} className="card info">
          <Employee show={this.state.show} id={this.state.id}/>
        </Paper>
        </main>
      </div >
    );
  }
}


export default App;
