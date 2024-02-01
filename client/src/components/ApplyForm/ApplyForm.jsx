import React, { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";

const ApplyForm = ({
  category,
  handleAdd,
  handleDelete,
  handleMultipleInputChange,
}) => {
  const [data, setData] = useState([{ id: 1 }]);

  const handleAddItem = () => {
    setData((prevData) => [...prevData, { id: Date.now() }]);
  };

  const handleDeleteItem = (id) => {
    if (data.length > 1) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        {category === "edu" ? "Education" : "Experience"}
      </h2>
      {data.map((item) => (
        <div
          key={item.id + 100}
          className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2"
        >
          <div>
            <label
              htmlFor={`startYear_${category}_${item.id}`}
              className="text-gray-700"
            >
              Start Year
            </label>
            <input
              type="number"
              id={`startYear_${category}_${item.id}`}
              value={item.startYear}
              onChange={(e) => {
                handleMultipleInputChange(
                  category,
                  item.id,
                  "startYear",
                  e.target.value
                );
              }}
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label
              htmlFor={`endYear_${category}_${item.id}`}
              className="text-gray-700"
            >
              End Year
            </label>
            <input
              type="number"
              id={`endYear_${category}_${item.id}`}
              value={item.endYear}
              onChange={(e) => {
                handleMultipleInputChange(
                  category,
                  item.id,
                  "endYear",
                  e.target.value
                );
              }}
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label
              htmlFor={`degree_${category}_${item.id}`}
              className="text-gray-700"
            >
              {category === "edu" ? "Degree" : "Designation"}
            </label>
            <input
              type="text"
              id={`degree_${category}_${item.id}`}
              value={item.degree}
              onChange={(e) => {
                const field = category === "edu" ? "degree" : "designation";
                handleMultipleInputChange(
                  category,
                  item.id,
                  field,
                  e.target.value
                );
              }}
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label
              htmlFor={`place_${category}_${item.id}`}
              className="text-gray-700"
            >
              {category === "edu" ? "College" : "Place"}
            </label>
            <input
              type="text"
              id={`place_${category}_${item.id}`}
              value={item.college}
              onChange={(e) => {
                const field = category === "edu" ? "college" : "place";
                handleMultipleInputChange(
                  category,
                  item.id,
                  field,
                  e.target.value
                );
              }}
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          {data.length > 1 && (
            <div
              onClick={(e) => {
                handleDeleteItem(item.id);
                handleDelete(category, item.id);
              }}
              className="bg-red-600 text-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
            >
              <MdOutlineDelete size={20} />
            </div>
          )}
        </div>
      ))}
      <button
        onClick={(e) => {
          handleAddItem();
          handleAdd(category);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Add {category === "edu" ? "Education" : "Experience"}
      </button>
    </div>
  );
};

export default ApplyForm;
