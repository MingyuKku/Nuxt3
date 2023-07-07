<template>
    <div class="products-page">
        <ul v-if="products && products.length">
            <li v-for="product in products" :key="product.id">
                <div class="thumbnail"><img :src="product.thumbnail" alt=""></div>
                <h2>{{ product.title }}</h2>
                <h3>{{ product.brand }}</h3>
                <h4>{{ product.category }}</h4>
                <p>{{ product.description }}</p>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { getProducts, ProductsClass, ProductClass } from '@/api/products'

const products = ref<ProductClass[] | null>(null);
const res:ProductsClass | undefined = await getProducts();
if (res !== undefined) {
    products.value = res.products;
    console.log('응답', res.products)
}


</script>


<style lang="scss">
.thumbnail {
    width: 150px;
    img {
        display: block;
        width: 100%;
    }
}
</style>