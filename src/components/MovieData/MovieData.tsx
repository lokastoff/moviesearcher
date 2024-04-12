import { useEffect, useState } from "react"
import { fetchMovieInfo } from "../../services/ApiCalls"
import { useParams } from "react-router-dom"
import { Loading } from "../Loading/Loading"
import { MovieDescription } from "./MovieDescription"
import { ImgAndRating } from "./ImgAndRating"
import { ActorsList } from "./Actors/ActorsList"

export interface ActorInfoInterface {
    description: string;
    enName: string;
    enProfession: string;
    id: number;
    name: string;
    photo: string;
    profession: string;
  }


export const MovieData:React.FC = () =>{

    const [isLoading, setIsLoading] = useState(true)
    const [mainImg,setMainImg] = useState('')
    const [isTitleSeries, setIsTitleSeries] = useState(false)
    const [titleName,setTitleName] = useState('')
    const [titleYear,setTitleYear] = useState('')
    const [alternativeName, setAlternativeName] = useState('')
    const [ageRating,setAgeRating] = useState('')
    const [description, setDescription] = useState('')
    const [ratingKp, setRatingKp] = useState('')
    const [ratingImdb, setRatingImdb] = useState('')
    const [actors,setActors] = useState<ActorInfoInterface[]>([])
    const [seasons,setSeasons] = useState<string[]>([])
    const [reviews,setReviews] = useState<string[]>([])
    const [posters,setPoster] = useState<string[]>([])
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const data = async () => {
            try{
                if(id){
                const movieData = await fetchMovieInfo(id); 
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
                console.log(movieData)
            }
            }catch (error){
                console.error(error)
            }finally{
                setIsLoading(false)
            }
        };
            data();
            
            
      },[]);

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
                    <MovieDescription isSeries={isTitleSeries} titleName={titleName} titleYear={titleYear} alternativeName={alternativeName} ageRating={ageRating} description={description}/>
                </div>
            </div>
            <div className="actorsInfoContainer mt-[100px]">
                <ActorsList actors={actors}/>
            </div>
        </section>
    )
}