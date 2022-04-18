import React, { useState, createContext } from "react"
import { useEffect } from "react/cjs/react.development"

export const GameContext = createContext()


export const GameProvider = (props) => {
    const [games, setGames] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    const getGames = () => {
        return fetch("http://localhost:8000/games", {
            headers: {
                Authorization: `Token ${localStorage.getItem("gamer_id")}`,
            },
        })
        .then((res) => res.json())
        .then(setGames)
    }


    const addGame = game => {
        return fetch(`http://localhost:8000/games`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
    }

    const getGameById = (id) => {
        return fetch(`http://localhost:8000/games/${id}`)
            .then(result => result.json())
    }

    const EditGame = game => {
        return fetch(`http://localhost:8000/games/${game.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)

        })
    }
    const DeleteGame = entryId => {
        return fetch(`http://localhost:8000/games/${entryId}`, {
            method: "DELETE"
        })
            .then(getGames)

    }


    return (
        <GameContext.Provider value={{
            games, getGames, addGame, getGameById, searchTerms, setSearchTerms, EditGame, DeleteGame
        }}>
            {props.children}
        </GameContext.Provider>
    )
}