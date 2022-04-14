import "./GameForm.css"
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router";
import { GameContext } from "../GameProvider"


export const GameForm = () => {
    const { getGames, addGame, EditGame, getGameById } = useContext(GameContext)
    const { gameId } = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const [game, setGame] = useState({

        title: "",
        description: "",
        date: 1648920896802,
        isFavorite: false
    });

    const history = useHistory();

    useEffect(() => {
        getGames()
    }, [])
    useEffect(() => {

        if (gameId) {
            getGameById(parseInt(gameId))
                .then(game => {
                    setGame(game)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }

    }, [])
    const HandleInput = (event) => {
        const newGame = { ...game }
        newGame[event.target.id] = event.target.value
        setGame(newGame)
    }

    const saveGame = () => {

        if (gameId) {

            EditGame({
                id: game.id,
                title: game.title,
                description: game.description,
                date: game.dateTime,
                isFavorite: game.isFavorite,
            }).then(() => history.push(`/games/edit/${game.id}`))
        }

        const newGame = {
            id: game.id,
            title: game.title,
            description: game.descrption,
            date: game.dateTime,
            isFavorite: game.isFavorite
        }
        addGame(newGame)
            .then(() => { history.push("/entries") })
    }







    return (
        <form className="GameForm">
            <h2 className="FormTitle">New Game</h2>
            <fieldset>
                <div className="entry_form">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" className="form" placeholder="game title" value={game.title} onChange={HandleInput} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="body">Description:</label>
                    <input type="text" id="body" className="form" placeholder="your game here" value={game.description} onChange={HandleInput} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="dateTime" className="form" placeholder="date" value={game.dateTime} onChange={HandleInput} />
                </div>
                <div>
                    <input type="checkbox" id="isFavorite" name="FavoriteList" checkedValue={game.isFavorite} value="true" onChange={HandleInput}>
                    </input>
                    <label htmlFor="public?">Favorite This Game</label>

                </div>
            </fieldset>

            <button className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                    saveGame()
                }}>
                {gameId ? <>Save Entry</> : <>Add Entry</>}
            </button>
            <button onClick={() => history.push("/entries")}>
                Back
        </button>
        </form>
    )
}