import React, { useEffect } from "react";

const CruiseCard = ({ itinerariesList }) => {
  function formatDateWithOrdinal(dateStr, addSuffix = false) {
    const [day, month, year] = dateStr.split("/"); // Split the date into parts
    const date = new Date(`${year}-${month}-${day}`); // Create a Date object

    const monthShort = date.toLocaleDateString("en-US", { month: "short" }); // Short month (e.g., "Apr")
    const yearShort = `'${year.slice(-2)}`; // Short year (e.g., "'24")

    // Get the day with ordinal suffix
    const dayWithSuffix = (day) => {
      const j = day % 10,
        k = day % 100;
      if (j === 1 && k !== 11) return `${day}st`;
      if (j === 2 && k !== 12) return `${day}nd`;
      if (j === 3 && k !== 13) return `${day}rd`;
      return `${day}th`;
    };

    const formattedDay = addSuffix
      ? dayWithSuffix(parseInt(day))
      : parseInt(day); // Add suffix conditionally

    return `${monthShort} ${formattedDay} ${addSuffix ? yearShort : ""}`;
  }

  return (
    <>
      {itinerariesList && itinerariesList.length > 0 ? (
        itinerariesList.map((itinerarie) => (
          <div
            key={itinerarie.itinerary_id}
            className="max-w-[1450px] flex flex-col sm:gap[0px] md:gap-[35px] md:flex-row items-stretch rounded-xl shadow-lg overflow-hidden bg-white py-[35px] px-[9px] mb-6"
          >
            {/* Image Section */}
            <div className="relative max-w-[643px] max-h-[413px]  ">
              <div className="bg-gradient-to-t from-[#000000D9] md:rounded absolute w-full h-full"></div>
              <img
                src={itinerarie.image_url} // Replace with your actual image URL
                alt="Cruise"
                className="w-full h-full object-cover rounded "
              />

              <span className="absolute top-[25px] left-[-10px] bg-[#F9684D] text-white px-4 py-2 text-xs font-semibold rounded-tr-lg rounded-br-lg flex items-center justify-center w-[159px] h-[40px] hidden sm:block">
                Fast Selling
              </span>
              <div className="absolute bottom-3 left-3 text-white max-w-[300px] sm:max-w-none">
                <p className="text-lg font-semibold text-[14px] leading-[18px] sm:text-lg">
                  {/* Chennai - Hambantota - Trincomalee - Jaffna - Chennai */}
                  {itinerarie.ports
                    .map((portList) => portList.name)
                    .join(" - ")}{" "}
                  ({itinerarie.nights}N/{itinerarie.nights + 1}D)
                </p>
                <p className="text-sm hidden sm:block">
                  {itinerarie.trip_type.replace("_", " ")}
                </p>
              </div>
            </div>

            {/* Mobile-only div */}
            <div className=" bg-gradient-to-r text-center from-[#92278F33] to-[#EA725B4D] text-black font-bold text-sm py-[9px] px-[10px] rounded-tr-none rounded-tl-none rounded-[6px] md:hidden">
              {formatDateWithOrdinal(itinerarie.start_date, true)} →{" "}
              {formatDateWithOrdinal(itinerarie.end_date, true)}
            </div>

            {/* Information Section */}
            <div className="flex flex-col md:w-[643px] ">
              {/* Dates Section */}
              <div className="flex items-center space-x-2 bg-[#FFD600] rounded-md w-[136px] h-[64px] justify-center hidden md:flex ">
                <span className="text-black ml-3 font-bold text-lg">
                  {formatDateWithOrdinal(itinerarie.start_date, false)}
                </span>
                <span className="text-gray-500">→</span>
                <span className="text-black font-bold text-lg">
                  {formatDateWithOrdinal(itinerarie.end_date, false)}
                </span>
              </div>

              {/* Shore Excursions Button */}
              <div className="mt-5 flex justify-start justify-between items-center relative left-[-10px] md:hidden">
                <button className="bg-light-blue-primary/[0.1] text-light-blue-primary text-[10px] px-[18px] py-[8px] rounded-full rounded-l-none font-bold flex items-center space-x-2">
                  Shore Excursions for below ports{" "}
                  <span className=" text-white px-2 ml-[10px] bg-light-blue-primary rounded-full text-sm">
                    i
                  </span>
                </button>
                <p className="flex items-center text-[14px] font-semibold gap-1">
                  {" "}
                  <span>
                    <img src="/images/roundtrip.png" alt="round trip icon" />
                  </span>
                  {itinerarie.trip_type.replace("_", " ")}
                </p>
              </div>

              {/* Visiting Ports */}
              <div className="mt-[16px] mb-[16px] md:mt-[31px] md:mb-[35px]">
                <p className="text-gray-500 text-sm">Visiting Ports</p>
                <p className="text-gray-800 font-medium">
                  {itinerarie.ports
                    .map((portList) => portList.name)
                    .join(" | ")}
                </p>
              </div>

              {/* Shore Excursions Button */}
              <div className="flex justify-end absolute right-0 hidden sm:block right-[5.222rem]">
                <button className="bg-light-blue-primary/[0.1] text-light-blue-primary px-[24px] py-[12px] rounded-full rounded-r-none font-semibold flex items-center space-x-2">
                  Shore Excursions{" "}
                  <span className=" text-white px-2 ml-[10px] bg-light-blue-primary rounded-full text-sm">
                    i
                  </span>
                </button>
              </div>

              {/* Divider Line */}
              <hr className="my-2 border-gray-100 opacity-[0.3]" />

              <div className="flex justify-between items-center sm:items-start mt-[16px] md:mt-[35px] ">
                <div>
                  <p className="text-gray-500 text-sm">Inclusions:</p>
                  <div className="max-w-[525px] gap-[10px] w-full flex space-x-2 items-center leading-4 tracking-wider sm:text-base text-[13px] ">
                    {itinerarie.inclusions.map((inclusion) => (
                      <p className="text-gray-800 font-medium">
                        <span className="text-green-600">✓</span> {inclusion}
                      </p>
                    ))}
                    <a href="#" className="text-blue-500 font-medium underline">
                      View All
                    </a>
                  </div>
                </div>

                <div className="hidden sm:block text-xs">
                  <p className="line-through text-gray-500 text-sm">
                    ₹{itinerarie.actual_starting_fare}
                  </p>
                  <p className="text-2xl font-bold text-[30px] text-gray-800">
                    ₹{itinerarie.per_guest_per_night}
                  </p>
                  <p className="text-sm text-gray-500">
                    Per Person
                    <br />
                    Excl. GST charges
                  </p>
                </div>
              </div>

              {/* Offers Section */}

              {/* Divider Line */}
              <hr className="mt-4 border-gray-100 opacity-[0.3]" />
              {/* Offers and Pricing Section */}
              <div className="flex flex-col md:flex-row justify-between items-center mt-4 md:mt-5">
                <div className="flex w-full justify-between items-end md:block">
                  <div>
                    <p className="text-gray-500 text-sm">Offers</p>
                    <div className="flex flex-col text-green-primary">
                      {itinerarie.offers_available.map((offerList) => (
                        <div className="flex items-center gap-1 text-green-600 font-medium">
                          {" "}
                          <span>
                            <img src="/images/offer.png" alt="offer" />
                          </span>{" "}
                          {offerList}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="relative md:hidden">
                      {/* Banner Shape */}
                      <div className="bg-[#F9684D] text-white px-4 py-2 text-xs font-semibold rounded-bl-lg rounded-tl-lg flex items-center">
                        <span className="absolute left-[-10px] w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-r-[10px] border-l-[#F9684D]"></span>
                        Fast Selling
                      </div>
                    </div>

                    <div className="text-xs block text-right md:hidden">
                      <p className="line-through text-gray-500 text-sm">
                        ₹{itinerarie.actual_starting_fare}
                      </p>
                      <p className="text-2xl font-bold text-[30px] text-gray-800">
                        ₹{itinerarie.per_guest_per_night}
                      </p>
                      <p className="text-sm text-gray-500">
                        Per Person
                        <br />
                        Excl. GST charges
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="w-full flex justify-end mt-4 md:mt-0 space-x-3">
                  <button className="w-1/2 md:w-auto border-2 border-purple-primary text-purple-primary px-4 py-2 rounded">
                    BOOK NOW
                  </button>
                  <button className="w-1/2 md:w-auto border border-purple-600 bg-purple-primary text-white px-4 py-2 rounded">
                    VIEW ITINERARY
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No Result Found</div>
      )}
    </>
  );
};

export default CruiseCard;
