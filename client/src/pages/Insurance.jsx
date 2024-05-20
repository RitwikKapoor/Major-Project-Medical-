import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Insurance = () => {
  const [age, setAge] = useState(0);
  const [sex, setSex] = useState("");
  const [bmi, setBmi] = useState(0.0);
  const [region, setRegion] = useState("");
  const [children, setChildren] = useState(0);
  const [smoker, setSmoker] = useState("");
  const [loading, setLoading] = useState(false);
  const [predictedValue, setPredictedValue] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        "https://medicify-flask.onrender.com/api/predict_premium",
        {
          age: age,
          sex: sex,
          bmi: bmi,
          smoker: smoker,
          region: region,
          children: children,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200){
          setPredictedValue(res.data.prediction);
          setLoading(false);
        }else{
          throw new Error("Unexpected response");
        }
      })
      .catch((error) => {
        setLoading(false)
        toast.error(error.response.data.msg);
      });
  };

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Insurance Information
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="age" className="text-gray-700">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="1"
            required
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label htmlFor="sex" className="text-gray-700">
            Gender
          </label>
          <select
            id="sex"
            name="sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            required
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="region" className="text-gray-700">
            Region
          </label>
          <select
            id="region"
            name="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring"
          >
            <option value="">Select</option>
            <option value="northeast">northeast</option>
            <option value="southeast">southeast</option>
            <option value="northwest">northwest</option>
            <option value="southwest">southwest</option>
          </select>
        </div>
        <div>
          <label htmlFor="bmi" className="text-gray-700">
            BMI
          </label>
          <input
            type="number"
            id="bmi"
            name="bmi"
            value={bmi}
            onChange={(e) => setBmi(e.target.value)}
            step="0.01"
            required
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label htmlFor="children" className="text-gray-700">
            Number of Children
          </label>
          <input
            type="number"
            id="children"
            name="children"
            value={children}
            onChange={(e) => setChildren(e.target.value)}
            min="0"
            required
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label htmlFor="smoker" className="text-gray-700">
            Smoker
          </label>
          <select
            id="smoker"
            name="smoker"
            value={smoker}
            onChange={(e) => setSmoker(e.target.value)}
            required
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Submit
      </button>
      {loading && <div className="mt-4">Loading...</div>}
      {predictedValue && (
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Your Insurance Premium in US Dollar
          </h3>
          <div className="overflow-hidden border border-gray-200 rounded-md">
            <table className="w-full">
              <tbody>
                <tr className="bg-gray-200">
                  <td className="px-8 py-4 font-semibold text-lg text-gray-700">
                    Predicted Value
                  </td>
                  <td className="px-8 py-4 text-lg">{predictedValue}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Insurance;
