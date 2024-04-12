import { Link } from "react-router-dom"
import { motion } from "framer-motion"
export const NavMenu:React.FC = () =>{
    return(
        <div className="flex items-center justify-center">
            <div className="linkWrapper ">
                <Link to='/404' className="h-[80px] text-[1.2rem] max-sm:text-[15px] text-[#899ead] mr-[20px]">
                    <motion.span whileHover={{ color: "#ffffff" }}>Случайный фильм</motion.span>
                </Link>
            </div>
            <div className="linkWrapper">
                <Link to='/404' className="h-[80px] text-[1.2rem] text-[#899ead]">
                    <motion.span whileHover={{ color: "#ffffff" }}>Вход</motion.span>
                </Link>
            </div>
        </div>
    )
}