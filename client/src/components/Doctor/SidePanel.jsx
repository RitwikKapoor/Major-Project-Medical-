import React, { useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import BookModal from "../BookModal/BookModal";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const SidePanel = ({ starttime, endtime, fees }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const { role } = useSelector((state) => state.root.user);

  const openModal = () => {
    if (!isLoggedIn) {
      toast.warn("Please login first");
    } else {
      if (role !== "user") {
        toast.warn("You are not allowed to book from this account");
      } else {
        setIsModalOpen(true);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Fees</p>
        <div className="flex text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold items-center">
          <MdCurrencyRupee className="text-2xl" />
          <span>{fees}</span>
        </div>
      </div>
      <div className="mt-[30px)">
        <p className="text__para mt-0 font-semibold text-textColor">
          Available Time Slots:
        </p>

        <ul className="mt-3">
          <li className="flex items-center justify-between mb-2">
            <p className="text-[18px] leading-6 font-semibold">
              {starttime} - {endtime}
            </p>
          </li>
        </ul>
      </div>
      <button onClick={openModal} className="btn px-2 w-full rounded-md">
        Book Appointment
      </button>
      {isModalOpen && (
        <BookModal
          onClose={closeModal}
          starttime={starttime}
          endtime={endtime}
        />
      )}
    </div>
  );
};

export default SidePanel;
