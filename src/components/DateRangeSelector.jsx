import React, { useState } from "react";

const DateRangeSelector = ({ onDateSelect }) => {
  const [selectedDates, setSelectedDates] = useState([]); // Store selected dates
  const [startDate, setStartDate] = useState(null); // Store the start date of the range

  // const handleDateClick = (date) => {
  //   const updatedDates = selectedDates.includes(date)
  //     ? selectedDates.filter((d) => d !== date)
  //     : [...selectedDates, date];
  //   setSelectedDates(updatedDates);
  //   onDateSelect(updatedDates);
  // };

  // const handleDateClick = (date) => {
  //   if (startDate === null) {
  //     // If no start date is set, set the selected date as the start
  //     setStartDate(date);
  //     setSelectedDates([date]); // Start the selection range with this date
  //   } else {
  //     // If a start date is already set, select the range
  //     const range =
  //       date > startDate
  //         ? [...Array(date - startDate + 1).keys()].map((i) => startDate + i)
  //         : [...Array(startDate - date + 1).keys()]
  //             .map((i) => startDate - i)
  //             .reverse();
  //     setSelectedDates(range); // Select the range
  //     setStartDate(null); // Reset start date after selecting the range
  //   }
  // };

  const handleDateClick = (date) => {
    const clickedDate = new Date(currentYear, currentMonth, date); // Construct full date

    if (startDate === null) {
      // Start the range
      setStartDate(clickedDate);
      setSelectedDates([clickedDate]); // Start the selection with the clicked date
    } else {
      // Generate range of dates
      const range = [];
      const endDate = clickedDate;

      if (endDate >= startDate) {
        let current = new Date(startDate);
        while (current <= endDate) {
          range.push(new Date(current)); // Push a copy of the date
          current.setDate(current.getDate() + 1); // Move to the next day
        }
      } else {
        let current = new Date(startDate);
        while (current >= endDate) {
          range.push(new Date(current));
          current.setDate(current.getDate() - 1); // Move to the previous day
        }
      }

      setSelectedDates(range); // Update state with the full range
      setStartDate(null); // Reset start date for next selection
      onDateSelect(range); // Pass selected range to parent
    }
  };

  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-based (0 = January)
  const currentYear = currentDate.getFullYear();

  // Function to get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Function to get the number of days in the month
  const getNumberOfDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the first day of the month (0-6)
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  // Get the number of days in the month
  const numberOfDaysInMonth = getNumberOfDaysInMonth(currentYear, currentMonth);

  // Generate the days (e.g., 1, 2, 3,..., 31)
  const days = [...Array(numberOfDaysInMonth).keys()].map((i) => i + 1);

  // Add empty cells for the first week if the month doesn't start on Sunday
  const emptyDays = [...Array(firstDayOfMonth).keys()];

  return (
    <div>
      <h4 className="text-lg font-semibold mb-3">Select Sailing Dates</h4>
      <div className="bg-white border border-[#F2F2F2] rounded-lg">
        {/* Year and Month Selector */}
        <div className="flex items-center justify-between p-4">
          <div className="flex gap-2">
            <select className="rounded-md px-2 py-1">
              <option>2024</option>
            </select>
            <select className="rounded-md px-2 py-1">
              <option>May</option>
            </select>
          </div>
          <span className="text-gray-500 text-sm">Sailing Date</span>
        </div>
        {/* Calendar Grid */}
        <div className="bg-[#F9F9F9] p-4 rounded-md">
          <div className="grid grid-cols-7 gap-2">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
              <div
                key={index}
                className="text-center text-[#8B8D97] font-semibold"
              >
                {day}
              </div>
            ))}
          </div>
        </div>
        {/* Dates of the month */}
        <div className="grid grid-cols-7 gap-y-2 mt-2 p-4">
          {/* Empty days before the start of the month */}
          {emptyDays.map((_, index) => (
            <div key={index} className="text-center w-10 h-10 rounded-full" />
          ))}

          {/* Days of the month */}
          {days.map((date, index) => {
            const isFirstSelected =
              selectedDates.length > 0 && date === selectedDates[0].getDate();

            const isLastSelected =
              selectedDates.length > 1 &&
              date === selectedDates[selectedDates.length - 1].getDate();

            const isMiddleSelected =
              selectedDates.length > 1 &&
              selectedDates.some(
                (selectedDate) =>
                  selectedDate.getDate() === date &&
                  !isFirstSelected &&
                  !isLastSelected
              );

            return (
              <button
                key={date}
                className={`text-center h-10 mr-[-1px] ${
                  isFirstSelected
                    ? "rounded-l-full bg-[#92278F] text-white"
                    : isLastSelected
                    ? "rounded-r-full bg-[#92278F] relative"
                    : isMiddleSelected
                    ? "bg-[#92278F] text-white border-[#92278F]"
                    : "text-gray-700 hover:bg-[#92278F] hover:bg-opacity-10"
                }`}
                onClick={() => handleDateClick(date)}
              >
                {isLastSelected ? (
                  <span className="bg-white text-black absolute top-[3px] left-[13px] w-[35px] h-[35px] rounded-full flex items-center justify-center max-md:w-[30px] max-md:h-[30px] max-md:top-[5px] max-md:left-[7px]">
                    {date}
                  </span>
                ) : (
                  ""
                )}
                {isLastSelected ? "" : date}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DateRangeSelector;
