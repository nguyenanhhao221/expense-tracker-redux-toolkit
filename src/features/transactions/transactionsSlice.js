import { createSlice } from "@reduxjs/toolkit";
export const CATEGORIES = ['housing', 'food', 'transportation', 'utilities', 'clothing', 'healthcare', 'personal', 'education', 'entertainment'];
const initialState = Object.fromEntries(CATEGORIES.map(category => [category, []]))

//options for later to be used with createSlice
const options = {
    name: 'transactions',
    initialState: initialState,
    reducers: {
        //payload is an object contain the transaction
        // {
        //     category: 'food',
        //     description: 'groceries on 1/12/2021',
        //     amount: 150,
        //     id: 456
        // }

        //We will push the payload object into appropriate category
        //use {} after => because we mutate the state already, without the {} the => will become implicit return and also return a different value which violate Redux return data rule
        addTransaction: (transactionsState, action) => {
            transactionsState[action.payload.category].push(action.payload);
        },

        //no need to use {} because filter doesn't mutate the state, so it is ok for us to implicit return a different value
        deleteTransaction: (transactionState, action) => transactionState[action.payload.category].filter(transaction => transaction.id !== action.payload.id)
    }
}
const transactionsSlice = createSlice(options);
export default transactionsSlice.reducer;
export const { addTransaction, deleteTransaction } = transactionsSlice.actions;
//selectors
export const selectTransactions = (state) => state.transactions;
export const selectFlattenedTransactions = (state) => Object.values(state.transactions).reduce((a, b) => [...a, ...b], []);
