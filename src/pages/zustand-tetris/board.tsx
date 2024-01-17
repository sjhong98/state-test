// 10 x 20

import { useEffect, useState } from "react";
import { blockType } from ".";
import { IBlock, ZBlock, SBlock, JBlock, LBlock, OBlock, TBlock } from "./blocks";
import React from 'react';
import { blockChangeStore, blockStore, isMovingStore, sortedBlockStore } from "./store";
import { BlockMove } from "./blockMove";

export default function Board() {
    // zustand state 처리할것
    const [stack, setStack] = useState<number[]>([]);
    const setSortedBlock = sortedBlockStore((state) => state.setSortedBlock);
    const blocks:blockType[] = blockStore((state) => state.blocks);
    const setBlocks = blockStore((state) => state.setBlocks);
    const blockChange:boolean = blockChangeStore((state) => state.blockChange);
    const setBlockChange = blockChangeStore((state) => state.setBlockChange);
    const isMoving:boolean = isMovingStore((state) => state.isMoving);

    const blockStyle = "bg-gray-800 rounded-sm center";
    const blockFilledStyle = "bg-white rounded-sm center"

    const randomBlockSelection = [IBlock, ZBlock, SBlock, LBlock, JBlock, OBlock, TBlock];

    // 최초 블록 생성 및 초기화
    useEffect(() => {
        let count = 0;
        let temp:blockType[] = [];

        for(let i=0; i<200; i++) {
            const newElem:blockType = {
                x:0,
                y:0,
                active: false
            }
            temp.push(newElem);
        }

        for(let row=0; row<20; row++) {
            for(let col=0; col<10; col++) {
                temp[count].x = col;
                temp[count].y = row;
                count++;
            }
        }

        setBlocks(temp);
    }, [])

    // 랜덤 블록 생성
    useEffect(() => {
        if(blockChange) {
            let tempBlock:blockType[] = [...blocks];
            let tempStack = [...stack];
            let tempSorted:number[] = randomBlockSelection[Math.floor(Math.random() * randomBlockSelection.length)];
            // let tempSorted:number[] = LBlock;
            tempSorted.sort((a, b) => b-a);
            setSortedBlock(tempSorted);

            tempBlock[tempSorted[0]].active = true;
            tempBlock[tempSorted[1]].active = true;
            tempBlock[tempSorted[2]].active = true;
            tempBlock[tempSorted[3]].active = true;

            setBlocks(tempBlock);
            setStack(tempStack);
            setBlockChange(false);
        }
    }, [blockChange])

    const point = "text-[0.8rem] text-gray-700";

    return (
        <div className="grid grid-cols-10 grid-rows-20 gap-x-1 gap-y-1 w-[25vw] h-[80vh]" >
            { blocks.map((item:blockType, index:number) => {
                return (
                    <div key={index} className={item.active ? blockFilledStyle : blockStyle} >
                        <p className={point}>{index}</p>
                    </div>
                )
            })}   
            <BlockMove />
        </div>
    )
}