import React, { useContext } from 'react'
import { Input } from '../ui/input'
import { EventContext } from '@/app/contexts/EventContext'
import {BiSearch} from "react-icons/bi"

const SearchItem = () => {
    const { searchItem, setSearchItem } = useContext(EventContext); 
   
  return (
    <div className='flex items-center gap-[10px] w-full xl:w-[190px]'>
        <div className='text-lg text-accent' >
            <BiSearch />
        </div>
      <Input
       value={searchItem} 
       type="text"
        placeholder="Event name or artist"
        onChange={((e)=>setSearchItem(e.target.value))}
        className="w-full p-0 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
    </div>

  )
}

export default SearchItem
