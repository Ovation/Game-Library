import "./Games.css"
import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./GameProvider"
import { useHistory } from "react-router-dom"
import { LabelContext } from "./GameForm/Labelprovider"

export const GameList = () => {

  const history = useHistory()
  const { games, getGames, searchTerms, setSearchTerms, DeleteGame } = useContext(GameContext)
  const { labels, getLabels } = useContext(LabelContext)
  const [filteredEntries, setFiltered] = useState([])
  const [selectedLabel, setSelectedLabel] = useState("")

  useEffect(() => { setSearchTerms("") }, [])
  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching games
      if (selectedLabel === '1') {
        const subset = games.filter(game => game.title.toLowerCase().includes(searchTerms.toLowerCase()))
        setFiltered(subset)
      }
      else if (selectedLabel === '2') {
        const subset = games.filter(game => game.subject.toLowerCase().includes(searchTerms.toLowerCase()))
        setFiltered(subset)
      }
      else if (selectedLabel === '3') {
        const subset = games.filter(game => game.body.toLowerCase().includes(searchTerms.toLowerCase()))
        setFiltered(subset)
      }
      else if (selectedLabel === '4') {
        const subset = games.filter(game => game.mood.toLowerCase().includes(searchTerms.toLowerCase()))
        setFiltered(subset)
      }
      else if (selectedLabel === '5') {
        const subset = games.filter(game => game.dateTime.includes(searchTerms))
        setFiltered(subset)
      }
    }


    else {
      // If the search field is blank, display all games
      setFiltered(games)
    }
  }, [searchTerms, games])

  console.log("GameList: useEffect - getGames")


  useEffect(() => {
    getGames()
  }, [])

  useEffect(() => {
    console.log("GameList: useEffect - getGames")
    getLabels()
  }, [])

  const handleControlledInputChange = (event) => {

    const selectedLabel = event.target.value
    setSelectedLabel(selectedLabel)
  }
  const removeEntry = id => () => {
    DeleteGame(id)
      .then(() => {
        history.push("/games")
      })
  }

  return (
    <>
      <h3 className="header_entries">Entries</h3>
      <button onClick={() => history.push("/games/newEntry")}>
        Create an Entry
      </button>
      <div className="Entries">
        <form>
          <label> Filter By: </label>

          <select value={selectedLabel} name="label" className="form-control" onChange={handleControlledInputChange}>
            <option value="0" className="filter_drop_down">All</option>
            {labels.map(l => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>

        </form>
        <input type="text" onKeyUp={(event) => setSearchTerms(event.target.value)}></input>
      </div>
      {filteredEntries.map((game) => {

        return (
          <div className="games" id={`game--${game.id}`}>
            <div className="fullEntry">
              <div className="entryTitle">
                <b>Title: </b>{game.title}
              </div>
              <div className="entrySubject">
                <b>Subject: </b>{game.subject}
              </div>
              <div className="entryBody">
                <b>Body:</b>{game.body}
              </div>
              <div className="entryMood">
                <b>mood:</b>{game.mood}
              </div>
              <div className="entryDate">
                <b>Date created: </b>{game.dateTime}
              </div>
              <div className="entryPublicStatus">
                <b>Public status: </b>{game.isPublic.toString()}
              </div>
              <button onClick={() => {
                history.push(`/games/edit/${game.id}`);
              }}>Edit</button> <button onClick={removeEntry(game.id)}>Delete</button>
            </div>
          </div>
        )
      })}

    </>
  )
}