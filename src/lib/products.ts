import db from "./db";

export const createProduct = async (name: string, description: string, price: number, itemCode: string, quantity: number, status: string, author: string) => {
    try {
        const product = await db.collection("products").create({
            name: name,
            description: description,
            price: price,
            itemCode: itemCode,
            quantity: quantity,
            status: status,
            author: author
        });
        return product;
    } catch (error) {
        throw error;
    }
}

export const updateProduct = async (id: string, name: string, description: string, price: number, itemCode: string, quantity: number, status: string, author: string) => {
    try {
        const product = await db.collection("products").update(id, {
            name: name,
            description: description,
            price: price,
            itemCode: itemCode,
            quantity: quantity,
            status: status,
            author: author
        });
        return product;
    } catch (error) {
        throw error;
    }
}

export const deleteProduct = async (id: string) => {
    try {
        const product = await db.collection("products").delete(id);
        return product;
    } catch (error) {
        throw error;
    }
}

export const fetchAllProducts = async () => {
    try {
        const products = await db.collection("products").getFullList();
        return products;
    } catch (error) {
        throw error;
    }
}