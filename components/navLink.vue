<template>
    <div class="nav-link">
        <NuxtLink to="/">인덱스</NuxtLink>
        <NuxtLink to="/products">프로덕트</NuxtLink>
        <NuxtLink to="/useProducts">유즈 프로덕트</NuxtLink>
        <NuxtLink to="/asyncProducts">어씽크 프로덕트</NuxtLink>
        <NuxtLink to="/useAsyncData">어씽크데이터 싸인리스트</NuxtLink>
    </div>
</template>

<style lang="scss">
.nav-link {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}
</style>