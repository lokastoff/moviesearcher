import { fetchUserReviewsData } from "../../../services/ApiCalls"
import { useEffect, useState } from "react"
import { Table, Tag, Button  } from "antd"
interface UserReviewsProps{
    id:string
}
export const UserReviews:React.FC<UserReviewsProps> = ({id}) => {

    const [isLoading, setIsLoading] =useState(true)
    const [currentPage,setCurrentPage] = useState(1)
    const [authorId, setAuthorId] = useState('')
    const [author, setAuthor] = useState('')
    const [reviewType, setReviewType] = useState('')
    const [review, setReview] = useState('')
    const [valid, setIsValid] = useState(true)
    const [totalPages, setTotalPages] = useState('')
    const [reviewExpanded, setReviewExpanded] = useState(false);
    useEffect(() => {
        const loadData = async () => {
          try{
            setIsLoading(true)
            const data = await fetchUserReviewsData(currentPage,3, id);
            if(data.docs.length === 0){
                setIsValid(false)
            }
            setAuthorId(data.docs[0].id)
            setAuthor(data.docs[0].author)
            setReview(data.docs[0].review)
            setReviewType(data.docs[0].type)
            setTotalPages(data.total)
            console.log(data)
          }catch(error){
            console.log(error)
          }finally{
            setIsLoading(false)
          }
        };
        loadData();
      }, [currentPage]);
      console.log(reviewType)
      const dataSource = [
        {
          key: authorId,
          name: author,
          review: review,
          reviewType: reviewType
        },
        
      ];

      const columns = [
        {
            title:'Автор',
            dataIndex:'name',
        },
        {
            title:'Отзыв',
            dataIndex:'review',
            render: (text: string) => (
                <div>
                    {reviewExpanded ? text : `${text.substring(0, 100)}...`}
                    <Button type="link" onClick={() => setReviewExpanded(!reviewExpanded)}>
                        {reviewExpanded ? 'Скрыть' : 'Читать далее'}
                    </Button>
                </div>
            ),
        },
        {
            title:'Тип отзыва',
            dataIndex:'reviewType',
            render: (text:string) => {
                let color = '';
                if (text === 'Негативный') {
                  color = 'volcano';
                }
                if (text === 'Позитивный') {
                    color = 'green';
                }
                if (text === 'Нейтральный') {
                    color = 'geekblue';
                }
                return <Tag color={color}>{text.toUpperCase()}</Tag>;
              
            },

        }
       
    ]
    const handlePaginationChange = (page: number) => {
        setCurrentPage(page);
    };

    return(
        valid?
        <section>
           <div className='headerContainer mb-[30px]'>
                <h1 className='text-white font-bold text-[3rem] text-center'>Рецензии пользователей</h1>
            </div> 
            <div className="reviewsContainer sm:px-[200px] px-[10px] ">
                <div className="">
                    <Table
                    className="custom-table"
                    loading={isLoading}
                    columns = {columns}
                    dataSource = {dataSource}
                    pagination = {{
                        responsive: true,
                        position: ["bottomCenter"],
                        pageSize:3,
                        current: currentPage,
                        total: parseInt(totalPages),
                        onChange: handlePaginationChange,
                        hideOnSinglePage: true,
                        showSizeChanger: false
                    }}
                    rowKey="id"
                    />
                    </div>
            </div>
        </section>
        :
        <div className='headerContainer mb-[30px] w-full text-center'>
            <h1 className='text-white font-bold text-[3rem] text-center mb-[30px]'>Рецензии пользователей</h1>
            <div className='text-center'><span className='text-white font-bold text-[1.5rem]'>Не найдено рецензий</span></div>
        </div>
        

    )
}