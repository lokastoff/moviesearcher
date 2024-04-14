import { List, Typography, Pagination} from 'antd';
import { useEffect, useState } from "react"
import { fetchSeasonsData } from '../../../services/ApiCalls';

interface SeasonsProps {
    movieId: string;
  }

interface Episode {
    number: number;
    name: string;
    enName:string
  }
  
  interface SeasonDoc {
    episodes: Episode[];
    number: number;
  }
  
  interface SeasonResponse {
    docs: SeasonDoc[];
    totalDocs: number;
  }

export const SeasonList:React.FC<SeasonsProps> = ({movieId})=>{
    const [seasonNumber, setSeasonNumber] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const [seasonData, setSeasonData] = useState<Episode[]>([]);
    const [totalSeasons, setTotalSeasons] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [valid, setIsValid] = useState(true)
    useEffect(() => {
        const loadData = async () => {
          try{
            setIsLoading(true)
            const data = await fetchSeasonsData(currentPage, 1, movieId);
            if(data.docs.length === 0){
                setIsValid(false)
            }
            setSeasonData(data.docs[0].episodes);
            setTotalSeasons(data.total);
          console.log(data.docs)
          }catch(error){
            console.log(error)
          }finally{
            setIsLoading(false)
          }
        };
        loadData();
      }, [currentPage, movieId]);

      const handlePageChange = (page: number) => {
        setSeasonNumber(page-1);
        setCurrentPage(page)
      };
    return(
        valid === false?
        <div className="descriptionContainer mt-[20px] max-sm:px-[30px] max-sm:text-center">
                <span className="text-white font-normal text-[1.5rem] max-sm:text-[1rem] ">Нет информации по сезонам</span>
        </div>
        :
        <div className='flex flex-col items-center max-sm:px-[10px]'>
            <div className='bg-white rounded-[8px] sm:min-w-[800px]'>
                <List
                className=''
                    loading={isLoading}
                    header={<div>Сезон {seasonNumber===0?`${seasonNumber}: специальные эпизоды`:seasonNumber}</div>}
                    footer={<div>Всего сезонов: {totalSeasons}</div>}
                    bordered
                    dataSource={seasonData}
                    
                >
                <div className="max-h-[400px] overflow-auto">
                        {seasonData.map((item: Episode) => (
                            <List.Item key={item.number}>
                                <Typography.Text>[{item.number}] {item.name ? item.name : null} ({item.enName ? item.enName : null})</Typography.Text>
                            </List.Item>
                        ))}
                    </div>
                </List>
            </div>
            <div className='paginationWrapper pt-[20px]'>
                <Pagination
                responsive={isLoading}
                current={currentPage}
                onChange={handlePageChange}
                total={totalSeasons}
                pageSize={1} 
            />
            </div>
     </div>
                    
    )
}