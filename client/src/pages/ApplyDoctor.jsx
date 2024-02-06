import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/rootSlice.js";
import { useNavigate } from "react-router-dom";
import ApplyForm from "../components/ApplyForm/ApplyForm.jsx";

const ApplyDoctor = () => {
  const [exper, setExper] = useState([
    { id: 1, startYear: "", endYear: "", designation: "", place: "" },
  ]);
  const [educ, setEduc] = useState([
    { id: 1, startYear: "", endYear: "", degree: "", college: "" },
  ]);
  const [formData, setFormData] = useState({
    specialization: "",
    experience: 0,
    fees: 0,
    clinicAddress: "",
    starttime: "",
    endtime: "",
    bio: "",
    education: [],
    work: [],
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = (category) => {
    if (category === "edu") {
      setEduc([
        ...educ,
        { id: Date.now(), startYear: "", endYear: "", degree: "", college: "" },
      ]);
    } else {
      setExper([
        ...exper,
        {
          id: Date.now(),
          startYear: "",
          endYear: "",
          designation: "",
          place: "",
        },
      ]);
    }
  };

  const handleDelete = (category, id) => {
    if (category === "edu") {
      if (educ.length > 1) {
        setEduc(educ.filter((item) => item.id !== id));
      }
    } else {
      if (exper.length > 1) {
        setExper(exper.filter((item) => item.id !== id));
      }
    }
  };

  const handleMultipleInputChange = (category, id, field, value) => {
    if (category === "edu") {
      setEduc(
        educ.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        )
      );
    } else {
      setExper(
        exper.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        )
      );
    }
  };

  const copyToForm = () => {
    for (let i = 0; i < exper.length; i++) {
      const { id, ...clone_exper_without_id } = exper[i];
      formData.work.push(clone_exper_without_id);
    }
    for (let i = 0; i < educ.length; i++) {
      const { id, ...clone_educ_without_id } = educ[i];
      formData.education.push(clone_educ_without_id);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    copyToForm();
    dispatch(setLoading(true));
    axios
      .post(`${import.meta.env.VITE_APP_BASE_URL}/doctor/apply`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.msg);  
            dispatch(setLoading(false));
            navigate("/home");
        } else {
          throw new Error("Unexpected response");
        }
      })
      .catch((error) => {
          dispatch(setLoading(false));
          toast.error(error.response.data.msg);
      });
  };

  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md ">
      <h1 className="text-lg font-semibold text-gray-700 capitalize ">
        Enter your details
      </h1>

      <form onSubmit={submitHandler}>
        <div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label htmlFor="specialization" className="text-gray-700">
                Specialization
              </label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring "
              />
            </div>
            <div>
              <label htmlFor="clinicAddress" className="text-gray-700">
                Clinic Address
              </label>
              <input
                type="text"
                id="clinicAddress"
                name="clinicAddress"
                value={formData.clinicAddress}
                onChange={handleInputChange}
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring "
              />
            </div>
            <div>
              <label htmlFor="fees" className="text-gray-700">
                Fees
              </label>
              <input
                type="number"
                id="fees"
                name="fees"
                value={formData.fees}
                onChange={handleInputChange}
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label htmlFor="experience" className="text-gray-700">
                Experience
              </label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label htmlFor="starttime" className="text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                id="starttime"
                name="starttime"
                value={formData.starttime}
                onChange={handleInputChange}
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-mdfocus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label htmlFor="endtime" className="text-gray-700 ">
                End time
              </label>
              <input
                type="time"
                id="endtime"
                name="endtime"
                value={formData.endtime}
                onChange={handleInputChange}
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500 :outline-none focus:ring"
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="bio" className="text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows="3"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <ApplyForm
            category={"edu"}
            handleMultipleInputChange={handleMultipleInputChange}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
          />
          <ApplyForm
            category={"exp"}
            handleMultipleInputChange={handleMultipleInputChange}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
          />
          <div className="flex justify-center mt-6">
            <button className="px-12 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              {loading ? <HashLoader size={20} color="#ffffff" /> : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ApplyDoctor;
