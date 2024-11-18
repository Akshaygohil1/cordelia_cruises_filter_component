import { useState, useEffect } from "react";
import "./App.css";
import Filter from "./components/Filter";
import CruiseCard from "./components/CruiseCard";
import axios from "axios";

function App() {
  const [destinations, setDestinations] = useState([]); // For storing destinations
  const [itinerariesList, setItinerariesList] = useState([]);

  // Fetch destinations from API
  useEffect(() => {
    const fetchDestinations = async () => {
      localStorage.removeItem("response");
      try {
        const response = await axios.get(
          "https://staging.cordeliacruises.com/api/v2/itineraries?pagination=false",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMzlkYzczZTYtNDQ2OC00YjM3LWI2YTItNzQ2YWFjYWYyYzExIiwiZXhwIjoxNzMxODMxNjgxfQ.7X6w0dOMGtrM1Ta47e-YEEhPFbMt2kwz2RshfMyNChw", // Replace with actual token
              "Content-Type": "application/json",
            },
          }
        );

        localStorage.setItem("response", JSON.stringify(response.data));
        const ports = response.data?.ports || [];
        setItinerariesList(response.data?.itineraries);
        setDestinations(ports); // Update destinations state
      } catch (err) {
        console.error("Error fetching destinations:", err);
      }
    };

    fetchDestinations();
  }, []);

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem("response"));
    setItinerariesList(response?.itineraries);
  }, []);

  return (
    <div className="container mx-auto relative pt-8">
      {/* heading */}
      <h1 className="w-auto h-7 text-[22px] md:text-[40px] font-semibold leading-[53.32px] text-center mt-6">
        Explore Cruise Holidays
      </h1>

      {/* filter */}
      <Filter
        destinations={destinations}
        setDestinations={setDestinations}
        setItinerariesList={setItinerariesList}
        itinerariesList={itinerariesList}
      />

      {/* count */}
      <p className="leading-[24px] text-[14px] md:text-[26px] ml-2 opacity-[0.7]">
        Cruise Search Results (
        {itinerariesList && itinerariesList.length > 0
          ? itinerariesList?.length
          : 0}
        )
      </p>
      {/* card */}
      <div className="wrapper">

        {<CruiseCard itinerariesList={itinerariesList} />}
      </div>
      {/* mobile view  */}
    </div>
  );
}

export default App;
