import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useEffect } from 'react'


const DeleteSyllabus = ({sylId}) => {
    const navigate = useNavigate()
    useEffect(() => {
        getCo(sylId)
    }, [sylId])

    const [syl, setSyl] = useState(null)

    const getCo = (id) => {
        api.get(`/api/syllabus/${id}/`).
            then((res) => {
                setSyl(res.data)
            }).catch((err) => toast.error(err))

    }


    const handleDeleteCourseOutcome = async () => {
        if (window.confirm(`Are you sure you want to delete ${syl ? syl.year : ""}`)) {
            try {
                await api.delete(`/api/syllabus/delete/${syl ? syl.id : ""}/`)
                toast.error('Syllabus deleted susylessfully')
                navigate(`/courses/${syl ? syl.course : ""}`);
            } catch (err) {
                alert(err)
            }

        }
    }
    return (
        <button className="inline bg-gradient-to-tr mt-2 from-red-500 to-red-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-red-600 hover:to-red-800 shadow-md" onClick={handleDeleteCourseOutcome} >Delete</button>
    )
}

export default DeleteSyllabus