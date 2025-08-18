
export function MovieCard({movie}:any) {
     const { title,vote_average,poster_path,release_date, original_language } = movie;
     return (
       <div className="bg-dark-100/60 p-4 rounded-3xl shadow-inner shadow-light-200/60 flex flex-col items-center w-[180px]">
         {/* bg-red-950 this is also good color */}
            <img
                src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : "./no-image.png"}
                alt={title}
                className="w-[100px] h-[150px] object-cover rounded-lg shadow-md"
            />

            <h3 className="mt-4 text-center text-sm w-full truncate text-gray-50">{title}</h3>

            <div className=" mt-2 flex flex-row items-center flex-wrap gap-2">
                <div className="flex flex-row items-center gap-1">
                    <img 
                    className="size-4 object-contain"
                    src="rating.svg" alt="Rating icon"/>
                    <p className="font-bold text-base text-white">
                        {vote_average? vote_average.toFixed(1):"N/A"}
                    </p>

                   
                    <span className="text-white text-lg mx-2">•
                    </span>

                    <p className="capitalize text-gray-100 font-medium text-base">
                        {original_language}
                    </p>

                    <span className="text-white text-lg mx-2">•
                    </span>

                    <p className="text-gray-100 font-medium text-base">
                        {release_date? release_date.split("-")[0]: "N/A"}
                    </p>

                </div>

                
            </div>
       </div>

     );
}


