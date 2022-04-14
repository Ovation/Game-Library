import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router";
import { FriendContext } from "./FriendProvider"


export const FriendForm = () => {
    const {  getFriends, addFriend } = useContext(FriendContext)
    
    const [friend, setFriend] = useState({
        username: "",
    });

    const history = useHistory();

    useEffect(() => {
        getFriends()
    }, [])

    const HandleInput = (event) => {
        const newFriend = { ...friend }
        newFriend[event.target.id] = event.target.value
        setFriend(newFriend)
    }

    const handleSaveFriend = () => {

            const newFriend = {
                id: friend.id,
                username: friend.username,
            }
            addFriend(newFriend)
            .then(() => {history.push("/friends")})
        
    }

return (
<>
<form className="EntryForm">
            <h2 className="FormTitle">Add a Friend</h2>
            <fieldset>
                <div className="friend_form">
                    <label htmlFor="title">username:</label>
                    <input type="text" id="username" className="form" placeholder="friends username here" defaultValue={friend.username} onChange={HandleInput} />
                </div>
                </fieldset>
                <button className="btn btn-primary" onClick={handleSaveFriend}>
                Save Friend to Friends List
            </button>
                </form>
                </>
)
}