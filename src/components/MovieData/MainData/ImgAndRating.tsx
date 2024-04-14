
interface ImgAndRatingProps{
    mainImg:string
    ratingKp:string
    ratingImdb:string
}

export const ImgAndRating:React.FC<ImgAndRatingProps> = ({mainImg, ratingImdb,ratingKp}) =>{
    const ratingKpToNum = parseFloat(ratingKp)
    const fixedRatingKp= ratingKpToNum.toFixed(1)
    const ratingImdbToNum = parseFloat(ratingImdb)
    const fixedRatingImdb = ratingImdbToNum.toFixed(1)
    return(
        <section className="imgAndRatingContainer flex flex-col gap-[10px] w-full max-w-[350px] sm:min-w-[250px] h-auto ">
            {mainImg?
            <img src={mainImg} alt="titlePoster" className="w-full h-auto mb-[30px] max-sm:mb-[5px]"/>
            :
            <img src="/assets/noimagePlaceholder.png" alt="titlePoster" className="w-full h-auto mb-[30px] max-sm:mb-[5px]"/>
            }
            {
            ratingKpToNum>0?
            <div className="kpRating  flex items-center justify-between h-auto">
                <span className="text-white font-bold text-[1.5rem] ">Рейтинг Кинопоиск</span>
                <span className="text-white font-bold text-[1.5rem]">{fixedRatingKp}</span>
            </div>
            :null
            }
            {ratingImdbToNum>0?
            <div className="imdbRating flex justify-between">
                <span className="text-white font-bold text-[1.5rem]">Рейтинг IMDB</span>
                <span className="text-white font-bold text-[1.5rem] ">{fixedRatingImdb}</span>
            </div>
            :null}   
        </section>
    )
}