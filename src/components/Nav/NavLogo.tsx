import { Link } from "react-router-dom"

export const NavLogo:React.FC = () =>{
    return(
        <Link to="/" className="flex items-center">
            <img src="/assets/logo.png" alt="logo" className="h-[20px] mr-[5px]"/>
            <span className="text-white text-[20px] ">Movie Searcher</span>
        </Link>
    )
}