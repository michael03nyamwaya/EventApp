"use client";

import { useContext, useState, createContext, useEffect } from "react";

export const TicketContext = createContext();

const TicketProvider = ({ children }) => {
    const [event, setEvent] = useState(null);
    const [seat, setSeat] = useState({ seat: null, price: null });
    const [showMenu, setShowMenu] = useState(false);
    const [itemAmount, setItemAmount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [checkoutData, setCheckoutData] = useState(null);

    const initializeEvent = (fetchedEvent) => {
        setEvent(fetchedEvent);
        setItemAmount(1);

        // Set default seat if it exists (assuming 'fontseat' is the default)
        const fontseat = fetchedEvent?.seats.find((seat) => seat.seat === "fontseat");
        if (fontseat) {
            setSeat({ seat: fontseat.seat, price: fontseat.price });
        }
    };

    useEffect(() => {
        setTotalPrice(seat.price * itemAmount);
    }, [seat.price, itemAmount]);

    const handleSeat = (seat, price) => {
        setSeat({ seat, price });
        setShowMenu(false); // Close menu after seat is selected
    };

    const buyNow = () => {
        const ticketData = {
            eventId: event.id,
            eventName: event.title,
            ticketType: seat.seat,
            ticketPrice: seat.price,
            amount: itemAmount,
            totalPrice,
        };
        setCheckoutData(ticketData);
    };

    // Corrected increaseAmount function
    const increaseAmount = () => {
        setItemAmount((prevAmount) => prevAmount + 1); // Simply increments by 1
    };

    // Corrected decreaseAmount function
    const decreaseAmount = () => {
        setItemAmount((prevAmount) => Math.max(prevAmount - 1, 1)); // Ensures it doesn't go below 1
    };

    return (
        <TicketContext.Provider
            value={{
                event,
                seat,
                showMenu,
                itemAmount,
                totalPrice,
                handleSeat,
                setSeat,
                setShowMenu,
                buyNow,
                initializeEvent,
                checkoutData,
                increaseAmount,
                decreaseAmount,
            }}
        >
            {children}
        </TicketContext.Provider>
    );
};

export default TicketProvider;
