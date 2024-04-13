import { useEffect, useState } from "react"
import { fetchMovieInfoById } from "../../services/ApiCalls"
import { useParams } from "react-router-dom"
import { Loading } from "../Loading/Loading"
import { MovieDescription } from "./MainData/MovieDescription"
import { ImgAndRating } from "./MainData/ImgAndRating"
import { ActorsList } from "./Actors/ActorsList"
import { SeasonData } from "./SeasonsData/SeasonsData"
import { PostersCarousel } from "./PostersCarousel/PostersCarousel"
import { SimmilarMovies } from "./SimmilarMovies.tsx/SimmilarMovies"
import { SimmilarMoviesInterface } from "./SimmilarMovies.tsx/SimmilarMovies"
import { UserReviews } from "./UserReviews.tsx/UserReviews"


export interface ActorInfoInterface {
    description: string;
    enName: string;
    enProfession: string;
    id: number;
    name: string;
    photo: string;
    profession: string;
  }
  interface MovieDataInterface {
    isSeries: boolean;
    poster: { url: string };
    name: string;
    year: string;
    alternativeName: string;
    ageRating: string;
    description: string;
    rating: {
        kp: string;
        imdb: string;
    };
    persons: ActorInfoInterface[];
    releaseYears?: [{ end: string }]; 
    similarMovies: SimmilarMoviesInterface[]
    }


export const MovieData:React.FC = () =>{

    const [isLoading, setIsLoading] = useState(true)
    const [mainImg,setMainImg] = useState('')
    const [isTitleSeries, setIsTitleSeries] = useState(false)
    const [seasonEndYear, setSeasonEndYear] =useState('')
    const [titleName,setTitleName] = useState('')
    const [titleYear,setTitleYear] = useState('')
    const [alternativeName, setAlternativeName] = useState('')
    const [ageRating,setAgeRating] = useState('')
    const [description, setDescription] = useState('')
    const [ratingKp, setRatingKp] = useState('')
    const [ratingImdb, setRatingImdb] = useState('')
    const [actors,setActors] = useState<ActorInfoInterface[]>([])
    const [reviews,setReviews] = useState<string[]>([])
    const [simMovies, setSimMovies] = useState<SimmilarMoviesInterface[]>([])
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const data = async () => {
            try{
                if(id){
                setIsLoading(true)
                const movieData = await fetchMovieInfoById(id) as MovieDataInterface; 
                setIsTitleSeries(movieData.isSeries)
                setMainImg(movieData.poster.url)
                setTitleName(movieData.name)
                setTitleYear(movieData.year)
                setAlternativeName(movieData.alternativeName)
                setAgeRating(movieData.ageRating)
                setDescription(movieData.description)
                setRatingKp(movieData.rating.kp)
                setRatingImdb(movieData.rating.imdb)
                setActors(movieData.persons)
                setSimMovies(movieData.similarMovies)
                console.log(movieData)
                if (movieData.isSeries){
                    setSeasonEndYear(movieData.releaseYears?.[0]?.end ?? '')
                    
                }
                window.scrollTo(0, 0)
            }
            }catch (error){
                console.error(error)
            }finally{
                setIsLoading(false)
            }
        };
            data();
            
            
      },[id]);


      if (isLoading) {
        return (
        <div className='bg-[#0c2738] w-full h-[100vh] flex items-center justify-center'>
          <Loading />
        </div>
        );
      }
    return(
        <section className="bg-[#081b27] min-h-[90vh] ">
            <div className="topInfoContainer flex max-sm:flex-col pt-[100px] h-auto max-sm:py-[50px] px-[300px] max-sm:px-0 max-sm:items-center">
                <ImgAndRating mainImg={mainImg} ratingKp={ratingKp} ratingImdb={ratingImdb}/>
                <div className="max-sm:mt-[30px]">
                    <MovieDescription isSeries={isTitleSeries} titleName={titleName} titleYear={titleYear} alternativeName={alternativeName} ageRating={ageRating} description={description} seasonEndYear={seasonEndYear}/>
                </div>
            </div>
            <div className="actorsInfoContainer pt-[100px] pb-[30px]">
                <ActorsList actors={actors}/>
            </div>
            {
            isTitleSeries?
            <div className="seasonContainer pt-[100px] pb-[30px]">
                <SeasonData movieId={id as string}/>
            </div>
            :
            null
            }
            <div className="carouselsContainer pt-[100px] pb-[30px] sm:px-[20px] flex max-sm:flex-col ">
                <PostersCarousel id={id as string}/>
                <SimmilarMovies simmilarMoviesArray={simMovies}/>
            </div>
            <div className="reviewsContainer pt-[300px] pb-[30px]">
                <UserReviews/>
            </div>
        </section>
    )
}