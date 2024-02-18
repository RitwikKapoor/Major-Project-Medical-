import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/rootSlice.js";
import { toast } from "react-toastify";
import axios from "axios";

const AdminAllUsers = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getAllUsers = (e) => {
    dispatch(setLoading(true));
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/user/getAllUsers`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data);
          dispatch(setLoading(false));
        } else {
          throw new Error("Unexpected response");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
        dispatch(setLoading(false));
      });
  };

  const deleteUser = (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      axios
        .delete(
          `${import.meta.env.VITE_APP_BASE_URL}/user/deleteUser`,
          {
            withCredentials: true,
            data: { id },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.msg);
            getAllUsers();
          }
        })
        .catch((error) => {
          toast.error(error.response.data.msg);
        });
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left">
              <th className="py-4 px-4 font-medium text-lighterBlack  xl:pl-11">
                S No.
              </th>
              <th className="py-4 px-4 font-medium text-lighterBlack ">
                Photo
              </th>
              <th className="py-4 px-4 font-medium text-lighterBlack ">Name</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-lighterBlack ">
                Email
              </th>
              <th className="py-4 px-4 font-medium text-lighterBlack ">
                Gender
              </th>
              <th className="py-4 px-4 font-medium text-lighterBlack ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((ele, i) => (
              <tr key={i} className="border-b border-[#eee]">
                <td className="py-5 px-2 pl-9 xl:pl-11">
                  <h5 className="font-medium text-lighterBlack">{i + 1}</h5>
                </td>
                <td className="py-5 px-4">
                  <img
                    className="w-12 h-12 flex items-center justify-center bg-gray-300 rounded-full overflow-hidden"
                    src={ele?.photo}
                    alt="user photo"
                  />
                </td>
                <td className="py-5 px-4 ">
                  <p className="text-lighterBlack">
                    {ele?.firstname} {ele?.lastname}
                  </p>
                </td>
                <td className="py-5 px-4 ">
                  <p className="text-lighterBlack">{ele?.email}</p>
                </td>
                <td className="py-5 px-4 ">
                  <p className="text-lighterBlack">{ele?.gender}</p>
                </td>
                <td className="py-5 px-4 ">
                  <button
                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={() => {
                      deleteUser(ele?._id);
                    }}
                  >
                    Remove
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

export default AdminAllUsers;
