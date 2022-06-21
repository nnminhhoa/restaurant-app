import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { IoFastFood } from 'react-icons/io5';
import { categories } from '../utils/data';
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';

const MenuContainer = () => {
  const [filter, setFilter] = useState('chicken');

  const [{ foodItems }, dispatch] = useStateValue();

  return (
    <section className="w-full my-6" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all duration-100 ease-in-out mr-auto">
          Our Hot Disher
        </p>
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 my-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((item) => (
              <motion.div
                whileTap={{ scale: 0.7 }}
                key={item.id}
                className={`group ${
                  filter === item.urlParamName
                    ? 'bg-cartNumbg'
                    : 'bg-card'
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumbg`}
                onClick={() => setFilter(item.urlParamName)}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === item.urlParamName
                      ? 'bg-card'
                      : 'bg-cartNumbg'
                  } group-hover:bg-card flex items-center justify-center`}
                >
                  <IoFastFood
                    className={`text-lg ${
                      filter === item.urlParamName
                        ? 'text-textColor'
                        : 'text-card'
                    } group-hover:text-textColor`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === item.urlParamName
                      ? 'text-white'
                      : 'text-textColor'
                  } text-textColor group-hover:text-white`}
                >
                  {item.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full">
          <RowContainer
            flag={false}
            data={foodItems?.filter(
              (item) => item.category === filter,
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
