import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useEffect } from 'react'


const DeleteSubject = ({ subId }) => {
    const navigate = useNavigate()
    useEffect(() => {
        getCo(subId)
    }, [subId])

    const [sub, setSub] = useState(null)

    const getCo = (id) => {
        api.get(`/api/subject/${id}/`).
            then((res) => {
                setSub(res.data)
            }).catch((err) => toast.error(err))

    }


    const handleDeleteCourseOutcome = async () => {
        if (window.confirm(`Are you sure you want to delete ${sub ? sub.year : ""}`)) {
            try {
                await api.delete(`/api/subject/delete/${sub ? sub.id : ""}/`)
                toast.error('Subject deleted successfully')
                navigate(`/syllabus/${sub ? sub.syllabus : ""}`);
            } catch (err) {
                alert(err)
            }

        }
    }
    return (
        <button className="inline bg-gradient-to-tr mt-2 from-red-500 to-red-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-red-600 hover:to-red-800 shadow-md" onClick={handleDeleteCourseOutcome} >Delete</button>
    )
}

export default DeleteSubject