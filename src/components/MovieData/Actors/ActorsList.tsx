import { useState } from 'react';
import { ActorCard } from './ActorCard';
import { ActorInfoInterface } from '../MovieData';
import { Pagination } from 'antd';

interface ActorsListProps {
    actors: ActorInfoInterface[]
}

export const ActorsList:React.FC<ActorsListProps> = ({actors}) =>{
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const handleChange = (page:number) => {
        setCurrentPage(page);
      };


    const uniqueActors = new Map<number, ActorInfoInterface>();
    actors.forEach(actor => {
          if (!uniqueActors.has(actor.id)) {
              uniqueActors.set(actor.id, actor);
          }
      });
    const uniqueActorsArray = Array.from(uniqueActors.values());
    const currentActors = uniqueActorsArray.slice((currentPage - 1) * pageSize, currentPage * pageSize);


    return(
        <section className='actors w-full'>
            <div className='headerContainer mb-[30px]'>
                <h1 className='text-white font-bold text-[3rem] text-center'>Актерский состав и связанные персоны</h1>
            </div>
            <div className='actorsList grid grid-cols-5 gap-y-[20px] px-[50px] mb-[50px]'>
            {
            currentActors.map((actor) => {
                return(
                <ActorCard key={actor.id} name={actor.name} altName={actor.enName} img={actor.photo} role={actor.description}/>
                
                )
            })
            }
            </div>
            <div className='paginationContainer flex items-center justify-center'>
                <Pagination
                    hideOnSinglePage={true}
                    responsive={true}
                    current={currentPage}
                    onChange={handleChange}
                    total={uniqueActorsArray.length}
                    pageSize={pageSize}
                />
            </div>
        </section>
    )
}