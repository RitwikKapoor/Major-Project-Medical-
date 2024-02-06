import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 80) {
        setVisible(true);
      } else if (scrolled <= 80) {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisible);

    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  return (
    visible && (
      <div
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 text-white p-4 rounded-full cursor-pointer shadow-md"
        onClick={scrollToTop}
      >
        <FaArrowUp />
      </div>
    )
  );
};

export default ScrollButton;
