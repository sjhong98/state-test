import { create } from 'zustand'
import { blockType } from '.';

interface SortedBlockStoreType {
    sortedBlock: number[];
    setSortedBlock: (payload:number[]) => void;
}

interface BlockChangeStoreType {
    blockChange: boolean;
    setBlockChange: (payload:boolean) => void;
}

interface BlockStoreType {
    blocks: blockType[];
    setBlocks: (payload:blockType[]) => void;
}

interface IsMovingType {
    isMoving: boolean;
    setIsMoving: (payload:boolean) => void;
}

interface CurBlockType {
    curBlock: string;
    setCurBlock: (payload:string) => void;
}

interface rotateCountType {
    rotateCount: number;
    setRotateCount: (payload:number) => void;
}

export const sortedBlockStore = create<SortedBlockStoreType>((set) => ({
    sortedBlock: [],
    setSortedBlock: (payload:number[]) => set((state) => ({sortedBlock: payload}))
    // 이렇게 해도 됨
    // setSortedBlock: (payload:number[]) => set({sortedBlock: payload})
}))

export const blockChangeStore = create<BlockChangeStoreType>((set) => ({
    blockChange: false,
    setBlockChange: (payload:boolean) => set({blockChange: payload})
}))

export const blockStore = create<BlockStoreType>((set) => ({
    blocks: [],
    setBlocks: (payload:blockType[]) => set({blocks: payload})
}))

export const isMovingStore = create<IsMovingType>((set) => ({
    isMoving: false,
    setIsMoving: (payload:boolean) => set({isMoving: payload})
}))

export const curBlockStore = create<CurBlockType>((set) => ({
    curBlock: "",
    setCurBlock: (payload:string) => set({curBlock: payload})
}))

export const rotateCountStore = create<rotateCountType>((set) => ({
    rotateCount: 0,
    setRotateCount: (payload:number) => set({rotateCount: payload})
}))