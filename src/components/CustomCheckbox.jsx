// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
const CustomCheckbox = ({ lable }) => {
  return (
    <>
      <h3 className="mb-5 text-lg font-medium text-white dark:text-white">
        Select Destination
      </h3>
      <ul className="grid w-full gap-6 md:grid-cols-3">
        <li>
          <input
            type="checkbox"
            id="flowbite-option"
            value=""
            className="hidden peer"
          />
          <label
            htmlFor="flowbite-option"
            className="inline-flex items-center justify-between w-full bg-white p-[26px] rounded-lg cursor-pointer dark:hover:text-gray-300 dark:bg-gray  peer-checked:text-purple-primary peer-checked:bg-white peer-checked:border-purple-primary peer-checked:border dark:border dark:border-transparent peer-checked:opacity-100 dark:peer-checked:text-gray-300 peer-checked:text-gray-600"
          >
            <div className="block">
              <div className="w-full text-lg font-semibold">{lable}</div>
            </div>
          </label>
        </li>
      </ul>
    </>
  );
};

export default CustomCheckbox;
