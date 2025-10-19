const API = import.meta.env.VITE_API_URL;

export async function fetchProducts() {
    const response = await fetch(`${API}/products`);
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return response.json();
}

export async function createProduct(product) {
    const response = await fetch(`${API}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error("Failed to create product");
    }
    return response.json();
}

export async function updateProduct(product) {
    const response = await fetch(`${API}/products/${product.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error("Failed to update product");
    }
    return response.json();
}

export async function deleteProduct(id) {
    const response = await fetch(`${API}/products/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete product");
    }
    return response.json();
}
