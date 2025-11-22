import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BookingState {
    movieTitle: string;
    selectedSeats: string[]; 
}

const initialState: BookingState = {
    movieTitle: "",
    selectedSeats: []
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setMovieTitle: (state, action: PayloadAction<string>) => {
            state.movieTitle = action.payload;
        },
        setSelectedSeats: (state, action: PayloadAction<string[]>) => {
            state.selectedSeats = action.payload;
        },
        clearBooking: () => initialState,
    },
});

export const { setMovieTitle, setSelectedSeats, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;