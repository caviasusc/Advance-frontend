import './App.css';
import React from 'react';
import List from './components/list';
import Employee from './components/employee'
import { Button, Paper } from '@material-ui/core';

class App extends React.Component {
    state = {
        show: null,
        employee: null,
    }

    onEdit() {
        this.setState({ show: 'update' })
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
                        <List edit={(emp) => this.setState({ show: 'update', employee: emp })} />
                        <br />
                        <div className="buttons">
                            <Button
                                className="newEmp"
                                variant="outlined"
                                color="primary"
                                onClick={() => this.setState({ show: 'create' })}
                            >
                                Nuevo empleado
                            </Button>
                        </div>
                    </Paper>
                    <Paper elevation={3} className="card info">
                        <Employee
                            show={this.state.show}
                            employee={this.state.employee}
                        />
                    </Paper>
                </main>
            </div >
        );
    }
}


export default App;
