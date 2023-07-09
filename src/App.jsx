
import { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import getRandomNumber from "./utils/getRandomNumber";
import LocationInfo from "./components/LocationInfo";
import ResidentCard from "./components/ResidentCard";
import FormLocation from "./components/FormLocation";

function App() {
  const [location, setLocation] = useState();
  const [idLocation, setIdLocation] = useState(getRandomNumber(126));
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Añadimos el estado para manejar la página
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${idLocation}`;
    setIsLoading(true);
    axios.get(url)
      .then(res => {
        setLocation(res.data);
        setHasError(false);
      })
      .catch(err => {
        console.error(err);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
