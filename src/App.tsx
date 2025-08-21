import { useState,useEffect} from 'react'
import { useDebounce } from 'react-use';  
import './App.css'
import Search from './components/Search';
import axios from 'axios';
import { Spinner } from './components/Spinner';
import { MovieCard } from './components/MovieCard';
import {getTrendingMovies, updateSearchCount} from './appwrite.tsx';
// import { Models } from 'appwrite';
import type { Models } from "appwrite";

const API_BASE_URL=
"https://api.themoviedb.org/3";
const API_KEY=import.meta.env.VITE_TMDB_API_KEY;


function App() {
   
  const [searchMovie,setSearchMovie]=useState("");
  const [errorMessage,setErrorMessage]=useState("");
  const [movieList,setMovieList]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [trendingMovies, setTrendingMovies] = useState<Models.DefaultDocument[]>([]);
  

  useDebounce(()=>{
    setDebouncedSearchTerm(searchMovie);
  }, 500 , [searchMovie]);

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
        setMovieList([]);
        throw new Error("Failed to fetch new movies");
        // return;
      }

      const data = response.data;


      // console.log(data);
      setMovieList(data.results);
      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    }
  
    catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    }

    finally {
      setIsLoading(false); 
    }
  };
   

  const loadTrendingMovies = async () => {
    try{
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    }
    catch(error){
      console.error(`Error fetching trending movies: ${error}`);
      //we dont want to update the seterror state here as otherwise the initial (default)list of movies may not also show up at all
    }

  }

  useEffect(()=>{
    fetchMovies(debouncedSearchTerm);
  },[debouncedSearchTerm])

  useEffect(()=>{
    loadTrendingMovies();
  },[])

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

        {trendingMovies.length>0 &&(
          <section className=''>
            
             <h2 className='text-left text-xl sm:text-2xl md:text-3xl lg:ml-12 text-neutral-950 font-semibold'>
              Trending Movies
             </h2>

             <ul className='flex flex-row overflow-y-auto gap-5 -mt-10 w-full hide-scrollbar'>
              {trendingMovies.map((movie,index) => (
                <li className="flex flex-row overflow-y-auto gap-5 mt-10 w-full hide-scrollbar" key={movie.$id}>
                  <p className='fancy-text mt-[22px] text-nowrap'>
                    {index + 1}
                  </p>
                  <img className='w-[120px] h-[170px] rounded-lg object-cover -ml-3.5' src={movie.poster_url} alt={movie.title} />

                </li>
              )
              )}
             </ul>

          </section>
        )}


          <section className="space-y-9">
           
            <h2 className='text-left text-xl sm:text-2xl md:text-3xl lg:ml-12 text-neutral-950 font-semibold'>
              All Movies 
            </h2>

              {isLoading? (
              
                <Spinner />
              ) : errorMessage ?(
                <p className="text-red-500">{errorMessage}</p>

              ):(   <ul className='grid grid-cols-1 gap-4 xss:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
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
