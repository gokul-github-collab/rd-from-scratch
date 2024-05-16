import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const SemesterDetail = ({ semId }) => {
  const [semester, setSemester] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getSemester(semId);
  }, [semId]);

  const getSemester = (id) => {
    api.get(`/api/semester/${id}/`)
      .then((res) => {
        setSemester(res.data);
      })
      .catch((err) => toast.error(err));
  };

  const handleDeleteSemester = async () => {
    if (window.confirm(`Are you sure you want to delete ${semester ? semester.title : ""}`)) {
      try {
        await api.delete(`/api/semester/delete/${semester.id}/`);
        toast.error('Semester deleted successfully');
        navigate(`/syllabus/${semester ? semester.syllabus : ""}`);
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div>
      <p className='text-indigo-800'>{semester ? semester.title : ""}</p>
      <button onClick={handleDeleteSemester} className="inline-block bg-gradient-to-tr from-red-500 to-red-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-red-600 hover:to-red-800 shadow-md">
        Delete Semester
      </button>
      <Link to={`/edit-semester/${semester ? semester.id : ""}`} className="inline-block bg-gradient-to-tr from-purple-500 to-purple-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-purple-600 hover:to-purple-800 shadow-md" >Edit Semester</Link>

      {/* Render subjects */}
      {semester && semester.subjects && (
        <div>
          <p className="font-bold mt-4">Subjects:</p>
          <ul className="list-disc ml-6">
            {semester.subjects.map(subject => (
              <li key={subject.id}>{subject.course_code} - {subject.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SemesterDetail;
