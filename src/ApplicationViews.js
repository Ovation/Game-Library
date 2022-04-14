import React from "react"
import { Route } from "react-router-dom"
import { GameForm } from "./components/Games/GameForm/GameForm"
import { FriendPage } from "./components/Friends/FriendList"
import { FriendForm } from "./components/Friends/FriendForm"
import { GameProvider } from "./components/Games/GameProvider"
import { GameList } from "./components/Games/GameList"
import { WelcomePage } from "./components/Welcome"
import { FriendProvider } from "./components/Friends/FriendProvider"
import { LabelProvider } from "./components/Games/GameForm/Labelprovider"
export const ApplicationViews = () => {
  return (
    <>
      <GameProvider>
        <FriendProvider>
          <LabelProvider>
            <Route exact path="/">
              <WelcomePage />
            </Route>
            <Route exact path="/Games">
              <GameList />
            </Route>
            <Route exact path="/entries/newGame">
              <GameForm />
            </Route>
            <Route path="/games/edit/:GameId(\d+)">
              <GameForm />
            </Route>
            <Route exact path="/Friends">
              <FriendPage />
            </Route>
            <Route exact path="/friends/newFriend">
              <FriendForm />
            </Route>
          </LabelProvider>
        </FriendProvider>
      </GameProvider>
    </>
  )
}
