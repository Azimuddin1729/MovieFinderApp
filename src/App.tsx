import { useState,useEffect } from 'react'
import './App.css'
import Search from './components/Search';


const API_BASE_URL=
"https://api.themoviedb.org/3";
const API_KEY=import.meta.env.VITE_TMDB_API_KEY;


function App() {
   
  const [searchMovie,setSearchMovie]=useState("");

  const [errorMessage,setErrorMessage]=useState<string | null>(null);

  const fetchMovies = async () => {
    try {
     
      
    } catch (e) {
      console.error("Error fetching movies:", e);
      setErrorMessage("Failed to fetch movies");
    }
  };

  useEffect(()=>{

  },[])
 
  return (
    <>
      <div className="absolute inset-0 bg-center bg-cover bg-[url('/background2.jpg')] z-0" />

      <div className="flex flex-col items-center justify-center text-center pt-12 relative z-10 ">
        
        <header >
            <h1>
             
              <img  className="w-[180px] sm:w-[240px] md:w-[320px] lg:w-[480px] h-auto rounded-lg shadow-lg object-contain mb-6"
              src="./background_main1.png" alt="Movies Banner"></img>

              <div className='text-base sm:text-xl md:text-2xl font-semibold text-amber-50'>
                Find The  
                  <span className="bg-gradient-to-r from-[#3206c2] to-[#ec5a05e5] bg-clip-text text-transparent"> Movies 
                  </span> You Want To Enjoy Watching With Others
              </div>
            </h1>
          </header>

          <Search searchTerm={searchMovie} setSearchTerm={setSearchMovie}></Search>

      </div>   
    </>
  )
}

export default App
