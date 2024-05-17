import { useEffect, useState } from 'react'
import api from '../api'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import DeleteCourseOutcome from './DeleteCourseOutcome'
import DeleteCourseContent from './DeleteCourseContent'
import DeleteTextBookReference from './DeleteTextBookReference'
import DeleteReferenceBook from './DeleteReferenceBook'
import DeleteWebReference from './DeleteWebReference'
import DeleteOnlineReference from './DeleteOnlineReference'
import { PDFDownloadLink } from '@react-pdf/renderer';
import SubjectDetailPDF from './SubjectDetailPDF';

export default function SubjectDetail() {
  const { id } = useParams()

  useEffect(() => {
    checkSuperuser()
    getSubject(id)
  }, [id])

  const navigate = useNavigate()

  
  
  const [subject, setSubject] = useState(null)
  

  const [isSuperuser, setIsSuperuser] = useState(false)

  const checkSuperuser = () => {
    api.get(`/api/check_superuser/`).
      then((res) => setIsSuperuser(res.data.is_superuser)).
      catch((err) => toast.error(err))
  }

  const handleDeleteSubject = () => {
    console.log(subject? subject.id: "")
    if (window.confirm(`Are you sure you want to delete ${subject? subject.name: ""}`)) {
      try {
        api.delete(`/api/subject/delete/${subject? subject.id: ""}/`)
        toast.error('Subject deleted successfully')
        navigate(`/courses`);
      } catch (err) {
        alert(err)
      }

    }
  }

  const getSubject = (id) => {
    api.get(`/api/subject/${id}/`).
      then((res) => setSubject(res.data)).
      catch(err => toast.error(err))
  }
  return (
    <div className='mt-20 p-5'>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">{subject ? subject.name : ""} <Link to={`/edit-subject/${subject? subject.id: ""}`} className='inline-block bg-gradient-to-tr mt-2 from-purple-500 to-purple-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-purple-600 hover:to-purple-800 shadow-md'>Edit</Link> <button className='inline-block bg-gradient-to-tr mt-2 from-red-500 to-red-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-red-600 hover:to-red-800 shadow-md'onClick={handleDeleteSubject}>Delete</button>  </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Subject name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{subject ? subject.name : ""}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Course Code</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{subject ? subject.course_code : ""}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Lecture Tutorial Practical Credit</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{subject ? subject.ltpc : ""}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Prerequisite</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{subject ? subject.prerequisite : ""}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Internal Mark</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{subject ? subject.internal_mark : ""}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">External Mark</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{subject ? subject.external_mark : ""}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="text-sm font-medium leading-6 text-gray-900">
              <p>Course Outcome</p>
              <Link to={`/add-course-outcome/${subject ? subject.id : ""}`} className="inline-block bg-gradient-to-tr from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md" >Add Course Outcome</Link>
            </div>

            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Co
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      U / AP
                    </th>
                    {isSuperuser &&
                      <th scope="col" className="px-6 py-3">
                        Edit or Delete
                      </th>

                    }
                  </tr>

                </thead>
                <tbody>

                  {subject && subject.co && subject.co.map((co) => (
                    <tr key={co.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4">{co.title}</td>
                      <td className="px-6 py-4">{co.description}</td>
                      <td className="px-6 py-4">{co.uap}</td>
                      <td className="px-6 py-4">
                        {isSuperuser &&
                          <Link to={`/edit-course-outcome/${co.id}`} className="inline-block bg-gradient-to-tr mt-2 from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md" >Edit</Link>
                        }
                        {isSuperuser &&
                          <DeleteCourseOutcome coId={co.id} />
                        }</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Course Content*/}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
  <div className="text-sm font-medium leading-6 text-gray-900">
    <p>Course Content</p>
    <Link
      to={`/add-course-content/${subject ? subject.id : ""}`}
      className="inline-block bg-gradient-to-tr from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
    >
      Add Course Content
    </Link>
  </div>

  <div className="relative overflow-x-auto sm:col-span-2">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Module
          </th>
          <th scope="col" className="px-6 py-3">
            Title
          </th>
          <th scope="col" className="px-6 py-3">
            Description
          </th>
          <th scope="col" className="px-6 py-3">
            Hours Per Week
          </th>
          {isSuperuser && (
            <th scope="col" className="px-6 py-3">
              Edit or Delete
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {subject?.cc?.map((cc) => (
          <tr
            key={cc.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td className="px-6 py-4">{cc.module}</td>
            <td className="py-4">{cc.title}</td>
            <td className="w-1/2 py-4">{cc.description}
          
            </td>
            <td className="px-6 py-4">{cc.hrs_pw}</td>
            {isSuperuser && (
              <td className="px-6 py-4">
                <Link
                  to={`/edit-course-content/${cc.id}`}
                  className="inline-block bg-gradient-to-tr mt-2 from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
                >
                  Edit
                </Link>
                <DeleteCourseContent ccId={cc.id} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

          {/* Text Book Reference */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
  <div className="text-sm font-medium leading-6 text-gray-900">
    <p>Text Book Reference</p>

    <Link
      to={`/add-text-book/${subject ? subject.id : ""}`}
      className="inline-block bg-gradient-to-tr from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
    >
      Add  Text Book Reference
    </Link>

  </div>

  <div className="relative overflow-x-auto sm:col-span-2">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            S. no
          </th>
          <th scope="col" className="">
            Book Name
          </th>

          {isSuperuser && (
            <th scope="col" className="px-6 py-3">
              Edit or Delete
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {subject?.tb?.map((tb) => (
          <tr
            key={tb.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td className="px-6 py-4">{tb.sno}</td>
            <td className="py-4">{tb.name}</td>

            {isSuperuser && (
              <td className="px-6 py-4">
                <Link
                  to={`/edit-text-book/${tb.id}`}
                  className="inline-block bg-gradient-to-tr mt-2 from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
                >
                  Edit
                </Link>
                <DeleteTextBookReference tbId={tb.id} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>



  
</div>

{/* Reference Book */}

<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
  <div className="text-sm font-medium leading-6 text-gray-900">
    <p>Reference Book</p>

    <Link
      to={`/add-reference-book/${subject ? subject.id : ""}`}
      className="inline-block bg-gradient-to-tr from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
    >
      Add Reference Book
    </Link>

  </div>

  <div className="relative overflow-x-auto sm:col-span-2">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            S. no
          </th>
          <th scope="col" className="">
            Book Name
          </th>

          {isSuperuser && (
            <th scope="col" className="px-6 py-3">
              Edit or Delete
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {subject?.rb?.map((rb) => (
          <tr
            key={rb.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td className="px-6 py-4">{rb.sno}</td>
            <td className="py-4">{rb.name}</td>

            {isSuperuser && (
              <td className="px-6 py-4">
                <Link
                  to={`/edit-reference-book/${rb.id}`}
                  className="inline-block bg-gradient-to-tr mt-2 from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
                >
                  Edit
                </Link>
                <DeleteReferenceBook rbId={rb.id} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>



  
</div>
  

{/* Web References  */}
<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
  <div className="text-sm font-medium leading-6 text-gray-900">
    <p>Web Reference</p>

    <Link
      to={`/add-web-reference/${subject ? subject.id : ""}`}
      className="inline-block bg-gradient-to-tr from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
    >
      Add Web Reference
    </Link>

  </div>

  <div className="relative overflow-x-auto sm:col-span-2">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            S. no
          </th>
          <th scope="col" className="">
            URL
          </th>

          {isSuperuser && (
            <th scope="col" className="px-6 py-3">
              Edit or Delete
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {subject?.wr?.map((wr) => (
          <tr
            key={wr.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td className="px-6 py-4">{wr.sno}</td>
            <td className="py-4">{wr.url}</td>

            {isSuperuser && (
              <td className="px-6 py-4">
                <Link
                  to={`/edit-web-reference/${wr.id}`}
                  className="inline-block bg-gradient-to-tr mt-2 from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
                >
                  Edit
                </Link>
                <DeleteWebReference wrId={wr.id} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>



  
</div>


{/* Online References  */}
<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
  <div className="text-sm font-medium leading-6 text-gray-900">
    <p>Online Reference</p>

    <Link
      to={`/add-online-reference/${subject ? subject.id : ""}`}
      className="inline-block bg-gradient-to-tr from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
    >
      Add Online Reference
    </Link>

  </div>

  <div className="relative overflow-x-auto sm:col-span-2">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            S. no
          </th>
          <th scope="col" className="">
            URL
          </th>

          {isSuperuser && (
            <th scope="col" className="px-6 py-3">
              Edit or Delete
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {subject?.oref?.map((oref) => (
          <tr
            key={oref.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td className="px-6 py-4">{oref.sno}</td>
            <td className="py-4">{oref.url}</td>

            {isSuperuser && (
              <td className="px-6 py-4">
                <Link
                  to={`/edit-online-reference/${oref.id}`}
                  className="inline-block bg-gradient-to-tr mt-2 from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
                >
                  Edit
                </Link>
                <DeleteOnlineReference orefId={oref.id} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>



  
</div>

{console.log(`Subject ID: ${subject? subject.id: ""}`)}
<aside>
<div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Subject Details</h1>
        <PDFDownloadLink
            document={<SubjectDetailPDF sid={subject? subject.id: ""} />}
            fileName="subject-details.pdf"
            style={{
                textDecoration: 'none',
                padding: '10px 20px',
                color: '#fff',
                backgroundColor: '#007BFF',
                border: 'none',
                borderRadius: '4px',
            }}
        >
            {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>
    </div>
</aside>

{/* 
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">About</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
              qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
              pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div> */}
        </dl>
      </div>
    </div>
  )
}
