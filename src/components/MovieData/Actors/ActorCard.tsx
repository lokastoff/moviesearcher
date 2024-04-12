
interface ActorProps{
    name:string
    altName:string
    img:string
    role:string
}
export const ActorCard:React.FC<ActorProps> =({name, altName, img, role}) =>{
    return(
        <div className="flex flex-col items-center justify-center">
            <div className="imgContainer max-w-[150px]">
                <img src={img} alt="actorPhoto" className="w-full"/>
            </div>
            <div className="nameContainer">
                <span className="ruName text-white text-[1.5rem]">{name}</span>
            </div>
            <div className="altNameContainer ">
                <span className="altName text-[#ffffff99] text-[1rem]">{altName}</span>
            </div>
            <div className="roleContainer ">
                {role?<span className="altName text-[#ffffff99] text-[1rem]">Роль: {role}</span>:<span className="altName text-[#ffffff99] text-[1rem]">Нет информации о роли в фильме</span>}
            </div>
        </div>
    )
}