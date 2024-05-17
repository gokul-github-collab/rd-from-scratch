import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useEffect } from 'react'


const DeleteTextBookReference = ({tbId}) => {
    const navigate = useNavigate()
    useEffect(() => {
        getCo(tbId)
    }, [tbId])

    const [tb, setTb] = useState(null)

    const getCo = (id) => {
        api.get(`/api/text-book/${id}/`).
            then((res) => {
                setTb(res.data)
            }).catch((err) => toast.error(err))

    }


    const handleDeleteCourseOutcome = async () => {
        if (window.confirm(`Are you sure you want to delete ${tb ? tb.name : ""}`)) {
            try {
                await api.delete(`/api/text-book/delete/${tb ? tb.id : ""}/`)
                toast.error('Text Book deleted sutbessfully')
                navigate(`/subject/${tb ? tb.subject : ""}`);
            } catch (err) {
                alert(err)
            }

        }
    }
    return (
        <button className="inline bg-gradient-to-tr mt-2 from-red-500 to-red-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-red-600 hover:to-red-800 shadow-md" onClick={handleDeleteCourseOutcome} >Delete</button>
    )
}

export default DeleteTextBookReference