import { IMovieCard } from "../Interfaces/IMovie";

const BASE_URL : string = "http://localhost:5204/api";
//GENRE
export const GetGenres = async () => {
    const response = await fetch(`${BASE_URL}/Genres`, {method:'GET'});
    const data = await response.json();
    return data;
};

export const GetGenreByID = async (id : number) => {
    try {
        const response = await fetch(`${BASE_URL}/Genres/${id}`, {
            method: 'GET', 
        });

        if (!response.ok) {
            console.log(`Failed to Fetch Genre`);
            return null;
        }

        const result = await response.json();  
        
        return result;  
    } catch (error) {
        console.error("Error Fetching Genre", error);
        return null;
    }
};


//Movies
export const GetMovieByID = async (id : number) => {
    try {
        const response = await fetch(`${BASE_URL}/Movie/${id}`, {
            method: 'GET', 
        });

        if (!response.ok) {
            console.log(`Failed to Fetch Movie`);
            return null;
        }

        const result = await response.json();  
        
        console.log(result)
        return result;  
        
    } catch (error) {
        console.error("Error Fetching Movie", error);
        return null;
    }
};

export const GetMovies = async (currentPage : number, size : number, searchStringP = "") => {
    const params = new URLSearchParams();
    params.append(currentPage.toString(), size.toString());
    
                               
    const response = await fetch(`${BASE_URL}/Movie?Page=${currentPage.toString()}&Size=${size}&SearchString=${searchStringP == "" ? null : searchStringP}`,
         {
            method:'GET'
         }
    );
    const data = await response.json();
    console.log(data)
    return data;
};

export const FavoriteMovie = async (id: number) => {
    try {
        const response = await fetch(`${BASE_URL}/Movie/ToggleFav/${id}`, {
            method: 'PATCH',  
        });

        if (!response.ok) {
            throw new Error(`Failed to toggle favorite for movie with id ${id}`);
        }

        const result = await response.json();  
        console.log("Fav Button Clicked", result);

        return result;  
    } catch (error) {
        console.error("Error toggling favorite movie:", error);
        
        return null;
    }
};

export const GetAllFavoriteMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/Movie/Favorites`, {
            method: 'GET',  // Changed to PATCH since your backend uses PATCH
        });

        if (!response.ok) {
            throw new Error(`Failed to Fetch Favorite Movies`);
        }

        const result = await response.json();  
        
        return result;  
    } catch (error) {
        console.error("Error Fetching Favorite Movies", error);
       
        return [];
    }
};

export const GetMoviesByGenreEndPoint = async (genreID : number) => {
    try {
        const response = await fetch(`${BASE_URL}/Movie/Genre/${genreID}`, {
            method: 'GET',  
        });

        if (!response.ok) {
            throw new Error(`Failed to Fetch Movies by this Genre ${genreID}`);
        }

        const result = await response.json();  
        
        return result;  
    } catch (error) {
        console.error("Error Fetching Movies By Genre", error);
       
        return [];
    }
};

export const GetMoviesByPriceRange = async (minValue : number, maxValue : number) => {
    try {
        const response = await fetch(`${BASE_URL}/Movie/Price/${minValue}-${maxValue}`, {
            method: 'GET',  
        });

        if (!response.ok) {
            throw new Error(`Failed to Fetch Movies by this Price Range: ${minValue} - ${maxValue}`);
        }

        const result = await response.json();  
        
        return result;  
    } catch (error) {
        console.error("Error Fetching Movies By Price Range", error);
       
        return [];
    }
};

export const SearchMovies = async (query : string) => {
    const response = await fetch(`${BASE_URL}/Movie&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
}

export const AddMovieEndPoint = async (AddMovie : Omit<IMovieCard, "favOnClick" | "isFavorite" | "releaseDate" | "onMovieUpdate">) => {
    console.log("Loading Endpoint : AddMovie")
    console.log("From Endpoint Movie" + AddMovie)
    try {
            const response = await fetch(`${BASE_URL}/Movie`, {
                method: "POST",
                 headers: {
                        "Content-Type": "application/json",
                 },
                body: JSON.stringify(AddMovie)
            });

            if (!response.ok){
                console.log("Status Code:"+ response.status)
                return;
            }

            const result = await response.json();
            console.log(result)
            return result;
            

    } catch (error) {
        console.log(error)
    }
}

export const DeleteMovieEndPoint = async (movieID : number) => {
  console.log(movieID.toString())
    try {
            const response = await fetch(`${BASE_URL}/Movie/${movieID.toString()}`, {
                method: "DELETE",
                 headers: {
                        "Content-Type": "application/json",
                 },
                
            });

            if (!response.ok){
                console.log("Status Code:"+ response.status)
                return;
            }

            const result = await response.json();
            console.log(result)
            return result;
            

    } catch (error) {
        console.log(error)
    }
}

export const EditMovieEndPoint = async (editMovie : Omit<
      IMovieCard,
      "favOnClick" | "isFavorite" | "releaseDate" | "releaseDateInt" | "genreID" | "onMovieUpdate"
    >) => {
    try {
            const response = await fetch(`${BASE_URL}/Movie/${editMovie.movieID}`, {
                method: "PUT",
                 headers: {
                        "Content-Type": "application/json",
                 },
                body: JSON.stringify(editMovie)
            });

            if (!response.ok){
                console.log("Status Code:"+ response.status)
                return;
            }

            const result = await response.json();
            console.log(result)
            return result;
            

    } catch (error) {
        console.log(error)
    }
}


