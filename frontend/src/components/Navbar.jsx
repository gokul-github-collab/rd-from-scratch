import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import sk from '../assets/images/sk.png';
import { NavLink } from 'react-router-dom';
import api from '../api'; // Import your API utility

const Navbar = () => {
  const [isSuperUser, setIsSuperuser] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    checkSuperuser();
  }, []);

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

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    isSuperUser ? { name: 'Add Course', href: '/add-course' } : null,
  ].filter(Boolean); // Filter out null values

  return (
    <header className="absolute inset-x-0 top-0 z-50 ">
      <nav className="flex items-center justify-between p-6 lg:px-8 " aria-label="Global">
        <div className="flex lg:flex-1 ">
          <a href="#" className="-m-1.5 p-1.5">
            <img className="h-20 w-auto" src={sk} alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className="bg-white text-indigo-600 hover:text-white hover:bg-indigo-600 font-semibold py-2 px-4 rounded-md shadow-md transition duration-300"
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
          <NavLink
            to="/login"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
          >
            <button className="text-gray-900 px-4 py-2 rounded-lg bg-white hover:bg-indigo-500 hover:text-white">Log in</button>
          </NavLink>
        </div>
      </nav>
      <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="-m-1.5 p-1.5">
              <img className="h-20 w-auto" src={sk} alt="" />
            </NavLink>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:bg-indigo-500 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              <div className="py-6">
                <NavLink to="/login">
                  <button className="text-gray-900 px-4 py-2 rounded-lg bg-white hover:bg-indigo-500 hover:text-white">Log in</button>
                </NavLink>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;
