import { BasicRes, UseFetchRes } from "./common";

export const getUseSignList = async <T>(mentorId: string):Promise<UseFetchRes<T>> => {

    const { $useFetchApi } = useNuxtApp();

    const {
        data, 
        error, 
        pending, 
        refresh
    // } = await $useFetchApi<UseFetchRes<T>>(`ai/v2/model/${mentorId}/sign/list`, {
    } = await $useFetchApi(`ai/v2/model/${mentorId}/sign/list`, {
        method: 'POST',
        credentials: 'include',
    });

    const signList = data.value.data.signList as SignListRes;
    const instanceSignList = signList ? new SignListClass(signList.signs, signList.first, signList.last, signList.size, signList.ticket) as T : null;

    return {
        data: instanceSignList,
        error,
        pending,
        refresh,
    }
}

export const addLastSignOnList = async <T>(mentorId: string, ssi:number):Promise<UseFetchRes<T>> => {
    const { $useFetchApi } = useNuxtApp();

    const { data, error, pending, refresh } =  await $useFetchApi(`ai/v2/model/${mentorId}/sign/list?ssi=${ssi}`, {
        method: 'POST',
        credentials: 'include',
    })

    const signList = data.value.data.signList;
    const instanceSignList = signList ? new SignListClass(signList.signs, signList.first, signList.last, signList.size, signList.ticket) as T : null;

    return {
        data: instanceSignList,
        error,
        pending,
        refresh,
    }
}

export const addLastSignOffList = async <T>(mentorId: string, ssi:number, sn:number):Promise<UseFetchRes<T>> => {
    const { $useFetchApi } = useNuxtApp();

    const { data, error, pending, refresh } =  await $useFetchApi(`ai/v2/model/${mentorId}/sign/list?ssi=${ssi}&sn=${sn}`, {
        method: 'POST',
        credentials: 'include'
    })

    const signList = data.value.data.signList;
    const instanceSignList = signList ? new SignListClass(signList.signs, signList.first, signList.last, signList.size, signList.ticket) as T : null;

    return {
        data: instanceSignList,
        error,
        pending,
        refresh,
    }
}


export interface Crypto {
    cryptoFullCode: string;
    cryptoId: number;
    digitalAssetsCode: string;
    digitalAssetsId: number;
    digitalAssetsKrName: string;
    imageURL: string;
  }

export interface SignListRes {
    first: boolean;
    last: boolean;
    size: number;
    signs: SignListItemRes[] | null;
    ticket: boolean;
}

export interface SignListItemRes {
    bookmarkFlag: boolean;
    earningRate?:number;
    endEarningTime: null | string;
    endTime: string;
    evaluateState: string;
    evaluateState2?: string;
    isEnd: boolean;
    isPay: boolean;
    crypto: Crypto;
    signId: string;
    slideNo: null | number;
    subSeqId: number;
    targetRate: number;
    targetRate2?: number;
    targetRate3?: number;
    validateMin: number;
}

export class SignListItem {
    bookmarkFlag: boolean;
    earningRate?:number;
    endEarningTime: null | string;
    endTime: string;
    isEnd: boolean;
    isPay: boolean;
    isPurchase: boolean;
    crypto: Crypto;
    signId: string;
    slideNo: null | number;
    subSeqId: number;
    targetRate: number;
    targetRate2?: number;
    targetRate3?: number;
    validateMin: number;
    isMultiTarget: boolean;

    constructor(res: SignListItemRes, ticket: boolean) {
        this.bookmarkFlag = res.bookmarkFlag;
        if (res.earningRate !== undefined) this.earningRate = parseFloat(res.earningRate.toFixed(2)) || 0;
        this.endEarningTime = res.endEarningTime;
        this.endTime = res.endTime;
        this.isEnd = res.isEnd;
        this.isPay = res.isPay;
        this.isPurchase = true;

        if (!ticket) {
            if (res.isPay) this.isPurchase = false;
        }
        
        this.crypto = res.crypto;
        this.signId = res.signId;
        this.slideNo = res.slideNo;
        this.subSeqId = res.subSeqId;
        this.targetRate = res.targetRate;
        if (res.targetRate2 !== undefined) this.targetRate2 = res.targetRate2;
        if (res.targetRate3 !== undefined) this.targetRate3 = res.targetRate3;
        this.validateMin = res.validateMin;
        this.isMultiTarget = res.targetRate3 === undefined ? false : true;
    }
}

export class SignListClass {
    signListItems: SignListItem[];
    first: boolean;
    last: boolean;
    // number: number;
    size: number;
    ticket: boolean;

    constructor(res: SignListItemRes[] | null, first: boolean, last: boolean, size: number, ticket: boolean) {
        this.signListItems = res ? res.map(res => new SignListItem(res, ticket)) : [];
        this.first = first;
        this.last = res ? last : true;
        // this.number = number;
        this.size = size;
        this.ticket = ticket;
    }
}