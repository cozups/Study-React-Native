import axios from 'axios';

export const storeExpense = (expenseData) => {
  axios.post(
    'https://react-native-course-915ec-default-rtdb.firebaseio.com/expenses.json',
    expenseData
  );
};
