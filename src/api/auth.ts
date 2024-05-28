import { RegisterFormData } from "../models/RegisterFormData ";

export const registerUser = async (data: RegisterFormData) => {
    try {
        const response = await fetch('http://localhost:4000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        
        if (responseData.message) {
            const matchPhone = responseData.message.match(/phone: "([^"]+)"/);
            const matchEmail = responseData.message.match(/email: "([^"]+)"/);
            
            if (matchPhone) {
                const duplicatedPhone = matchPhone[1];
                responseData.message = `El número de teléfono ${duplicatedPhone} ya se encuentra registrado`;
            } else if (matchEmail) {
                const duplicatedEmail = matchEmail[1];
                responseData.message = `El email ${duplicatedEmail} ya se encuentra registrado`;
            }
        }

        return responseData;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
