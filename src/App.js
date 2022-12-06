import React from "react"
import ReactDOM from "react-dom"
import "./styles.css"
import Die from "./Components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstvalue = dice[0].value
        const sameValue = dice.every(die => die.value === firstvalue)
        if(allHeld && sameValue) {
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6), 
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(oldDie => 
                oldDie.isHeld? oldDie : generateNewDie()
            ))
        }
        else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }

    function holdDice(id) {
        setDice(die => {
            return die.map((dice)=> {
                return (
                    dice.id === id? {...dice, isHeld: !dice.isHeld}: dice
                )
            })
        })
    }

    const diceElement = dice.map(die => 
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)} />
    )

    return (
        <main className="main-body">
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="die-container">
                {diceElement}
            </div>
            <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game":"Roll"}</button>
        </main>
    )
}