import React, { useEffect, useState } from 'react'

const Home = () => {
    const [notes, setNotes] = useState([]) 
    const [title, setTitle] = useState("")
    const [content, setContent]  = useState("")

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = () => {
        api.get("/api/notes/").
        then((res) => res.data).
        then((data)=> setNotes(data)). 
        catch((err)=>alert(err))
    } 

    const deleteNote = (id) =>{
        api.delete(`/api/notes/delete/${id}/`).
        then((res) => {

            if(res.staus === 204) alert("Note deleted")
            else alert("Error deleting note")
            getNotes()
        }).catch((err) => alert(err))

    }

    return (
    <>
    
    
    
    
    
    </>
  )
}

export default Home