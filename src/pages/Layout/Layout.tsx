import { Outlet } from 'react-router-dom';
import { Nav } from '../../components/Nav/Nav';

export const Layout:React.FC = () => {
    return(
        <>
            <Nav/>
            <Outlet/>
        </>
    )
}