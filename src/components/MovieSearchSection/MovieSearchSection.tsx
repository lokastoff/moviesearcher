import { Filters } from "./Filters"
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { searchMovieByName } from "../../services/ApiCalls";
import { Loading } from "../Loading/Loading";

interface SuggestInterface {
    id: number;
    name: string;
    alternativeName:string
    year:string
}

interface ApiResponse {
    docs: SuggestInterface [];
}


export const MovieSearchSection:React.FC = () =>{

    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<SuggestInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isInputFocused, setInputFocused] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            try {
                const data:ApiResponse = await searchMovieByName(inputValue);
                setSuggestions(data.docs);
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
            
        };
        if (!inputValue){
            setSuggestions([]);
            return; 
        } 

        const handler = setTimeout(fetchMovies, 1000); 

        return () => clearTimeout(handler);
    }, [inputValue]);

    const handleOnInput = (e:React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)
    const handleOnFocus = () => setInputFocused(true)
    const handleOnBlur = () => {
        setTimeout(() => {
            setInputFocused(false);
        }, 100);
    }
    const handleSuggestClick = (id:number) => navigate(`/movie/${id}`)
    



    return(
        <section className="py-[20px] bg-[#081b27] min-h-[90vh] max-w-full">
            <div className="contentContainer flex flex-col items-center justify-center px-[60px] ">
                <div className="headerWrapper mb-[30px]">
                    <h1 className="font-black text-[3.125rem] text-white text-center">Начни искать сейчас!</h1>
                </div>
                <div className="searchContainer mb-[100px] w-full sm:max-w-[50%]  relative ">
                    <input type="text" onChange={handleOnInput} onFocus={handleOnFocus} onBlur={handleOnBlur}placeholder="Звёздные войны. Эпизод 4: Новая надежда" className="w-full rounded-[40px] border-[1px] border-[#1e445c] text-center placeholder:text-[0.7rem]"/>
                    { isInputFocused && inputValue && (
                        <div className="searchResultsContainer ">
                            {isLoading ? <div className="text-white"><Loading/></div> :
                                <ul className=" bg-[#0c2738] text-white absolute w-full rounded-[8px] z-[100]">
                                    {suggestions.map((suggestion: SuggestInterface) => (
                                        <li key={suggestion.id} onClick={() => handleSuggestClick(suggestion.id)} className="px-[10px] h-[60px] max-sm:h-[80px] flex items-center border-[#00000080] border-[1px] w-full"><span>{suggestion.name} ({suggestion.year})</span></li>
                                    ))}
                                </ul>
                            }
                        </div>
                    )}
                </div>
                <Filters/>
            </div>
        </section>
    )
}