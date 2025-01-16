import React, { useContext } from 'react';
import SearchItem from './SearchItem';
import { EventContext } from '@/app/contexts/EventContext'; // Import the correct context
import EventLocation from '../events/EventLocation';
import EventDate from '../events/EventDate';
import EventType from '../events/EventType';
import { BiRightArrowAlt } from 'react-icons/bi';

const SearchBar = () => {
    const { handleSubmit } = useContext(EventContext); // Use EventContext, not EventProvider
    
    return (
        <div className="bg-white/5 w-[90vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-max rounded-3xl xl:rounded-full text-sm p-8 lg:pl-8 lg:pr-2 mx-auto h-auto xl:h-[70px] backdrop-blur-[20px] flex flex-col gap-6 items-center md:flex-row">
            <SearchItem />
            <div className='border h-[20px] border-white/10 hidden xl:flex'></div>
            <EventLocation />
            <div className='border h-[20px] border-white/10 hidden xl:flex'></div>
            <EventDate />
            <div className='border h-[20px] border-white/10 hidden xl:flex'></div>
            <EventType />
            <button onClick={handleSubmit} className="w-full xl:w-[54px] h-[54px] rounded-[40px] xl:rounded-full bg-accent hover:bg-accent-hover transition-all flex items-center justify-center">
            <BiRightArrowAlt  className='text-3xl'/>    
            </button> {/* Use onClick instead of onSubmit */}
        </div>
    );
};

export default SearchBar;
