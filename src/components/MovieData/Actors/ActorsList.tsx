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

      console.log(actors)
    const uniqueActors = new Map<number, ActorInfoInterface>();
    actors.forEach(actor => {
          if (!uniqueActors.has(actor.id)) {
              uniqueActors.set(actor.id, actor);
          }
      });
    const uniqueActorsArray = Array.from(uniqueActors.values());
    const currentActors = uniqueActorsArray.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const modifyProfession = (profession: string) => {
        const words = profession.split(' ');
        if (words.length > 0) {
            words[0] = words[0].slice(0, -1); 
        }
        return words.join(' ');
    }

    return(
        <section className='actors w-full'>
            <div className='headerContainer mb-[30px]'>
                <h1 className='text-white font-bold text-[3rem] text-center'>Актерский состав и связанные персоны</h1>
            </div>
            {uniqueActorsArray.length>0?
            <div className='gridWrapper'>
                <div className='actorsList grid grid-cols-5 max-sm:grid-cols-2 gap-y-[20px] px-[50px] max-sm:px-[10px] mb-[50px]'>
                {
                currentActors.map((actor) => {
                    return(
                    <ActorCard key={actor.id} name={actor.name} altName={actor.enName} img={actor.photo} role={actor.description} profession={modifyProfession(actor.profession)}/>
                    
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
            </div>
            :<div className='text-center'><span className='text-white font-bold text-[1.5rem]'>Нет информации о персонах, связанных с произведением</span></div>
            }
        </section>
    )
}