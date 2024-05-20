import React, { useRef } from "react";
import logo from "../../assests/logo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import ProfileMenu from "../ProfileMenu/ProfileMenu.jsx";
import { useSelector } from "react-redux";

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  const { photo, role } = useSelector((state) => state.root.user);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <img src={logo} alt="medicify" className="w-23 h-20" />
          </div>
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              <li>
                <NavLink
                  to="/home"
                  className={(navClass) =>
                    navClass.isActive
                      ? "text-primaryColor text-[16px] leading-7 font-[600]"
                      : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                  }
                >
                  Home
                </NavLink>
              </li>
              {role === "user" && isLoggedIn && (
                <li>
                  <NavLink
                    to="/apply"
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    Apply
                  </NavLink>
                </li>
              )}
              {role === "admin" && isLoggedIn && (
                <li>
                  <NavLink
                    to="/dashboard/"
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              {!isLoggedIn && (
                <li>
                  <NavLink
                    to="/register"
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    Register
                  </NavLink>
                </li>
              )}
                <li>
                  <NavLink
                    to="/doctors"
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    Doctors
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/predict"
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    Predictors
                  </NavLink>
                </li>
            </ul>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <ProfileMenu photo={photo} />

            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
