import { Carousel } from 'antd';
import { useEffect, useState } from 'react';
import { fetchPostersData } from '../../../services/ApiCalls';

interface PostersInterface {
    url: string; 
    id: string;  
  }

interface ApiResponse {
  docs: PostersInterface[]; 
}

interface PosterCarouselProps{
    id:string
}
export const PostersCarousel:React.FC<PosterCarouselProps> = ({id}) =>{
    const [postersUrl, setPostesUrl] = useState<PostersInterface[]>([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=>{
        const data = async()=>{
        try{
            const postersData:ApiResponse = await fetchPostersData(id); 
            setPostesUrl(postersData.docs)
    
        }catch (error){
            console.error(error)
        }
    }
        data();
    },[])
    return(
        postersUrl.length>0?
        <section className="sectionPosters w-full sm:max-w-[50%]  flex flex-col items-center max-sm:px-[15px] max-sm:mb-[100px] ">
            <div className='headerContainer mb-[30px]'>
                <h1 className='text-white font-bold text-[3rem] text-center'>Постеры</h1>
            </div>
            <div className='carouselContainer w-full '>
                <Carousel className='custom-carousel'>
                {postersUrl.map((img) => (
                    <div key={img.id} className='sm:w-[500px] sm:h-[500px] '>
                        <img src={img.url} alt={`Poster ${img.id}`} key={img.id} className='max-w-full  max-h-full object-contain mx-auto'/>
                    </div>
                ))}
                </Carousel>
            </div>
        </section>
        :<div className='headerContainer mb-[30px]  w-full '>
            <h1 className='text-white font-bold text-[3rem] text-center mb-[30px]'>Постеры</h1>
            <div className='text-center'><span className='text-white font-bold text-[1.5rem]'>Не найдено постеров</span></div>
        </div>
    )
}