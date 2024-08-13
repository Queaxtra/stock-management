import db from "./db";

export const loginUser = async (email: string, password: string) => {
    try {
        const user = await db.collection("users").authWithPassword(email, password);
        return user;
    } catch (error) {
        throw error;
    }
}

export const createUser = async (username: string, email: string, emailVisibility: boolean, password: string, passwordConfirm: string) => {
    try {
        if (password !== passwordConfirm) {
            throw new Error("Passwords do not match");
        }
        const user = await db.collection("users").create({
            username: username,
            email: email,
            emailVisibility: emailVisibility,
            password: password,
            passwordConfirm: passwordConfirm
        });
        return user;
    } catch (error) {
        throw error;
    }
}

export const isUserLoggedIn = async () => {
    try {
        const user = await db.authStore?.isValid;
        return user;
    } catch (error) {
        throw error;
    }
}

export const deleteUser = async (id: string) => {
    try {
        const user = await db.collection("users").delete(id);
        return user;
    } catch (error) {
        throw error;
    }
}

export const logoutUser = async () => {
    try {
        const user = await db.authStore?.clear();
        return user;
    } catch (error) {
        throw error;
    }
}