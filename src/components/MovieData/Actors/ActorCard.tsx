
interface ActorProps{
    name:string
    altName:string
    img:string
    role:string
    profession: string
}
export const ActorCard:React.FC<ActorProps> =({name, altName, img, role, profession}) =>{
    return(
        <div className="flex flex-col items-center justify-center max-sm:justify-start">
            <div className="imgContainer max-w-[150px] ">
                <img src={img} alt="actorPhoto" className="w-full max-sm:h-[220px]"/>
            </div>
            <div className="nameContainer max-sm:text-center">
                <span className="ruName text-white text-[1.5rem] ">{name?name:altName}</span>
            </div>
            <div className="altNameContainer max-sm:text-center">
                <span className="altName text-[#ffffff99] text-[1rem]">{altName}</span>
            </div>
            <div className="roleContainer max-sm:text-center">
                {role?<span className="altName text-[#ffffff99] text-[1rem]">{role}</span>:<span className="altName text-[#ffffff99] text-[1rem]">{profession}</span>}
            </div>
        </div>
    )
}