"use client";

import { createContext, useEffect, useMemo, useState } from "react";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showEventList, setShowEventList] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState("")
    const [selectedType, setSelectedType] = useState("")
    const [selectedDate, setSelectedDate] = useState("")

    const [searchItem, setSearchItem] = useState("");
    const [appliedFilter, setAppliedFilter] = useState({
        searchItem: "", 
        selectedLocation:'',
        selectedDate: null,
        selectedType:''
    });

    const filteredEvents = useMemo(() => {
        const today = new Date()
        return events.filter((event) => {
            const eventDate = new Date(event.date)
            if(eventDate < today) return false
            const matchedSearch = appliedFilter.searchItem
                ? event.title.toLowerCase().includes(appliedFilter.searchItem.toLowerCase())
                : true;

            const matchedType = appliedFilter.selectedType ? event.type.toLowerCase()=== appliedFilter.selectedType.toLowerCase() : true
            const matchesDate = appliedFilter.selectedDate ? eventDate.toDateString() === new Date(appliedFilter.selectedDate).toDateString() : true
            const matchLocation = appliedFilter.selectedLocation ? event.location.toLowerCase() === appliedFilter.selectedLocation.toLowerCase() : true
            return matchedSearch && matchLocation && matchesDate && matchedType;
        });
    }, [events, appliedFilter]);
console.log(filteredEvents )
    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                const res = await fetch("http://localhost:4000/events");
                if (!res.ok) throw new Error("Failed to fetch events");
                const data = await res.json();
                setEvents(data);
                // stop loader
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                // stop loader
                setIsLoading(false);
            }
        };
        fetchEvents();
    }, []); // Adding an empty dependency array ensures this runs once when the component mounts.

    const handleSubmit = async () => {
        setShowEventList(true)
        setIsLoading(true)
        setAppliedFilter({ searchItem, selectedLocation,selectedDate,selectedType });
       setTimeout(()=>{
         setIsLoading(false)
       },3000)
    };

    const handleClear = async () => {
        setSearchItem("")
        setShowEventList(false)
        setSelectedLocation("")
        setSelectedDate(null)
        setSelectedType("")
    };
    const formattedDate = (dateString) => {
        const date = new Date(dateString)
        const options = { weekday: "short", month: "short", day: "numeric" }
        return date.toLocaleDateString('en-US', options)  // Correct the locale to 'en-US'
      }
      

    return (
        <EventContext.Provider
            value={{
                events,
                searchItem,
                setSearchItem,
                filteredEvents,
                isLoading,
                error,
                handleClear,
                handleSubmit,
                showEventList,
                setSelectedLocation,
                selectedLocation, 
                selectedDate,
                setSelectedDate,
                selectedType,
                setSelectedType,
                formattedDate,
            }}
        >
            {children}
        </EventContext.Provider>
    );
};

export default EventProvider;
