import { Link } from "react-router-dom"
import { NavLogo } from "./NavLogo"
import { NavMenu } from "./NavMenu"
export const Nav:React.FC = () =>{
    return(
        <nav className="h-[10vh] w-full bg-[#0c2738]">
            <div className="flex justify-between items-center contentContainer mx-[120px] max-sm:mx-0 px-[60px] max-sm:px-[30px] h-full">
                <NavLogo/>
                <NavMenu/>
            </div>
        </nav>
    )
}