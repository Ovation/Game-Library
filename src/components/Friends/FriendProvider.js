import React, { useState, createContext } from "react"

export const FriendContext = createContext()


export const FriendProvider = (props) => {
    const [Friends, setFriends] = useState([])

    const getFriends = () => {
        return fetch(`http://localhost:8088/friends`)
        .then(res => res.json())
        .then(setFriends)
    }

    const addFriend = friend => {
        return fetch(`http://localhost:8088/friends`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(friend)
        })
    }

    const EditFriend = friend => {
        return fetch(`http://localhost:8088/friends`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(friend)
        })
    }

    const DeleteFriend = friendId => {
        return fetch(`http://localhost:8088/friends/${friendId}`, {
            method: "DELETE"
            
        })
        .then(getFriends)
    }

    const getFriendById = (id) => {
        return fetch(`http://localhost:8088/friends/${id}`)
        .then(res => res.json())
    }




    return (
        <FriendContext.Provider value={{
            Friends, getFriends, addFriend, getFriendById, EditFriend, DeleteFriend
        }}>
            {props.children}
        </FriendContext.Provider>
    )
}