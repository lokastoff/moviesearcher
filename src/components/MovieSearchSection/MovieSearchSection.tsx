import { Filters } from "./Filters"
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { searchMovieByName } from "../../services/ApiCalls";
import { Loading } from "../Loading/Loading";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { setUrl } from "../../store/slices/searchParamsSlice";
import { addSearchTerm } from "../../store/slices/searchLatestSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
interface SuggestSeriesReleaseYears{
    start:number
    end:number
}

interface SuggestInterface {
    id: number;
    name: string;
    alternativeName:string
    year:string
    isSeries: boolean
    releaseYears: SuggestSeriesReleaseYears[]
}

interface ApiResponse {
    docs: SuggestInterface [];
}


export const MovieSearchSection:React.FC = () =>{
    const recentSearches = useSelector((state:RootState) => state.search.recentSearches);
    const dispatch = useDispatch()
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    let [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<SuggestInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isInputFocused, setInputFocused] = useState(false);
    const [isInputEmpty, setIsInputEmpty] = useState(true)

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            try {
                const data:ApiResponse = await searchMovieByName(inputValue);
                setSuggestions(data.docs);
                console.log(data.docs)
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
    const handleSuggestClick = (id:number, inputValue:string) => {
        dispatch(addSearchTerm(inputValue))
        console.log(recentSearches)
        const params = new URLSearchParams(searchParams.toString());

        setSearchParams(params);
        dispatch(setUrl(`?${params.toString()}`));
        navigate(`/movie/${id}`)
    }
    



    return(
        <section className="py-[20px] bg-[#081b27] min-h-[90vh] max-w-full">
            <div className="contentContainer flex flex-col items-center justify-center px-[60px] ">
                <div className="headerWrapper mb-[30px]">
                    <h1 className="font-black text-[3.125rem] text-white text-center">Начни искать сейчас!</h1>
                </div>
                <div className="searchContainer mb-[100px] w-full sm:max-w-[50%]  relative ">
                    <input type="text" value={inputValue} onChange={handleOnInput} onFocus={handleOnFocus} onBlur={handleOnBlur} placeholder="Звёздные войны. Эпизод 4: Новая надежда" className="w-full rounded-[40px] border-[1px] border-[#1e445c] text-center placeholder:text-[0.7rem]"/>
                    { isInputFocused && inputValue && (
                        <div className="searchResultsContainer relative">
                            {isLoading ? <div className="bg-[#0c2738] text-white flex w-full items-center justify-center h-[300px] absolute z-[100] rounded-[8px]"><Loading/></div> :
                                <ul className=" text-white absolute w-full rounded-[8px] z-[100]">
                                    {suggestions.map((suggestion: SuggestInterface) => (
                                        <motion.li whileHover={{scale:1.02}} key={suggestion.id} onClick={() => handleSuggestClick(suggestion.id, inputValue)} className="bg-[#0c2738] rounded-[4px] px-[10px] h-[60px] max-sm:h-[80px] flex items-center border-[#00000080] max-sm:border-black border-[1px] w-full"><span>{suggestion.name?suggestion.name:suggestion.alternativeName} ({suggestion.isSeries?' сериал':null} {suggestion.year} {suggestion.isSeries?`- ${suggestion.releaseYears[0].end!==null?suggestion.releaseYears[0].end:''}`:''})</span></motion.li>
                                    ))}
                                </ul>
                            }
                            
                        </div>
                    )}
                    { isInputFocused && !inputValue && (
                        <div className="searchResultsContainer relative">
                                <ul className="text-white absolute w-full rounded-[8px] z-[100]">
                                {recentSearches.slice(0, 3).map((search, index) => (
                                    <motion.li whileHover={{scale:1.02}} key={index} onClick={(e) => {
                                        setInputValue('')
                                        setInputValue(search);
                                    }}  className="bg-[#0c2738] rounded-[4px] px-[10px] h-[60px] max-sm:h-[80px] flex items-center border-[#00000080] max-sm:border-black border-[1px] w-full"><span>{search}</span></motion.li>
                                ))}
                            </ul> 
                            
                        </div>
                    )}
                    
                </div>
                <Filters/>
            </div>
        </section>
    )
}
