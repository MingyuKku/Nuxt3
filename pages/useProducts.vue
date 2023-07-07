<template>
    <div class="use-products-page">
        <h3>useFetch 사용</h3>
        <div v-if="signList">
            <div v-if="signListItem.length">진행중 : {{ signListItem.filter(item => !item.isEnd).length }}개</div>
            <div v-if="signListItem.length">종료 : {{ signListItem.filter(item => item.isEnd).length }}개</div>
            <ul>
                <li v-for="item in signListItem" :key="item.subSeqId" class="list">
                    <div class="coin">
                        <div class="coin-image"><img :src="item.crypto.imageURL" alt=""></div>
                        <h4>{{ item.crypto.digitalAssetsKrName }}</h4>
                        <h5>{{ item.crypto.digitalAssetsCode }}</h5>
                    </div>
                    <p :class="item.isEnd ? 'end': 'ing'">{{ item.isEnd ? '종료' : '진행중' }}</p>
                    <p>{{ item.endTime }}</p>
                    <p>{{ item.endEarningTime }}</p>
                </li>
            </ul>
            <button v-if="isLast === false" @click="onClickMore">더보기</button>
        </div>
        <p v-else>{{ error }}</p>
    </div>
</template>

<script lang="ts" setup>
import { getUseSignList, SignListClass, SignListItem, addLastSignOnList, addLastSignOffList } from '@/api/signList';

const signListItem = ref<SignListItem[]>([]);
const isLast = ref<boolean>(true);
const lastSubSeqId = ref<number | null>(null);
const lastSlideNo = ref<number | null>(null);

const { 
    data: signList, 
    error, 
    pending, 
    refresh
} = await getUseSignList<SignListClass>('dtw');
console.log('응답', signList)

if (signList) {
    signListItem.value = signList.signListItems;
    isLast.value = signList.last;
    const lastItem = signList.signListItems[signList.signListItems.length-1];
    lastSubSeqId.value = lastItem.subSeqId;
    lastSlideNo.value = lastItem.slideNo;
}


async function onClickMore() {
    let addSignList:SignListItem[] = [];

    if (lastSubSeqId.value && !lastSlideNo.value) { // 싸인온이 마지막일때
        const { data: signList } = await addLastSignOnList<SignListClass>('dtw', lastSubSeqId.value);
        if (signList) {
            isLast.value = signList.last;
            addSignList = signList.signListItems;
        }
    } 
    if (lastSubSeqId.value && lastSlideNo.value) { // 싸인오프가 마지막일때
        const { data: signList } = await addLastSignOffList<SignListClass>('dtw', lastSubSeqId.value, lastSlideNo.value);
        console.log('오잉', signList)
        if (signList) {
            isLast.value = signList.last;
            addSignList = signList.signListItems;
        }
    }

    const lastItem = addSignList[addSignList.length-1];
    lastSubSeqId.value = lastItem.subSeqId;
    lastSlideNo.value = lastItem.slideNo;
    signListItem.value = signListItem.value.concat(addSignList);
}

onMounted(() => {
    console.log('패이로드', useNuxtApp().payload.data)
})

</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.coin {
    display: flex;
    align-items: center;
}
.coin-image {
    width: 20px;
    img {
        display: block;
        width: 100%;
    }
}
.list {
    /* list-style: none; */
    padding: 12px;
    p {
        &.end {
            color: red;
        }
        &.ing {
            color: green;
        }
    }
}
</style>