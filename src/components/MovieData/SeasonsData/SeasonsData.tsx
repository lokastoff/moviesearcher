import { SeasonList } from "./SeasonList"
interface SeasonDataProps{
    movieId:string 
}
export const SeasonData:React.FC<SeasonDataProps> = ({movieId}) =>{
    return(
        <section className='actors w-full'>
            <div className='headerContainer mb-[30px]'>
                <h1 className='text-white font-bold text-[3rem] text-center'>Сезоны</h1>
            </div>
            <div className="seasonListContainer w-full flex items-center justify-center">
                <SeasonList movieId={movieId}/>
            </div>
        </section>
    )
}