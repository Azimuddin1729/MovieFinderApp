import { useState,useEffect } from 'react'
import './App.css'
import Search from './components/Search';
import axios from 'axios';
import { Spinner } from './components/Spinner';
import { MovieCard } from './components/MovieCard';


const API_BASE_URL=
"https://api.themoviedb.org/3";
const API_KEY=import.meta.env.VITE_TMDB_API_KEY;


function App() {
   
  const [searchMovie,setSearchMovie]=useState("");

 

  const [errorMessage,setErrorMessage]=useState("");
  const [movieList,setMovieList]=useState([]);
  const [isLoading,setIsLoading]=useState(false);

  const fetchMovies = async (query='') => {
    setIsLoading(true); 
    setErrorMessage(""); 

    try {
       const endpoint= query?
       `${API_BASE_URL}/search/movie?query=${encodeURI(query)}`:
       `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

        const response = await axios.get(endpoint, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
       });


      if(!response.data || response.data.length === 0) {
        throw new Error("Failed to fetch new movies");
        setMovieList([]);
        return;
      }

      const data = response.data;
      // console.log(data);
      setMovieList(data.results);

    
    } 
    
    catch (error) {
      
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Failed to fetch movies. Please try again later.");
      
    }

    finally {
      setIsLoading(false); 
    }
  };

  

  useEffect(()=>{
    fetchMovies(searchMovie);
  },[searchMovie])

  return (
    <>
   
      <div
        className="
          fixed inset-0 
          bg-[url('/background2.jpg')] 
          bg-center bg-cover bg-no-repeat 
          -z-20
        "
      />
     
      <div className="flex flex-col items-center justify-center text-center pt-12 relative z-10 ">
        
        <header className="sm:mt-10 mt-5">
            <h1>
             
              <img  className="w-[180px] sm:w-[240px] md:w-[320px] lg:w-[480px]  rounded-lg shadow-lg  mb-6 max-w-lg h-auto object-contain mx-auto drop-shadow-md"
              src="./background_main1.png" alt="Movies Banner"></img>

              <div className='text-base sm:text-xl md:text-2xl font-semibold text-amber-50'>
                Find The  
                  <span className="bg-gradient-to-r from-[#3206c2] to-[#ec5a05e5] bg-clip-text text-transparent"> Movies 
                  </span> You Want To Enjoy Watching With Others
              </div>
            </h1>

            <Search searchTerm={searchMovie} setSearchTerm={setSearchMovie}>
            </Search>

          </header>


          <section className="space-y-9">
            <h2 className='mt-2'>
              All Movies 
            </h2>

              {isLoading? (
              
                <Spinner />
              ) : errorMessage ?(
                <p className="text-red-500">{errorMessage}</p>

              ):(   <ul className='grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
                  {movieList.map((movie:any) => (
                      <MovieCard key={movie.id} movie={movie} />
                  ))}
                   </ul>
                )
              }
          </section>
      </div>   
    </>
  )
}

export default App
