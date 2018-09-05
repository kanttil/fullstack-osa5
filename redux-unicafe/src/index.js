import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = () => {
    const palautteet = store.getState()
    const palautteita = palautteet.good + palautteet.ok + palautteet.bad

    if (palautteita === 0) {
        return (
            <div>
                <h2>statistiikka</h2>
                <div>ei yhtään palautetta annettu</div>
            </div>
        )
    }

    const keskiarvo = ((palautteet.good - palautteet.bad) / palautteita).toFixed(1)
    const positiivisia = (palautteet.good / palautteita * 100).toFixed(1) + ' %'

    return (
        <div>
            <h2>statistiikka</h2>
            <table>
                <tbody>
                    <tr>
                        <td>hyvä</td>
                        <td>{palautteet.good}</td>
                    </tr>
                    <tr>
                        <td>neutraali</td>
                        <td>{palautteet.ok}</td>
                    </tr>
                    <tr>
                        <td>huono</td>
                        <td>{palautteet.bad}</td>
                    </tr>
                    <tr>
                        <td>keskiarvo</td>
                        <td>{keskiarvo}</td>
                    </tr>
                    <tr>
                        <td>positiivisia</td>
                        <td>{positiivisia}</td>
                    </tr>
                </tbody>
            </table>

            <button onClick={() => store.dispatch({ type: 'ZERO' })}>nollaa tilasto</button>
        </div>
    )
}

class App extends React.Component {
    klik = (nappi) => () => {
        store.dispatch({ type: nappi })
    }

    render() {
        return (
            <div>
                <h2>anna palautetta</h2>
                <button onClick={this.klik('GOOD')}>hyvä</button>
                <button onClick={this.klik('OK')}>neutraali</button>
                <button onClick={this.klik('BAD')}>huono</button>
                <Statistiikka />
            </div>
        )
    }
}

const render = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)