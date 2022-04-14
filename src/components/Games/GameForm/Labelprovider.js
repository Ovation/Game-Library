import React, { useState, createContext } from "react"

export const LabelContext = createContext()


export const LabelProvider = (props) => {
    const [labels, setLabels] = useState([])

    const getLabels = () => {
        return fetch(`http://localhost:8088/labels`)
        .then(res => res.json())
        .then(setLabels)
    }

    return (
        <LabelContext.Provider value={{
            labels, getLabels
        }}>
            {props.children}
        </LabelContext.Provider>
    )
    }