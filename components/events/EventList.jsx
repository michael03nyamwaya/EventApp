import { EventContext } from '@/app/contexts/EventContext'
import React, { useContext } from 'react'
import Event from './Event'
import SkeletonGrid from './SkeletonGrid'
import Link from 'next/link'

const EventList = () => {
    const { filteredEvents, isLoading, error } = useContext(EventContext)

    if (error) return <p>Error: {error}</p>
    
    if (filteredEvents.length === 0 && !isLoading) { // corrected "lenght" to "length"
        return <div className='h-[80vh]'>
            <p className='text-white/80 text-center'> No events available</p>
            </div>
    }

    if (isLoading) {
        return <div>
           <SkeletonGrid itemCount={20}/>
        </div>
    } else {
        return (
            <div>
                <h2 className='h-4 mb-6'>{filteredEvents.length} results found</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px] mb-32 mt-6'>
                {filteredEvents.map((event, index) => {
                    return (
                        <div key={index}>
                           <Link href={`/event/${event.id}`}>
                             <Event event={event}/>
                            </Link>
                        </div>
                    )
                })}
            </div>
            </div>
        )
    }
}

export default EventList
