import React, { useState } from "react";

const DestinationFilter = ({ destinations, onSelect }) => {
  const [selectedDestinations, setSelectedDestinations] = useState([]);

  const handleSelection = (destination) => {
    const updatedSelection = selectedDestinations.includes(destination)
      ? selectedDestinations.filter((item) => item !== destination)
      : [...selectedDestinations, destination];
    setSelectedDestinations(updatedSelection);
    onSelect(updatedSelection);
  };

  return (
    <div>
      <h4 className="text-lg font-semibold mb-3">Select Destination</h4>
      <div className="flex flex-wrap gap-2">
        {destinations.length > 0
          ? destinations.map((destination) => (
              <button
                key={destination.name}
                className={`text-sm font-medium cursor-pointer px-6 py-3.5 rounded-md ${
                  selectedDestinations.includes(destination.name)
                    ? "text-[#92278F] border-2 border-[#92278F]"
                    : "bg-[rgba(179,179,179,0.1)] text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => handleSelection(destination.name)}
              >
                {destination.name}
              </button>
            ))
          : "...Loading"}
      </div>
    </div>
  );
};

export default DestinationFilter;
