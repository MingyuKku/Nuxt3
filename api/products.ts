import { UseFetchRes } from "./common";

export const getProducts = async ():Promise<ProductsClass | undefined> => {

    try {
        const { $fetchApi } = useNuxtApp();

        const data = await $fetchApi<ProductRes>(`products`);
        // console.log('겟 프로덕', data)

        return new ProductsClass(data);

    } catch (err) {
        return undefined;
    }
}



interface ProductRes {
    limit: number;
    products: Product[];
    skip: number;
    total: number;
}

interface Product {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    title: string;
}

export class ProductClass {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    thumbnail: string;
    title: string;

    constructor(res: Product) {
        this.brand = res.brand;
        this.category = res.category;
        this.description = res.description;
        this.discountPercentage = res.discountPercentage;
        this.id = res.id;
        this.images = res.images;
        this.thumbnail = res.thumbnail;
        this.title = res.title;
    }
}

export class ProductsClass {
    products: ProductClass[];
    constructor(res: ProductRes) {
        this.products = res.products.map(item => new ProductClass(item));
    }
}