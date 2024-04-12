import { MovieTable } from "./MovieTable"
import { useState } from "react";
import { Select } from 'antd';
export const Filters:React.FC = () => {
    const [year, setYear] = useState<string>('');
    const [yearToPass, setYearToPass] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [countryToPass, setCountryToPass] = useState<string>('');
    const [rating, setRating] = useState<string[]>([]);
    const [ratingToPass, setRatingToPass] = useState<string[]>([]);

    const handleFilter = () =>{
        setYearToPass(year)
        setCountryToPass(country)
        setRatingToPass(rating)
    }

    const handleYearFilter =  (e:React.ChangeEvent<HTMLInputElement>) => {
        const onlyNums:string = e.target.value.replace(/[^0-9]/g, '');
        setYear(onlyNums);
    }

    const formatCountryName = (countryName: string): string => {
        const words = countryName.split(' ');
    
        const formattedWords = words.map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        });
        return formattedWords.join(' ');
    };

    const handleCountryFilter =  (e:React.ChangeEvent<HTMLInputElement>) => {
        const onlyCyrillicLetters = e.target.value.replace(/[^а-яА-ЯёЁ ]/g, '');
        const formattedCountry = formatCountryName(onlyCyrillicLetters);
        setCountry(formattedCountry);
    }


    return(
        <div className="flex flex-col items-center justify-center w-full">
            <div className="headerWrapper my-[10px]">
                <h2 className="font-black text-[1.2rem] text-white text-center">Фильтрация</h2>
            </div>
            <div className="filterWrapper flex gap-[10px]  max-sm:flex-col items-center justify-center ">
                <input type="text" onChange={handleYearFilter} value={year} placeholder="Год" className="pt-[10px] px-[20px] h-[30px] w-[10vh] max-sm:w-[200px]  text-center placeholder:text-[0.8rem] rounded-[40px] border-[1px] border-[#1e445c]"/>
                <input type="text" onChange={handleCountryFilter} value={country} placeholder="Страна" className="pt-[10px] px-[20px] h-[30px] w-[45vh] max-sm:w-[200px] text-center placeholder:text-[0.8rem] rounded-[40px] border-[1px] border-[#1e445c]"/>
                <div className="w-full flex items-center justify-center">
                    <Select
                        mode="multiple"
                        placeholder="Возрастной рейтинг"
                        onChange={setRating}
                        value={rating}
                        className="w-full max-sm:w-[200px] text-center rounded-[40px] "
                    >
                        <Select.Option value="0">0+</Select.Option>
                        <Select.Option value="6">6+</Select.Option>
                        <Select.Option value="12">12+</Select.Option>
                        <Select.Option value="18">18+</Select.Option>
                    </Select>
                </div>
                <div className="buttonWrapper   ">
                    <button type="submit" onClick={handleFilter} className="px-[10px] py-[3px] text-[0.8rem] rounded-[40px] border-[1px] border-[#1e445c] bg-white text-[#336d91]">Отфильтровать</button>
                </div>
            </div>
            <MovieTable year={yearToPass} country={countryToPass} ageRating={ratingToPass}/>
        </div>
    )
}