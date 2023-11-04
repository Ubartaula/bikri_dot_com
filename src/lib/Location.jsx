import React, { useState, useEffect } from "react";

const Location = ({ latitude, longitude }) => {
  const [place, setPlace] = useState("");

  useEffect(() => {
    const fetchPlaceName = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        if (response.ok) {
          const data = await response.json();
          // Extract the place name from the response
          const placeName = data.display_name;
          setPlace(placeName);
        } else {
          // Handle errors if the request fails
          console.error("Failed to fetch place name");
        }
      } catch (error) {
        console.error("Error fetching place name", error);
      }
    };

    fetchPlaceName();
  }, [latitude, longitude]);

  return (
    <div>{place ? <p>Place: {place}</p> : <p>Loading place name...</p>}</div>
  );
};

// export default Location;
