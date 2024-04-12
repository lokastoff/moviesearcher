
interface DescriptionProps {
    isSeries:boolean
    titleName:string
    titleYear:string
    alternativeName:string
    ageRating:string
    description:string
    
}

export const MovieDescription:React.FC<DescriptionProps> = ({isSeries, titleName, titleYear, alternativeName, ageRating, description}) => {
    return(
        <section className="dataContainer ml-[100px] max-sm:m-0 ">
            <div className="titleNameContainer flex flex-col w-full max-sm:items-center max-sm:text-center">
                <span className="text-white font-bold text-[3rem] ">{titleName?titleName:alternativeName} ({isSeries?'сериал ':null}{titleYear})</span>
                <span className="text-[#ffffff99] font-normal text-[1.5rem] ">{alternativeName} {ageRating?`${ageRating}+`:null}</span>
            </div>
            <div className="descriptionContainer mt-[20px] max-sm:px-[30px] max-sm:text-center">
                <span className="text-white font-normal text-[1.5rem] max-sm:text-[1rem] ">{description}</span>
            </div>
        </section>
    )
}