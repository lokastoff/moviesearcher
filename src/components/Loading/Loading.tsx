import { lineSpinner } from "ldrs"


export const Loading:React.FC = () =>{
    lineSpinner.register()
    return(
        
            <l-line-spinner
                size="100"
                stroke="3"
                speed="1"
                color="white" 
            ></l-line-spinner>
        
    )
}