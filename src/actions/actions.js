import axios from 'axios';

export const API_URL = process.env.API_URL;

export function setCurrentUser(user) {

    return {
        type: SET_CURRENT_USER,
        user
    };
}
