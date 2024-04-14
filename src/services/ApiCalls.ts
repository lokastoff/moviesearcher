import axios, { AxiosInstance, AxiosResponse} from "axios";

const token:string = process.env.TOKEN as string;
const apiEndpoint: string = ' https://api.kinopoisk.dev/'
const apiClient: AxiosInstance = axios.create({
    baseURL: apiEndpoint,
    headers: {
      'X-API-KEY': token,
    },
  });

  type NullableString = string | null;

export const checkEligibility = async () =>{
    try{
        const response = await apiClient.get('/v1.4/movie?page=1&limit=1&selectFields=id')
        console.log('Token is valid');
        return null;

    } catch(error){
          return "Произошла ошибка доступа к API Кинопоиска. Если вы уверены, что переданный API ключ верен, повторите попытку позже.";

        }   
}

export const fetchMovies = async (page:number,limit:number, year?: string, country?:string, ageRating?:NullableString[]) =>{
  const selectedFields:string[] = ['name','year','countries','ageRating']
  let query:string = `/v1.4/movie?page=${page}&limit=${limit}&selectFields=id&selectFields=name&selectFields=year&selectFields=ageRating&selectFields=countries&selectFields=alternativeName`
  if (year && year !== '') {
    query += `&year=${year}`;
  }
  if (country && country !== '') {
    query += `&countries.name=${country}`;
  }
  if (ageRating && ageRating.length > 0){
    ageRating.forEach((currentValue)=>{
      query+=`&ageRating=${currentValue}`
    })
  }
  try{
    const response = await apiClient.get(query)
    return response.data;
  }catch(error){
    console.log(error)
  }
}

export const fetchMovieInfoById = async (id:string) =>{
  try{
    const response = await apiClient.get(`/v1.4/movie/${id}`)
    return response.data
  }catch(error){
    console.log(error)
  }
}

export const searchMovieByName = async (name:string) =>{
  try{
    const response = await apiClient.get(`/v1.4/movie/search?page=1&limit=5&query=${name}`)
    return response.data
  }catch(error){
    console.log(error)
  }
}

export const fetchSeasonsData = async (page:number,limit:number,movieId:string)=>{
  try{
    const response = await apiClient.get(`https://api.kinopoisk.dev/v1.4/season?page=${page}&limit=${limit}&movieId=${movieId}`)
    return response.data
  }catch(error){
    console.log(error)
  }
  
}

export const fetchPostersData = async (id:string) =>{
  try{
    const response = await apiClient.get(`/v1.4/image?selectFields=url&movieId=${id}&type=!cover&type=!shooting`)
    return response.data
  }catch(error){
    console.log(error)
  }
}

export const fetchUserReviewsData = async (page:number, limit:number,id:string) =>{
  try{
    const response = await apiClient.get(`/v1.4/review?page=${page}&limit=${limit}&movieId=${id}`)
    return response.data
  }catch(error){
    console.log(error)
  }
}



