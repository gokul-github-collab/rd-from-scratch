import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa'


const CourseDetail = () => {
    const [course, setCourse] = useState(null)
    const [isSuperuser, setIsSuperuser] = useState(false);
    const {id} = useParams()
    useEffect(() => {
        fetchCourseDetail(id)
        checkSuperuser()
    }, [id])
    const toggleCollapse = (id) => {
        const body = document.getElementById(id);
        body.hidden = !body.hidden;
    };
    
    const fetchCourseDetail = (courseId) => {
        api.get(`/api/courses/${courseId}/`). 
        then(res => setCourse(res.data)).
        catch(err=>console.log(err))
    }

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
    return (
 
  
  
  <>
   
{course && <div>  
    
<section>

<div className="container m-auto mt-5 py-6 px-6">
  <Link to="/courses" className="text-indigo-500 hover:text-indigo-600 flex items-center">
    <FaArrowLeft className='text-indigo-500 mr-2'/>Back to Course Listings
  </Link>
</div>
</section>

<section className="">
<div className="container m-auto py-10 px-6 ">
  <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
    <main>
      <div className="bg-gradient-to-br from-purple-50 via-purple-50 to-indigo-50 bg-opacity-25 p-6 rounded-lg shadow-md text-center md:text-left">
        <div className="text-gray-500 mb-4">{course.type}</div>
        <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
          <FaMapMarker className='text-orange-700 mr-1'/>
          <p className="text-orange-700">{course.location}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 via-purple-50 to-indigo-50 bg-opacity-25 p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-indigo-800 text-lg font-bold mb-6">Course Description</h3>
        <p className="mb-4">{course.description}</p>
        <h3 className="text-indigo-800 text-lg font-bold mb-2">Tuition Fees</h3>
        <p className="mb-4">{course.tuition_fee} / semester</p>
      </div>

      <div className="bg-gradient-to-br from-purple-50 via-purple-50 to-indigo-50 bg-opacity-25 p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-indigo-800 text-lg font-bold mb-6">Course Program Outcomes</h3>
        {course.pos.map((po) => (
            <div>
                {/* <h3 className="text-indigo-800 text-lg font-bold mb-2">Description</h3> */}
                <p className="mb-4">{po.title}</p>
                <p className="mb-4">{po.description}</p>
            </div>
         ))}
    </div>

    </main>


    <aside>
      <div className="bg-gradient-to-br from-purple-50 via-purple-50 to-indigo-50 bg-opacity-25 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">College Info</h3>
        <h2 className="text-2xl">Sri Krishna Arts and Science College</h2>
        <p className="my-2">something something</p>
        <hr className="my-4"/>
        <h3 className="text-xl">Contact Email:</h3>
        <p className="my-2 bg-indigo-100 p-2 font-bold">skasc.ac.in</p>
        <h3 className="text-xl">Contact Phone:</h3>
        <p className="my-2 bg-indigo-100 p-2 font-bold">5555-5555-5555</p>
      </div>

      {isSuperuser && <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-bold mb-6">Manage Course</h3>
        <Link to={`/courses/${course.id}/edit`}
              className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
          Edit Course
        </Link>
        {/* <button onClick={handleDeleteCourse}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
          Delete Course
        </button> */}
      </div>}
    </aside>
  </div>
</div>
</section>

</div>

}
  </>
 
  
  
  
  
  
  
  
  )
}

export default CourseDetail