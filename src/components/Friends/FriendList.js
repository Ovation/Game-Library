import "./Friends.css"
import React, { useContext, useEffect, useState } from "react"
import { FriendContext, FriendProvider } from "./FriendProvider"
import { useHistory } from "react-router-dom"
import { GameContext } from "../Games/GameProvider"

export const FriendPage = () => {

  const history = useHistory()
  const { Friends, getFriends, DeleteFriend } = useContext(FriendContext)
  const { games, getGames, DeleteGame } = useContext(GameContext)
  const [publicEntries, setPublicEntries] = useState([])
  const [friend, setFriend] = useState([])
  useEffect(() => {
    getFriends()
  }, [])

  useEffect(() => {
    getGames()
  }, [])

  useEffect(() => {
    const publicEntries = games.filter(game => game.isFavorite === "true")
    setPublicEntries(publicEntries)
  }, [games])

  const removeFriend = id => () => {
    DeleteFriend(id)
      .then(() => {
        history.push("/friends")
      })
  }

  const removeGame = id => () => {
    DeleteGame(id)
      .then(() => {
        history.push("/games")
      })
  }

  return (
    <>
      <h3 className="header_friends">Friends and The Posts They Can See</h3>
      <div className="friends_window">
        <button onClick={() => history.push("/friends/newFriend")}>
          Add a friend

        </button>
        {Friends.map((friend) => {


          return (
            <>
              <div className="friends_list" id={`friend--${friend.id}`}>
                <div className="username">
                  username: {friend.username}
                  <button onClick={removeFriend(friend.id)}>Unfollow</button>
                </div>
                <div>
                </div>
              </div>
            </>
          )
        })}
      </div>
      <div>
        {publicEntries.map(game => {
          return (
            <>
              <div className="games">
                <div><b>title:</b>{game.title} </div>
                <div><b>description:</b>{game.description} </div>
                <div><b>date:</b>{game.dateTime} </div>
                <div><b>Favorite:</b>{game.isFavorite} </div>
                <button onClick={() => {
                  history.push(`/games/edit/${game.id}`);
                }}>Edit</button>
                <button onClick={removeGame()}>Delete</button>
              </div>
            </>
          )

        })}
      </div>
    </>
  )


}