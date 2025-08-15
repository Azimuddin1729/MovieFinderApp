type SearchProps = {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
};

export function Search({searchTerm, setSearchTerm}: SearchProps) {
    return (
        <div className="w-[240px] sm:w-[400px] md:w-[760px] bg-light-100/5 px-3 py-2 rounded-lg mt-10 max-w-3xl mx-auto"> 
           <div className="relative flex items-center">

              <img className="absolute left-2 h-5 w-5" src="./search.svg" alt="search"/>
             
              <input className=" w-full bg-transparent py-2 sm:pr-10 pl-10 text-base text-gray-200 placeholder-light-200 outline-hidden" type="text"
              placeholder="Search through the list of movies"
              value={searchTerm} 
              onChange={(e)=>{
                setSearchTerm(e.target.value)
              }}
              >
              </input>


           </div>

        </div>
    )
}
export default Search

