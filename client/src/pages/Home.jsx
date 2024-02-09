import React from "react";
import heroImg01 from "../assests/hero-img01.png";
import heroImg02 from "../assests/hero-img02.png";
import heroImg03 from "../assests/hero-img03.png";
import icon01 from "../assests/icon01.png";
import icon02 from "../assests/icon02.png";
import icon03 from "../assests/icon03.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                  We help people live a healthy life!
                </h1>
                <p className="text__para">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Minima alias rerum quos temporibus repellat nostrum
                  exercitationem tenetur repellendus magni impedit.
                </p>
                <button
                  className="btn"
                  onClick={() => {
                    navigate("/doctors");
                  }}
                >
                  View Doctors
                </button>
              </div>
              <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor ">
                    900+
                  </h2>
                  <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Ratings</p>
                </div>
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor ">
                    50+
                  </h2>
                  <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Doctors</p>
                </div>
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor ">
                    30+
                  </h2>
                  <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Years of Experience</p>
                </div>
              </div>
            </div>

            <div className="flex gap-[30px] justify-end ">
              <div>
                <img className="w-full" src={heroImg01} alt="" />
              </div>
              <div className="mt-[30px]">
                <img className="w-full mb-[30px]" src={heroImg02} alt="" />
                <img className="w-full" src={heroImg03} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section> 
        <div className="container">
          <div className="lg:w-[470px] mx-auto">
            <h2 className="heading text-center ">
              Providing the best medical services
            </h2>
          </div>
          <p className="text__para text-center">
            World class care for everyone. Our health system offers unmatched
            expert health care
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          <div className="py-[30px] px-5">
            <div className="flex items-center justify-center">
              <img src={icon01} />
            </div>
            <div className="mt-[30px]">
              <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                Find a Doctor
              </h2>
              <p className="text-[16px] leading-7 text-textColor font-[400]mt-4 text-center">
                World class care for everyone. Our health system offers
                unmatched, expert health care. From the lab to clinic
              </p>
            </div>
          </div>
          <div className="py-[30px] px-5">
            <div className="flex items-center justify-center">
              <img src={icon02} />
            </div>
            <div className="mt-[30px]">
              <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                Find Clinic
              </h2>
              <p className="text-[16px] leading-7 text-textColor font-[400]mt-4 text-center">
                World class care for everyone. Our health system offers
                unmatched, expert health care. From the lab to clinic
              </p>
            </div>
          </div>
          <div className="py-[30px] px-5">
            <div className="flex items-center justify-center">
              <img src={icon03} />
            </div>
            <div className="mt-[30px]">
              <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                Book Appointment
              </h2>
              <p className="text-[16px] leading-7 text-textColor font-[400]mt-4 text-center">
                World class care for everyone. Our health system offers
                unmatched, expert health care. From the lab to clinic
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
            <div className="relative xl:w-[450px] z-10 order-2 lg:order-1">
              <img src={heroImg01} alt="" className="h-[450px]"/>
            </div>

            <div className="w-full xl:w-[700px] order-1 lg:order-2">
              <div className="heading">Proud to be one of the nations best</div>
              <p className="text__para">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis aliquid vitae provident quod voluptatibus. Quisquam
                totam perferendis praesentium ab laudantium repellendus
                voluptatem autem ratione reprehenderit veritatis facilis dolor
                saepe velit, atque quis neque ipsam molestiae, beatae ullam
                veniam. Id, ratione!
              </p>
              <p className="text__para">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                facilis veniam dolore commodi pariatur eligendi excepturi
                eveniet. Voluptatum, velit. Quis voluptatem explicabo est qui
                delectus excepturi molestiae repudiandae nam animi!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[400px] mx-auto">
            <h2 className="heading text-center">
              Our best medical services
            </h2>
          </div>
          <p className="text__para text-center">
            World class care for everyone. Our health system offers unmatched
            expert health care
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px] mx-14">
          <div className="py-[30px] px-3 lg:px-5">
              <h2 className="text-[26px] leading-9 text-headingColor font-[700]">
                Neurology
              </h2>
              <p className="text-[16px] leading-7 text-textColor font-[400]mt-4">
                World class care for everyone. Our health system offers
                unmatched, expert health care. From the lab to clinic
              </p>
            </div>
            <div className="py-[30px] px-3 lg:px-5">
              <h2 className="text-[26px] leading-9 text-headingColor font-[700]">
                Neurology
              </h2>
              <p className="text-[16px] leading-7 text-textColor font-[400]mt-4">
                World class care for everyone. Our health system offers
                unmatched, expert health care. From the lab to clinic
              </p>
            </div>
            <div className="py-[30px] px-3 lg:px-5">
              <h2 className="text-[26px] leading-9 text-headingColor font-[700]">
                Neurology
              </h2>
              <p className="text-[16px] leading-7 text-textColor font-[400]mt-4">
                World class care for everyone. Our health system offers
                unmatched, expert health care. From the lab to clinic
              </p>
            </div>
            <div className="py-[30px] px-3 lg:px-5">
              <h2 className="text-[26px] leading-9 text-headingColor font-[700]">
                Neurology
              </h2>
              <p className="text-[16px] leading-7 text-textColor font-[400]mt-4">
                World class care for everyone. Our health system offers
                unmatched, expert health care. From the lab to clinic
              </p>
            </div>
            <div className="py-[30px] px-3 lg:px-5">
              <h2 className="text-[26px] leading-9 text-headingColor font-[700]">
                Neurology
              </h2>
              <p className="text-[16px] leading-7 text-textColor font-[400]mt-4">
                World class care for everyone. Our health system offers
                unmatched, expert health care. From the lab to clinic
              </p>
            </div>
            <div className="py-[30px] px-3 lg:px-5">
              <h2 className="text-[26px] leading-9 text-headingColor font-[700]">
                Neurology
              </h2>
              <p className="text-[16px] leading-7 text-textColor font-[400]mt-4">
                World class care for everyone. Our health system offers
                unmatched, expert health care. From the lab to clinic
              </p>
            </div>
        </div>
      </section>
    </>
  );
};

export default Home;
