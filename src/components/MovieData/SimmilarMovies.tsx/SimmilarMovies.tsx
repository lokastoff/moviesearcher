import { Carousel } from 'antd';
import { useEffect, useState } from 'react';
import { fetchPostersData } from '../../../services/ApiCalls';
import { useNavigate } from 'react-router';
export interface SimmilarMoviesInterface {
    name: string; 
    id: string; 
    poster:{
        url:string
    } 
  }


interface PosterCarouselProps{
    simmilarMoviesArray:SimmilarMoviesInterface[]
}
export const SimmilarMovies:React.FC<PosterCarouselProps> = ({simmilarMoviesArray}) =>{
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    console.log(simmilarMoviesArray)

    const handleMovieClick = (id:string) => navigate(`/movie/${id}`)
    return(
        simmilarMoviesArray.length>0?
        <section className="sectionPosters w-full sm:max-w-[50%] max-sm:w-full flex flex-col items-center max-sm:px-[15px]">
            <div className='headerContainer mb-[30px]'>
                <h1 className='text-white font-bold text-[3rem] text-center'>Похожие фильмы</h1>
            </div>
            <div className='carouselContainer w-full '>
                <Carousel className='custom-carousel'>
                {simmilarMoviesArray.map((movie) => (
                    <div key={movie.id} onClick={()=>handleMovieClick(movie.id)}  className='text-white sm:w-[500px] sm:h-[500px]'>
                        <img src={movie.poster.url} alt={`Poster ${movie.id}`} key={movie.id}  className='max-w-full  max-h-full object-contain mx-auto'/>
                    </div>
                ))}
                </Carousel>
            </div>
        </section>
        :<div className='headerContainer mb-[30px] w-full text-center  '>
            <h1 className='text-white font-bold text-[3rem] text-center mb-[30px]'>Похожие фильмы</h1>
            <div className='text-center'><span className='text-white font-bold text-[1.5rem]'>Не найдено похожих фильмов</span></div>
        </div>
    )
}