'use client';
import React, { useState } from 'react';
import { FormEvent } from 'react';



const MainForm = () => {
  const [isPlacement, setIsPlacement] = useState(false);
  const [isMasters, setIsMasters] = useState(false);
  const [userData, setUserData] = useState({
    srn: '',
    company_name: '',
    test_experience:'',
    summer_intern_placement: '',
    interview_selected: false,
    interview_date: '',
    interview_experience: '',
    ctc: '',
    qualified: false,
    applied_for_masters: false,
    university_name: '',
    program_name: '',
    joined_masters: false,
  });

  const handleCheckboxChange = (key: string) => {
    setUserData({ ...userData, [key]: !userData[key] });

    // Handle conditional rendering based on user responses
    if (key === 'interview_selected') {
      setIsPlacement(!userData.interview_selected);
    } else if (key === 'applied_for_masters') {
      setIsMasters(userData.applied_for_masters);
    }
  };

  const handleChange = (e: FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target;

    // If it's a checkbox, handle it separately
    if (name === 'interview_selected' || name === 'applied_for_masters' || name === 'joined_masters') {
      handleCheckboxChange(name);
    } else {
      setUserData({ ...userData, [name]: value });

      // Handle conditional rendering based on user responses
      if (name === 'summer_intern_placement') {
        setIsPlacement(value.toLowerCase() === 'placement');
      } else if (name === 'applied_for_masters') {
        setIsMasters(value.toLowerCase() === 'yes');
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', userData);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 mx-auto max-w-md">Contribute</h1>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-md">
        

        <div className="mb-4">
          <label>
            Summer Intern or Placement:
            <input
              type="text"
              name="summer_intern_placement"
              value={userData.summer_intern_placement}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </label>
        </div>

        
          <div className="mb-4">
            <label>
              Company Name:
              <input
                type="text"
                name="company_name"
                value={userData.company_name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </label>
          </div>
          
          <div className="mb-4">
              <label>
                Test Experience:
                <input
                  type="text"
                  name="test_experience"
                  value={userData.test_experience}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </label>
            </div>

        <div className="mb-4">
          <label>
            Interview Selected:
            <input
              type="checkbox"
              name="interview_selected"
              checked={userData.interview_selected}
              onChange={() => handleCheckboxChange('interview_selected')}
            />
          </label>
        </div>

        {userData.interview_selected && (
          <>
            <div className="mb-4">
              <label>
                Interview Date:
                <input
                  type="text"
                  name="interview_date"
                  value={userData.interview_date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </label>
            </div>
            <div className="mb-4">
              <label>
                Interview Experience:
                <input
                  type="text"
                  name="interview_experience"
                  value={userData.interview_experience}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </label>
            </div>
            <div className="mb-4">
              <label>
                CTC/Stipend:
                <input
                  type="text"
                  name="ctc"
                  value={userData.ctc}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </label>
            </div>
            <div className="mb-4">
              <label>
                Qualified:
                <input
                  type="checkbox"
                  name="qualified"
                  checked={userData.qualified}
                  onChange={() => handleCheckboxChange('qualified')}
                />
              </label>
            </div>

          </>
        )}

        <div className="mb-4">
          <label>
            Applied for Masters:
            <input
              type="checkbox"
              name="applied_for_masters"
              checked={userData.applied_for_masters}
              onChange={() => handleCheckboxChange('applied_for_masters')}
            />
          </label>
        </div>

        {userData.applied_for_masters && (
          <>
            <div className="mb-4">
              <label>
                University Name:
                <input
                  type="text"
                  name="university_name"
                  value={userData.university_name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </label>
            </div>
            <div className="mb-4">
              <label>
                Program Name:
                <input
                  type="text"
                  name="program_name"
                  value={userData.program_name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </label>
            </div>
            <div className="mb-4">
              <label>
                Joined Masters:
                <input
                  type="checkbox"
                  name="joined_masters"
                  checked={userData.joined_masters}
                  onChange={() => handleCheckboxChange('joined_masters')}
                />
              </label>
            </div>
          </>
        )}

        <div className="flex justify-end">
          <button type="submit" className="text-white py-2 px-4 rounded-md cursor-pointer bg-blue-500">
            Submit
          </button>
        </div>
      </form>

      <br />
      <br />
      <br />
    </>
  );
};

export default MainForm;
