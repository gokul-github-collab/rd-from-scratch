import React from 'react'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import NotFound from '../pages/NotFound'

const EditOnlineReference = () => {


    const navigate = useNavigate()

    const { id } = useParams()

    const [isSuperUser, setIsSuperuser] = useState(false)

    const [url, setUrl] = useState('')
    const [sno, setSno] = useState('')
    const [subject, setSubject] = useState("")
    const [oref, setOref] = useState(null)

    useEffect(() => {
        getCo(id)
        checkSuperuser()
    }, [id])

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



    const getCo = (id) => {
        api.get(`/api/online-reference/${id}/`).
            then((res) => {

                setOref(res.data)

                setUrl(res.data.url)

                setSno(res.data.sno)
                setSubject(res.data.subject)


            }).
            catch((err) => toast.error(err))

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const editonlineReference = {
            sno,
            url,
            subject

        };

        api.put(`/api/online-reference/${id}/`, editonlineReference)
            .then((res) => {
                toast('Online Reference updated successfully');
                navigate(`/subject/${oref.subject}`);
            })
            .catch((err) => toast.error(err));
    };



    return (
        <>



            {isSuperUser ? <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
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
                    <h2 className="text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">Edit Course Outcomes (CO's)</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Aute magna irure deserunt veniam aliqua magna enim voluptate.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">



                        <div className="sm:col-span-2">
                            <label htmlFor="sno" className="block text-sm font-semibold leading-6 text-gray-900">
                                S. no
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="sno"
                                    id="sno"
                                    value={sno ? sno : ""}
                                    onChange={(e) => setSno(e.target.value)}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="url" className="block text-sm font-semibold leading-6 text-gray-900">
                               Website URL
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="url"
                                    id="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="subject" className="block text-sm font-semibold leading-6 text-gray-900">
                                Subject Name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="subject"
                                    id="subject"
                                    value={subject}
                                    readOnly
                                    className="block w-full cursor-not-allowed pointer-events-none  rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                    </div>
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div> : <NotFound />}




        </>
    )
}

export default EditOnlineReference