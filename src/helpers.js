import { api_url } from "./configs/crud";

export function capitalizeFirstLetters(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

export const addCalories = async (totalCalories, userId, name) => {
    try {
        const response = await fetch(`${api_url}/calories`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ totalCalories, userId, name}),
        });
        console.log(response)
    } catch (error) {
        console.error("Error:", error);

    }
}


export const CreateUserOnDB = async (userId, name) => {
    try {
        const response = await fetch(`${api_url}/calories`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ totalCalories: 0, userId, name }),
        });
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.error("Error:", error);
        setResponse("An error occurred while processing your request.");
    }
}