import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Fitness = () => {
  const [mood, setMood] = useState("");
  const [stepCount, setStepCount] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [hoursSleep, setHoursSleep] = useState(0);
  const [weightKg, setWeightKg] = useState(0);
  const [loading, setLoading] = useState(false);
  const [predictedValue, setPredictedValue] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        "https://medicify-flask.onrender.com/api/predict_fitness",
        {
          mood: mood,
          step_count: stepCount,
          calories_burned: caloriesBurned,
          hours_sleep: hoursSleep,
          weight_kg: weightKg,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setPredictedValue(res.data.prediction);
          setLoading(false);
        } else {
          throw new Error("Unexpected response");
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.msg);
      });
  };

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Fitness Information
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="mood" className="text-gray-700">
            Mood
          </label>
          <select
            id="mood"
            name="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            required
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring"
          >
            <option value="">Select</option>
            <option value="happy">Happy</option>
            <option value="neutral">Neutral</option>
            <option value="sad">Sad</option>
          </select>
        </div>
        <div>
          <label htmlFor="stepCount" className="text-gray-700">
            Step Count
          </label>
          <input
            type="number"
            id="stepCount"
            name="stepCount"
            value={stepCount}
            onChange={(e) => setStepCount(e.target.value)}
            min="0"
            required
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label htmlFor="caloriesBurned" className="text-gray-700">
            Calories Burned (kcal)
          </label>
          <input
            type="number"
            id="caloriesBurned"
            name="caloriesBurned"
            value={caloriesBurned}
            onChange={(e) => setCaloriesBurned(e.target.value)}
            min="0"
            required
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label htmlFor="hoursSleep" className="text-gray-700">
            Sleep (hours)
          </label>
          <input
            type="number"
            id="hoursSleep"
            name="hoursSleep"
            value={hoursSleep}
            onChange={(e) => setHoursSleep(e.target.value)}
            min="0"
            required
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label htmlFor="weightKg" className="text-gray-700">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weightKg"
            name="weightKg"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            min="0"
            required
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring"
          />
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
            Your Fitness Prediction
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

export default Fitness;
