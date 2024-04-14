import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../store/store";
import { UseDispatch } from "react-redux";
import { logout } from "../../store/slices/isLoggedSlice";
export const NavMenu:React.FC = () =>{
    const isLogged = useSelector((state: RootState) => state.auth.isLogged);
    const dispatch = useDispatch()
    return(
        <div className="flex items-center justify-center">
            <div className="linkWrapper ">
                {isLogged?
                <Link to='/404' className="h-[80px] text-[1.2rem] max-sm:text-[15px] text-[#899ead] mr-[20px]">
                    <motion.span whileHover={{ color: "#ffffff" }}>Случайный фильм</motion.span>
                </Link>:null
                }
            </div>
            <div className="linkWrapper">
            {isLogged?
                <button onClick={()=>dispatch(logout())} className="h-[80px] text-[1.2rem] text-[#899ead]">
                    <motion.span whileHover={{ color: "#ffffff" }}>Выход</motion.span>
                </button>:
                <Link to='/login' className="h-[80px] text-[1.2rem] text-[#899ead]">
                    <motion.span whileHover={{ color: "#ffffff" }}>Вход</motion.span>
                </Link>

            }
            </div>
        </div>
    )
}