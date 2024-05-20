import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';
import NotFound from '../pages/NotFound';

const AddSubject = () => {
  const [isSuperUser, setIsSuperuser] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getOneSemester(id);
    checkSuperuser();
  }, [id]);

  const [onesemester, setOneSemester] = useState(null);
  const [name, setName] = useState("");
  const [course_code, setCourseCode] = useState("");
  const [semester, setSemester] = useState("");
  const [ltpc, setLtpc] = useState("");
  const [prerequisite, setPrerequisite] = useState("");
  const [external_mark, setExternalMark] = useState("");
  const [internal_mark, setInternalMark] = useState("");
  const [t_or_p, setTORP] = useState("Theory");
  const [choices] = useState([
    { label: "Theory", value: "Theory" },
    { label: "Practical", value: "Practical" },
    { label: "Theory and Practical", value: "Theory and Practical" }
  ]);

  const getOneSemester = (id) => {
    api.get(`/api/semester/${id}/`)
      .then((res) => setOneSemester(res.data))
      .catch((err) => toast.error(err));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const createSubject = {
      name,
      course_code,
      semester: onesemester ? onesemester.id : "",
      ltpc,
      prerequisite,
      external_mark,
      internal_mark,
      t_or_p
    };

    api.post(`/api/subject/`, createSubject)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Subject created successfully");
          navigate(`/syllabus/${onesemester ? onesemester.syllabus : ""}`);
        } else {
          toast.error("Error creating subject");
        }
      })
      .catch((err) => toast.error(err));
  };

  return (
    <>
      {isSuperUser ? (
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div
            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            aria-hidden="true"
          >
            <div
              className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">Add Course</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Aute magna irure deserunt veniam aliqua magna enim voluptate.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                  Subject Name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="course_code" className="block text-sm font-semibold leading-6 text-gray-900">
                  Course Code
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="course_code"
                    id="course_code"
                    value={course_code}
                    onChange={(e) => setCourseCode(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="semester" className="block text-sm font-semibold leading-6 text-gray-900">
                  Semester No
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="semester"
                    id="semester"
                    value={onesemester ? onesemester.title : ""}
                    onChange={(e) => setSemester(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="ltpc" className="block text-sm font-semibold leading-6 text-gray-900">
                  Lecture Tutorial Practical Credit
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="ltpc"
                    id="ltpc"
                    value={ltpc}
                    onChange={(e) => setLtpc(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="prerequisite" className="block text-sm font-semibold leading-6 text-gray-900">
                  Prerequisite
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="prerequisite"
                    id="prerequisite"
                    value={prerequisite}
                    onChange={(e) => setPrerequisite(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="external_mark" className="block text-sm font-semibold leading-6 text-gray-900">
                  External Mark
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="external_mark"
                    id="external_mark"
                    value={external_mark}
                    onChange={(e) => setExternalMark(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="internal_mark" className="block text-sm font-semibold leading-6 text-gray-900">
                  Internal Mark
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="internal_mark"
                    id="internal_mark"
                    value={internal_mark}
                    onChange={(e) => setInternalMark(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="t_or_p" className="block text-sm font-semibold leading-6 text-gray-900">
                  Theory or Practical
                </label>
                <div className="mt-2.5">
                  <select
                    name="t_or_p"
                    id="t_or_p"
                    value={t_or_p}
                    onChange={(e) => setTORP(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>Select an option</option>
                    {choices.map((choice) => (
                      <option key={choice.value} value={choice.value}>
                        {choice.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Subject
              </button>
            </div>
          </form>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default AddSubject;
