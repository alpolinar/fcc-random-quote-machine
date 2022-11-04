import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const SOURCE_URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
];

const initialState = {
    quote: '',
    author: '',
    status: 'idle',
    error: null,
    color: '',
}

export const fetchQuotes = createAsyncThunk('GET_QUOTES', async () => {
    try {
        const response = await axios.get(SOURCE_URL)
        return [...response.data.quotes];
    } catch (err) {
        return err.message;
    }
})

export const quoteSlice = createSlice({
    name: 'quotes',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchQuotes.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchQuotes.fulfilled, (state, action) => {
                state.status = 'succeeded'
                let randInt = Math.floor(Math.random() * action.payload.length);
                state.quote = action.payload[randInt].quote;
                state.author = action.payload[randInt].author;
                state.color = colors[Math.floor(Math.random() * colors.length)];

            }).addCase(fetchQuotes.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})


export const { GET_RANDOM_QUOTE } = quoteSlice.actions


export const selectQuote = (state) => state.quotes.quote
export const selectAuthor = (state) => state.quotes.author
export const selectStatus = (state) => state.quotes.status
export const selectError = (state) => state.quotes.error
export const selectColor = (state) => state.quotes.color

export default quoteSlice.reducer