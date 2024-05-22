import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api';
import SemesterDetail from './SemesterDetail';

const SyllabusDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSuperUser, setIsSuperuser] = useState(false);
  const [syllabus, setSyllabus] = useState(null);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    getSyllabus(id);
    checkSuperuser();
  }, [id]);

  const getSyllabus = (id) => {
    api.get(`/api/syllabus/${id}/`)
      .then((res) => {
        setSyllabus(res.data);
        getCourse(res.data.course);
      })
      .catch((err) => {
        toast.error(err.message || 'Failed to fetch syllabus');
      });
  };

  const checkSuperuser = () => {
    api.get("/api/check_superuser/")
      .then((res) => {
        setIsSuperuser(res.data.is_superuser);
      })
      .catch((err) => {
        console.error("Error checking superuser:", err);
      });
  };

  const getCourse = (courseId) => {
    api.get(`/api/courses/${courseId}/`)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {
        toast.error(err.message || 'Failed to fetch course');
      });
  };

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 lg:items-start">
          <div className="lg:col-span-1 lg:row-span-2">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-indigo-600">{syllabus ? syllabus.year : ""}</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Syllabus for {course ? course.name : ""}</h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                Right from the inception, the curriculum is taught by distinguished faculty members combining academic excellence and real-world experience with dedication and commitment. The department scales with innovatively designed programs which constantly get updated to meet the challenging requirement of the industry and stakeholders. We are proud to see many industries coming back to our department, which sustain to meet the dynamic corporate world.
              </p>
            </div>
          </div>
          <div className="lg:col-span-1 lg:row-span-2">
            <div className="lg:max-w-lg text-base leading-7 text-gray-700">
              {isSuperUser &&
                <Link
                  to={`/add-semester/${syllabus ? syllabus.id : ""}/${course ? course.id : ""}`}
                  className="inline-block bg-gradient-to-tr from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
                >
                  Add Semester
                </Link>
              }
              {syllabus && syllabus.sem && syllabus.sem.map((sem) => (
                <SemesterDetail key={sem.id} semId={sem.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%)',
          }}
        />
      </div>
    </div>
  );
};

export default SyllabusDetail;
