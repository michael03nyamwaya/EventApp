import { EventContext } from '@/app/contexts/EventContext'
import Image from 'next/image'
import { useContext } from 'react'
import { BiCalendar, BiTime, BiMap } from 'react-icons/bi'

const Event = ({event}) => {
  const {formattedDate}= useContext(EventContext)
   const dbDate = event.date
   const formatDate=formattedDate(dbDate)
  return (
    <div className='bg-white/5 hover:bg-white/10 transition-all h-[440px] w-[320px] rounded-3xl sm:w-full p-4 mx-auto sm:mx-0 flex flex-col justify-start'>
      <div className='relative h-[320px] w-full mb-10'>
        <Image src={event.img_sm} fill alt='' quality={100} className='object-cover rounded-xl' />
        <div className='absolute bg-accent -bottom-[24px] left-4 h-[48px] w-[110px] text-[13px] uppercase font-medium rounded-full flex items-center justify-center'>{event.type}</div>
      </div>
      <div>
        <div className='flex flex-col justify-between h-[50%] mb-6'>
          <div className="flex items-center gap-4 text-accent mb-3">
          <div className='flex items-center gap-2'>
            <BiCalendar/> <div className='text-[15px]'>{formatDate}</div>
          </div>
          <div className='flex items-center gap-2'>
            <BiTime/> <div className='text-[15px]'>{event.hour}</div>
          </div>
          </div>
          <h1 className='h4'>{event.title}</h1>
      </div>
      <div className='flex items-center gap-3'>
        <BiMap  className='text-xl text-accent' />
        <p className='text-white/70 text-sm font-light'>{event.location}</p>
      </div>
      </div>
    </div>
  )
}

export default Event
