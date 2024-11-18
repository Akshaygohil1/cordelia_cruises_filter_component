import { React, useState, useEffect } from "react";
import DestinationFilter from "./DestinationFilter";
import DateRangeSelector from "./DateRangeSelector";

const PopupContainer = ({
  destinations,
  setItinerariesList,
  itinerariesList,
  setOpen,
  setDestinations,
}) => {
  // State for selected destinations
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  // State for filtered itineraries
  const [filteredList, setFilteredList] = useState(
    JSON.parse(localStorage.getItem("response")) || []
  );

  const handleDestinationSelection = (selected) => {
    console.log("Selected Destinations:", selected);
    setSelectedDestinations(selected);
    setDestinations(destinations);

    const allItineraries = JSON.parse(localStorage.getItem("response")) || [];

    if (selected.length === 0) {
      // If no destinations are selected, clear the filtered list
      setFilteredList(allItineraries.itineraries); // Reset to full list
    } else {
      // Filter itineraries based on the selected destinations
      const filteredItineraries = allItineraries.itineraries.filter(
        (itinerary) => selected.includes(itinerary?.destination_port?.name)
      );

      setFilteredList(filteredItineraries);
    }

    console.log("Filtered Itineraries:", filteredList);
  };

  const handleDateSelection = (selectedDates) => {
    console.log("Selected Dates:", selectedDates);

    // Retrieve all itineraries from localStorage
    const allItineraries = JSON.parse(localStorage.getItem("response")) || [];
    const itineraries = allItineraries.itineraries;

    // Filter itineraries based on the selected date range
    const filteredItineraries = itineraries.filter((itinerary) => {
      const itineraryStartDate = new Date(
        itinerary.start_date.split("/").reverse().join("-")
      );
      const itineraryEndDate = new Date(
        itinerary.end_date.split("/").reverse().join("-")
      );

      // Check if any selected date falls within the itinerary date range
      return selectedDates.some(
        (selectedDate) =>
          selectedDate >= itineraryStartDate && selectedDate <= itineraryEndDate
      );
    });

    // Update the filtered list state
    setFilteredList(filteredItineraries);

    console.log("Filtered Itineraries:", filteredItineraries);
  };

  const handleApply = () => {
    setItinerariesList(filteredList);
    setOpen(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 max-md:relative">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full max-md:absolute max-md:bottom-[0]">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={() => setOpen(false)} // Function to close the popup
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Destination Filter */}
            <DestinationFilter
              destinations={destinations}
              onSelect={handleDestinationSelection}
            />

            {/* Date Range Selector */}
            <DateRangeSelector onDateSelect={handleDateSelection} />
          </div>

          {/* Apply Button */}
          <div className="mt-6 flex justify-center">
            <button
              className="px-6 py-3 bg-[#92278F] text-white font-semibold rounded-lg shadow hover:bg-purple-800 w-full"
              onClick={handleApply}
            >
              APPLY
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default PopupContainer;
