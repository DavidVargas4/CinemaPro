import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BookingState {
    movieTitle: string;
    selectedSeats: string[];
    showtime: string;
    experience: 'Standard' | 'VIP';
    ticketPrice: number;
    hall: string;
}

const initialState: BookingState = {
    movieTitle: "",
    selectedSeats: [],
    showtime: "",
    experience: 'Standard',
    ticketPrice: 0,
    hall: ""
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setBookingDetails: (state, action: PayloadAction<BookingState>) => {
            state.movieTitle = action.payload.movieTitle;
            state.selectedSeats = action.payload.selectedSeats;
            state.showtime = action.payload.showtime;
            state.experience = action.payload.experience;
            state.ticketPrice = action.payload.ticketPrice;
            state.hall = action.payload.hall;
        },
        clearBooking: () => {
            return initialState;
        },
        
        setMovieTitle: (state, action: PayloadAction<string>) => { 
            state.movieTitle = action.payload; 
        },
        setSelectedSeats: (state, action: PayloadAction<string[]>) => { 
            state.selectedSeats = action.payload; 
        }
    },
});

export const { setBookingDetails, setMovieTitle, setSelectedSeats, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;