import React, { useState } from 'react'
import Navbar from './component/Navbar'
import MultiStepForm from './component/MultiStepForm';
import RecordsList from './component/RecordsList';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Navbar />
      <div className='px-[4rem] py-[2rem]'>
        <div>
          <button
            onClick={() => setShowForm(true)}
            className=' px-[1rem] py-[0.7rem] rounded-md hover:bg-gray-200 text-2xl font-bold hover:text-gray-700 border-2'>
            Create Employee
          </button>
        </div>


        {showForm && <MultiStepForm setShowForm={setShowForm} />}

        <div>
          <h1 className=' text-4xl font-extrabold my-[3rem]'>All Members/Employee</h1>
          <RecordsList />
        </div>
      </div >
    </>
  )
}

export default App