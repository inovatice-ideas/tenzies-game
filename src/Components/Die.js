import React from "react"
import ReactDOM from "react-dom"
import "../styles.css"

export default function Die(props) {
    const styles = props.isHeld==true?{backgroundColor: "#59E391"}:{backgroundColor: "white"}
    return (
        <div className="die-design" style={styles} onClick={props.holdDice}>
            <h2 className="die-number">{props.value}</h2>
        </div>
    )
}