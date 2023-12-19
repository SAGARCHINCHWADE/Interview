import React from "react";
import { useState } from "react";

export default function Skillsdetails() {
  const [Skill, setSkill] = useState("");
  const [addSkill, setaddSkill] = useState([]);

  const handleRemove = (Id) => {
    // Filter out the item with the specified ID
    const updatedItems = addSkill.filter((item) => item.id !== Id);
    console.log(updatedItems, "updated item");
    setaddSkill(updatedItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Skill) {
      setaddSkill((prevSkill) => [...prevSkill, Skill]);
      setSkill("");
    }
  };

  return (
    <>
      <div className="flex   w-full p-2 ">
        <div className=" w-full">
          <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">
            Skills Details
          </h1>
          <form action="/" method="post" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700 text-left"
                for="firstName"
              >
                Skills
              </label>
              <div className="flex space-x-6 mb-4">
                <input
                  type="text"
                  placeholder="Add Skills"
                  value={Skill}
                  onChange={(e) => {
                    setSkill(e.target.value);
                  }}
                  className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                />
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 text-left flex hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Add Skills
              </button>
              {addSkill
                ? addSkill.map((e, index) => (
                    <div key={index} className="flex space-x-6 mb-4">
                      <input
                        type="text"
                        value={e}
                        placeholder="Add Skills"
                        className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                      />
                      <button
                        onClick={() => {
                          handleRemove(index);
                        }}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                : null}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
