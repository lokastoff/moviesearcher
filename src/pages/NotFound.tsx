import { Nav } from "../components/Nav/Nav"
export const NotFound:React.FC = () => {
    return (
            <div className="flex items-center justify-center bg-[#081b27] h-[90vh]">
                <div className="contentContainer flex flex-col items-center justify-center px-[60px] ">
                    <div className="headerWrapper mb-[10px]">
                        <h1 className="font-black text-[3.125rem] text-white text-center">404</h1>
                    </div>
                    <div className="descriptionWrapper">
                        <h1 className="font-black text-[3.125rem] text-white text-center">Such page does not exist yet</h1>
                    </div>
                </div>
            </div>
    )
}