import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { useEffect, useState } from 'react';
import { Loading } from './components/Loading/Loading';
import { NotFound } from './pages/NotFound';
import { checkEligibility } from './services/ApiCalls';
import { Layout } from './pages/Layout/Layout';
import { MoviePage } from './pages/MoviePage';
import { Provider } from 'react-redux';
import { store } from './store/store';
function App() {

  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEligibility = async () => {
      const errorMsg:string | null = await checkEligibility();
      setApiError(errorMsg);
      setIsLoading(false);
    };

    fetchEligibility();
  },[]);

  if (isLoading) {
    return (
    <div className='bg-[#0c2738] w-full h-[100vh] flex items-center justify-center'>
      <Loading />
    </div>
    );
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
      {apiError ? <div>{apiError}</div> :
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="404" element={<NotFound />} />
            <Route path="movie/:id" element={<MoviePage / >}/>
          </Route>
        </Routes>
      } 
      </BrowserRouter>
    </Provider>
  );
}

export default App;
