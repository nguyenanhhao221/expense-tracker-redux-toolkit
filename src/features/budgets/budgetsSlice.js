import { createSlice } from "@reduxjs/toolkit";
export const CATEGORIES = ['housing', 'food', 'transportation', 'utilities', 'clothing', 'healthcare', 'personal', 'education', 'entertainment'];
const initialState = CATEGORIES.map(category => ({ category: category, amount: 0 }))
//options object to later be used with createSlice
const options = {
    name: 'budgets',
    initialState: initialState,
    reducers: {
        //editBudget will have the action payload is the budget that being update
        //editBudget will check if the payload is in the array of current budgets state or not, if yes, update the current category with new value, if not keep that current category value
        editBudget: (budgetsState, action) => budgetsState.map(budget => budget.category === action.payload.category ? action.payload : budget)
    }
}

const budgetsSlice = createSlice(options);

export const selectBudgets = (state) => state.budgets;
export default budgetsSlice.reducer;
export const { editBudget } = budgetsSlice.actions;
