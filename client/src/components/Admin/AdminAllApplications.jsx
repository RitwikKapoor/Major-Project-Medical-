import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/rootSlice.js";
import { toast } from "react-toastify";
import axios from "axios";

const AdminAllApplications = () => {
  const [app, setApp] = useState([]);
  const dispatch = useDispatch();

  const getAllApplications = (e) => {
    dispatch(setLoading(true));
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/doctor/pending`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setApp(res.data);
          dispatch(setLoading(false));
        } else {
          throw new Error("Unexpected response");
        }
      })
      .catch((error) => {
        toast.error(error);
        dispatch(setLoading(false));
      });
  };

  const acceptApplication = (id) => {
    const confirm = window.confirm("Are you sure you want to accept?");
    if (confirm) {
      axios
        .put(
          `${import.meta.env.VITE_APP_BASE_URL}/doctor/accept`,
          {id},
          {
            withCredentials: true,
   
          }
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.msg);
            getAllApplications();
          }
        })
        .catch((error) => {
          toast.error(error.response.data.msg)
        });
    }
  };

  const rejectApplication = (id) => {
    const confirm = window.confirm("Are you sure you want to reject?");
    if (confirm) {
      axios
        .delete(
          `${import.meta.env.VITE_APP_BASE_URL}/doctor/reject`,
          {
            withCredentials: true,
            data: { id },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.msg);
            getAllApplications();
          }
        })
        .catch((error) => {
          toast.error(error.response.data.msg)
        });
    }
  };

  useEffect(() => {
    getAllApplications();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left">
              <th className="py-4 px-4 font-medium text-lighterBlack  xl:pl-11">
                SNo.
              </th>
              <th className="py-4 px-4 font-medium text-lighterBlack ">Name</th>
              <th className="py-4 px-4 font-medium text-lighterBlack ">Fees</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-lighterBlack ">
                Email
              </th>
              <th className="py-4 px-4 font-medium text-lighterBlack ">
                Specialization
              </th>
              <th className="min-w-[100px] py-4 px-4 font-medium text-lighterBlack ">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {app?.map((ele, i) => (
              <tr key={i} className="border-b border-[#eee]">
                <td className="py-5 px-2 pl-9 xl:pl-11">
                  <h5 className="font-medium text-lighterBlack">{i + 1}</h5>
                </td>
                <td className="py-5 px-4 ">
                  <p className="text-lighterBlack">
                    {ele?.userId.firstname} {ele?.userId.lastname}
                  </p>
                </td>
                <td className="py-5 px-4 ">
                  <p className="text-lighterBlack">{ele?.fees}</p>
                </td>
                <td className="py-5 px-4 ">
                  <p className="text-lighterBlack">{ele?.userId.email}</p>
                </td>
                <td className="py-5 px-4 ">
                  <p className="text-lighterBlack">{ele?.specialization}</p>
                </td>
                <td className="py-5 px-4 flex items-center space-x-2">
                  <button
                    className="ext-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={() => {
                      acceptApplication(ele?.userId._id);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={() => {
                      rejectApplication(ele?.userId._id);
                    }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllApplications;
