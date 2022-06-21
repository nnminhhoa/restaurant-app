import React from 'react';
import { heroData } from '../utils/data';
import Delivery from '../img/delivery.png';
import HeroBg from '../img/heroBg.png';

const HomeContainer = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full"
      id="home"
    >
      <div className="py-2 flex-1 flex flex-col items-start justify-start gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white drop-shadow-xl">
            <img
              className="w-full h-full object-cover"
              src={Delivery}
              alt="delivery"
            />
          </div>
        </div>

        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          The Fast Delivery in{' '}
          <span className="text-orange-600 text-[3rem] md:text-[5rem]">
            Your City
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%] leading-7">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit,
          Minima velit eaque fugit distinctio est nam vluptatum
          architecto, porro iusto deserunt recusandae ipsa minus eos
          sunt, dolores illo repellat facere suscipit!
        </p>

        <button
          type="button"
          className="text-white md:w-auto bg-gradient-to-br from-orange-400 to-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order Now!
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative">
        <img
          className="ml-auto h-510 w-full lg:w-auto lg:h-650"
          src={HeroBg}
          alt="hero-bg"
        />
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-6 py-4 gap-2 flex-wrap">
          {heroData &&
            heroData.map((item) => (
              <div
                key={item.id}
                className="w-[150px] lg:w-190 p-2 lg:p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-cente drop-shadow-lg"
              >
                <img
                  className="w-28 lg:w-40 -mt-10 lg:-mt-20"
                  src={item.imageSrc}
                  alt={item.name}
                />
                <p className="text-sm lg:text-base font-semibold text-textColor mt-4">
                  {item.name}
                </p>
                <p className="text-[12px] lg:text-sm text-lighttext font-semibold text-center my-3">
                  {item.decp}
                </p>
                <p className="text-sm font-semibold text-headingColor ">
                  <span className="text-sm text-red-600">$</span>{' '}
                  {item.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
