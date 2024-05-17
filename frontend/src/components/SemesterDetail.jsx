import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const SemesterDetail = ({ semId }) => {
  const [semester, setSemester] = useState(null);
  const navigate = useNavigate();
  const [isSuperUser, setIsSuperuser] = useState(false)

  useEffect(() => {
    getSemester(semId);
    checkSuperuser()
  }, [semId]);

  const getSemester = (id) => {
    api.get(`/api/semester/${id}/`)
      .then((res) => {
        setSemester(res.data);
      })
      .catch((err) => toast.error(err));
  };
  
  const checkSuperuser = () => {
    api.get("/api/check_superuser/")
      .then((res) => {
        console.log("Response from check_superuser:", res);
        setIsSuperuser(res.data.is_superuser);
      })
      .catch((err) => {
        console.error("Error checking superuser:", err);
      });
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
        <Link to={`/add-subject/${semester.id}`} className='inline-block bg-gradient-to-tr from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md' >Add Subject</Link>
          <p className="font-bold mt-4">Subjects:</p>
          <ul className="list-disc ml-6">
            {semester.subjects.map(subject => (
              <li key={subject.id}><Link to={`/subject/${subject.id}`} className='text-indigo-700'>{subject.course_code} - {subject.name}</Link></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


export default SemesterDetail;
