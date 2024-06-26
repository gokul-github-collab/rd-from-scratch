import React, { useState } from 'react';
import { FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CourseItem = ({ course }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  let description = course.description;

  if (!showFullDescription) {
    description = description.substring(0, 90) + '...';
  }

  return (


    <div className="bg-gradient-to-br from-purple-50 via-purple-50 to-indigo-50 bg-opacity-25 rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{course.type}</div>
          <h3 className="text-xl font-bold">{course.name}</h3>
        </div>

        <div className="mb-5">{description}</div>
        <button
          onClick={() => setShowFullDescription((prevState) => !prevState)}
          className="text-indogo-500 mb-5 hover:text-indigo-600"
        >
          {showFullDescription ? 'Less' : 'More'}
        </button>


        {/* <h3 className="text-indigo-500 mb-2">{course.tuition_fee} / year</h3> */}

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            <FaMapMarker className='inline text-lg mb-1 mr-1 ' />
            {course.location}
          </div>
          <Link
            to={`/courses/${course.id}`}
            className="h-[36px] bg-gradient-to-br from-indigo-300 to-indigo-500 hover:from-indigo-500 hover:to-indigo-300 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  )
    ;
};

export default CourseItem;
