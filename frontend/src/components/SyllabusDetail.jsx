import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api';
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import Ai from '../assets/images/Ai.jpg'
import Ai1 from '../assets/images/Ai1.png'
import SemesterDetail from './SemesterDetail';
import { Link } from 'react-router-dom';
const SyllabusDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSuperUser, setIsSuperuser] = useState(false)
  const [syllabus, setSyllabus] = useState(null);
  const [course, setCourse] = useState(null);

  const [title, setTitle] = useState("")


  useEffect(() => {
    getSyllabus(id);
    checkSuperuser()
  }, [id]);

  const getSyllabus = (id) => {
    api.get(`/api/syllabus/${id}/`)
      .then((res) => {
        setSyllabus(res.data);
        // Once the syllabus is fetched, get the course details
        getCourse(res.data.course);
      })
      .catch((err) => {
        toast.error(err.message || 'Failed to fetch syllabus');
      });
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
    <>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-8xl ">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">

          </div>

          {/* */}






          <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <svg
                className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                    width={200}
                    height={200}
                    x="50%"
                    y={-1}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M100 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                  <path
                    d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                    strokeWidth={0}
                  />
                </svg>
                <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
              </svg>
            </div>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
              <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                <div className="lg:pr-4">
                  <div className="lg:max-w-lg">
                    <p className="text-base font-semibold leading-7 text-indigo-600"> {syllabus ? syllabus.year : ""}</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Syllabus for {course ? course.name : ""}</h1>
                    <p className="mt-6 text-xl leading-8 text-gray-700">
                      Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam
                      eget aliquam. Quisque id at vitae feugiat egestas.
                    </p>
                  </div>
                </div>
              </div>
              <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                <img
                  className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                  src={Ai1}
                  alt=""
                />
              </div>
              <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                <div className="lg:pr-4">
                  <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">


                    <Link
                      to={`/add-semester/${syllabus ? syllabus.id : ""}/${course ? course.id : ""}`}
                      className="inline-block bg-gradient-to-tr from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
                    >
                      Add Semester
                    </Link>
                    {syllabus && syllabus.sem && syllabus.sem.map((sem) => (
                      <SemesterDetail key={sem.id} semId={sem.id} />

                    ))}


                  </div>
                </div>
              </div>
            </div>
          </div>


























          {/* */}


        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%)',
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SyllabusDetail;
