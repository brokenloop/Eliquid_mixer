import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastService = {
    login,
    saveRecipe,
    createAccount,
};

// const login = () => toast("Logged in successfully");
const login = () => console.log('logged in');
const saveRecipe = () => toast("Logged in successfully");
const createAccount = () => toast("Logged in successfully");
