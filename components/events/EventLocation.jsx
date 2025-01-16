import { EventContext } from '@/app/contexts/EventContext'
import React, { useContext } from 'react'
import {Select, SelectContent,SelectGroup,SelectItem, SelectLabel,SelectTrigger,SelectValue} from '@/components/ui/select'
import {BiMap} from "react-icons/bi"
const EventLocation = () => {
    const {events, selectedLocation, setSelectedLocation} = useContext(EventContext);
    
    const uniqueLocation = [
        "All Locations",
        ...new Set(events.filter((event)=>{
            const eventDate = new Date(event.date)
            const currentDate = new Date()

            if(eventDate > currentDate) return true

            if(currentDate.toDateString() === eventDate.toDateString()){
                const eventTime = eventDate.getTime()
                const currentTime = currentDate.getTime()
                return eventTime > currentTime
            }
            return false
        }).map((event)=>event.location)
    )
    ]

  return (
    <div className='flex items-center gap-[10px] w-full xl:w-[190px] select-none'>
        <div className='text-xl text-accent'>
            <BiMap />
        </div>
      <Select value={selectedLocation} onValueChange={(value)=>setSelectedLocation(value)}>
        <SelectTrigger className='bg-transparent border border-none focus:ring-0 focus:ring-offset-0 text-left p-0'>
            <SelectValue placeholder="Events Location"/>
        </SelectTrigger >
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Locations</SelectLabel>
                {uniqueLocation.map((location, index)=>{
                    return <SelectItem value={location ==="All location" ? null : location} key={index}>{location}</SelectItem>
                })}
            </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default EventLocation
