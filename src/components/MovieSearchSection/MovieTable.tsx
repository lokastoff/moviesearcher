import { Table } from "antd"
import { useState, useEffect } from "react";
import { fetchMovies } from "../../services/ApiCalls";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
interface Country {
    name: string;
  }
  
interface Movie {
    id: number;
    name: string;
    year: number;
    countries: Country[];
    ageRating: number;
    alternativeName:string
  }
  interface TableProps{
    year: string;
    country: string;
    ageRating:string[]
  }
export const MovieTable:React.FC<TableProps> = ({}) =>{

    let navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [dataSource, setDataSource] = useState<Movie[]>([])
    const [totalPages, setTotalPages] = useState<number>(1)
    const [isLoading,setIsLoading] = useState<boolean>(true)

    const year = searchParams.get('year') || '';
    const country = searchParams.get('country') || '';
    const rating = searchParams.get('rating')?.split(',') || [];
    const currentPage = parseInt(searchParams.get('page') || '1');
    const currentPageSize = parseInt(searchParams.get('pageSize') || '10',10);

    /*useEffect(() => {  
        setCurrentPage(1); 
      }, [year, country, ageRating]);*/

      useEffect(() => {
        const movieFetchData = async () => {
            try {
                setIsLoading(true);
                const movies = await fetchMovies(currentPage, currentPageSize, year, country, rating);
                setDataSource(movies.docs);
                setTotalPages(movies.pages);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
    
        movieFetchData();
    }, [searchParams]);
      
    const columns = [
        {
            title:'Название фильма',
            dataIndex:'name',
            render: (text:string, record:Movie) =>{return text!==null ?text: record.alternativeName}
        },
        {
            title:'Год выпуска',
            dataIndex:'year'
        },
        {
            title:'Страна',
            dataIndex:'countries',
            render: (countries: { name: string }[]) => countries.map(country => country.name).join(', '),
        },
        {
            title:'Возрастной рейтинг',
            dataIndex:'ageRating',
            render: (ageRating: number) => ageRating !== null ? `${ageRating}+` : `Нет информации о возрастном рейтинге`,
            
        },
       
    ]
    
    const handlePaginationChange = async (page:number, pageSize:number) =>{
        const currentParams = new URLSearchParams(searchParams);

        currentParams.set('page', page.toString());
        currentParams.set('pageSize', pageSize.toString());
    
        setSearchParams(currentParams);
            }
    
        
    
    const handleMovieClick = (record: Movie)=>{
        navigate(`/movie/${record.id}`)
    }
    return(
        <div className="mt-[20px] mb-[100px] ">
            <Table
            loading = {isLoading}
            columns = {columns}
            dataSource = {dataSource}
            pagination = {{
                responsive: true,
                position: ["bottomCenter"],
                pageSize:currentPageSize,
                current: currentPage,
                total: totalPages,
                onChange: handlePaginationChange,
                hideOnSinglePage: true,
                pageSizeOptions: [5, 10, 15, 20, 50, 100],
                
            }}
            rowKey="id"
            onRow={(record) => ({
                onClick: () => handleMovieClick(record),
              })}
            
            />
        </div>
    )
}