import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';

const DeletePso = ({ id }) => {
    const navigate = useNavigate();
    const [pso, setPso] = useState(null);

    useEffect(() => {
        getPo(id);
    }, [id]);

    const getPo = (id) => {
        api.get(`/api/psos/${id}/`)
            .then((res) => setPso(res.data))
            .catch((err) => toast.error(err));
    };

    const deletePso = () => {
        if (window.confirm(`Are you sure want to delete ${pso ? pso.title : ""}`)) {
            api.delete(`/api/psos/delete/${id}/`)
                .then(() => {
                    toast.error("Program Outcome Deleted successfully");
                    console.log(pso.course)
                    navigate(`/courses/${pso.course}/`);
                })
                .catch((err) => toast.error(err));
        navigate(`/courses/${pso.course}/`);
            }
        navigate(`/courses/${pso.course}/`);
    };

    return (
        <>
            <button
                onClick={deletePso}
                className="inline-block bg-gradient-to-tr from-red-500 to-red-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-red-600 hover:to-red-800 shadow-md"
            >
                Delete PSO
            </button>
        </>
    );
};

export default DeletePso;
