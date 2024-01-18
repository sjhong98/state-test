// 10 x 20

import { useEffect, useState } from "react";
import { blockType } from ".";
import { IBlock, ZBlock, SBlock, JBlock, LBlock, OBlock, TBlock } from "./blocks";
import React from 'react';
import { blockChangeStore, blockStore, curBlockStore, isMovingStore, rotateCountStore, sortedBlockStore } from "./store";
import { BlockMove } from "./blockMove";
import _ from 'lodash';

export default function Board() {
    const [stack, setStack] = useState<number[]>([]);
    const setSortedBlock = sortedBlockStore((state) => state.setSortedBlock);
    const blocks:blockType[] = blockStore((state) => state.blocks);
    const setBlocks = blockStore((state) => state.setBlocks);
    const blockChange:boolean = blockChangeStore((state) => state.blockChange);
    const setBlockChange = blockChangeStore((state) => state.setBlockChange);
    const setCurBlock = curBlockStore((state) => state.setCurBlock);
    const setRotateCount = rotateCountStore((state) => state.setRotateCount);

    const blockStyle = "bg-gray-800 rounded-sm center";
    const blockFilledStyle = "bg-white rounded-sm center";
    const blockGuide = "bg-gray-700 rounded-sm center";
    const insideBlock = "w-[82%] h-[82%] bg-gray-200 rounded-sm center";

    const randomBlockSelection = [IBlock, ZBlock, SBlock, LBlock, JBlock, OBlock, TBlock];

    // 최초 블록 생성 및 초기화
    useEffect(() => {
        let count = 0;
        let temp:blockType[] = [];

        for(let i=0; i<200; i++) {
            const newElem:blockType = {
                x:0,
                y:0,
                active: false,
                guide: false
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
        let temp = _.cloneDeep(blocks);

        if(blocks.length !== 0) {
            let count = 0;
            for(let i=0; i<20; i++) {
                for(let j=0; j<10; j++) {
                    if(blocks[10*i + j].active) {
                        count++;
                    }
                }
                if(count === 10) {
                    console.log("cleared", 10*i);
                    temp.splice(10*i, 10);
                    let add:blockType[] = [];
                    for(let k=0; k<10; k++) {
                        add.push({ active:false, x:0, y:0, guide:false });
                    }
                    temp = [...add, ...temp];
                }
                count = 0;
            }
        }

        if(blockChange) {
            let tempStack = [...stack];
            let randomNum:number = Math.floor(Math.random() * randomBlockSelection.length);
            let tempSorted:number[] = randomBlockSelection[randomNum];
            // let tempSorted:number[] = JBlock;
            // let randomNum = 4;
            // const randomBlockSelection = [IBlock, ZBlock, SBlock, LBlock, JBlock, OBlock, TBlock];

            for(let i=0; i<200; i++) {
                temp[i].guide = false;
            }

            switch(randomNum) {
                case 0 : 
                    setCurBlock("i");
                    break;
                case 1 :
                    setCurBlock('z');
                    break;
                case 2 :
                    setCurBlock('s');
                    break;
                case 3 :
                    setCurBlock('l');
                    break;
                case 4 :
                    setCurBlock('j');
                    break;
                case 5 :
                    setCurBlock('o');
                    break;
                case 6 :
                    setCurBlock('t');
                    break;
            }
            // let tempSorted:number[] = LBlock;
            tempSorted.sort((a, b) => b-a);
            setSortedBlock(tempSorted);

            temp[tempSorted[0]].active = true;
            temp[tempSorted[1]].active = true;
            temp[tempSorted[2]].active = true;
            temp[tempSorted[3]].active = true;

            for(let j=0; j<4; j++) {
                let rest = tempSorted[j] % 10;
                for(let i=0; i<20; i++) {
                    temp[i*10 + rest].guide = true;
                }
            }

            setBlocks(temp);
            setStack(tempStack);
            setBlockChange(false);
            setRotateCount(0);
        }
    }, [blockChange])

    return (
        <div className="grid grid-cols-10 grid-rows-20 gap-x-1 gap-y-1 w-[25vw] h-[80vh]" >
            { blocks.map((item:blockType, index:number) => {
                return (
                    <div key={index} className={item.active ? blockFilledStyle : item.guide ? blockGuide : blockStyle} >
                        <div className={item.active ? insideBlock : ""} />
                    </div>
                )
            })}   
            <BlockMove />
        </div>
 
 )
}