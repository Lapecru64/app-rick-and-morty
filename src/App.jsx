import axios from "axios"
import { useEffect, useState } from "react";
import './App.css';
import getRandomNumber from "./utils/getRandomNumber";
import LocationInfo from "./components/LocationInfo";
import ResidentCard from "./components/ResidentCard";
import FormLocation from "./components/FormLocation";
import useFetch from "./hooks/useFetch";

function App() {
  
  const [idLocation, setIdLocation] = useState(getRandomNumber(126));
  
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

    const url = `https://rickandmortyapi.com/api/location/${idLocation}`;
    const [location, getSingleLocation, hasError, isLoading] = useFetch(url)
    
    useEffect(() => {
      getSingleLocation()
  }, [idLocation]);

  return (
    <div className="container">
      <h1>RICK AND MORTY APP</h1>
      <FormLocation setIdLocation={setIdLocation} />
      {
        isLoading 
        ? (<h2>Loading...</h2>)
        : (
          hasError
          ? (<h1>❌ Hey! you must provide an id from 1 to 126 😭</h1>)
          : (
            <>
              <LocationInfo location={location} />
              <div className="resident-container">
                {
                  location?.residents.slice((page-1)*itemsPerPage, page*itemsPerPage).map(url => (
                    <ResidentCard
                      key={url}
                      url={url}
                    />
                  ))
                }
                <div className="pagination">
                  <button onClick={() => setPage(prev => Math.max(prev - 1, 1))}>Prev</button>
                  <span>Page {page}</span>
                  <button onClick={() => setPage(prev => (location?.residents.length/itemsPerPage > prev ? prev + 1 : prev))}>Next</button>
                </div>
              </div>
            </>
          )     
        )
      }
    </div>
  );
}

export default App;
