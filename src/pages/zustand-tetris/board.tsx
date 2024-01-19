// 10 x 20

import { useEffect, useState } from "react";
import { blockType } from ".";
import { IBlock, ZBlock, SBlock, JBlock, LBlock, OBlock, TBlock } from "./blocks";
import React from 'react';
import { blockChangeStore, blockStore, curBlockStore, isMovingStore, nextBlocksStore, rotateCountStore, sortedBlockStore } from "./store";
import { BlockMove } from "./blockMove";
import _ from 'lodash';

export default function Board() {
    const nextBlocks = nextBlocksStore((state) => state.nextBlock);
    const setNextBlocks = nextBlocksStore((state) => state.setNextBlock);
    const [randomArr, setRandomArr] = useState<number[]>([]);
    const setSortedBlock = sortedBlockStore((state) => state.setSortedBlock);
    const blocks:blockType[] = blockStore((state) => state.blocks);
    const setBlocks = blockStore((state) => state.setBlocks);
    const blockChange:boolean = blockChangeStore((state) => state.blockChange);
    const setBlockChange = blockChangeStore((state) => state.setBlockChange);
    const setCurBlock = curBlockStore((state) => state.setCurBlock);
    const setRotateCount = rotateCountStore((state) => state.setRotateCount);

    const blockStyle = "bg-gray-800 rounded-sm center w-[2.2vw] h-[2.2vw]";
    const blockFilledStyle = "bg-white rounded-sm center w-[2.2vw] h-[2.2vw]";
    const blockGuide = "bg-gray-700 rounded-sm center w-[2.2vw] h-[2.2vw]";
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
            let tempNextBlocks = _.cloneDeep(nextBlocks);
            let next:number[] | undefined = [];
            let nextIndex:number | undefined = 0;
            let tempRandom = [...randomArr];

            // 최초에 nextBlocks가 비었을 경우, 배열 채워넣기
            if(tempNextBlocks.length === 0) {
                for(let i=0; i<3; i++) {
                    let randomNum = Math.floor(Math.random() * randomBlockSelection.length);
                    if(i === 0) {
                        nextIndex = randomNum;
                    } else {
                        tempRandom.push(randomNum);
                    }
                    tempNextBlocks.push(randomBlockSelection[randomNum]);
                }
                next = tempNextBlocks.shift();
            } else {
                let randomNum = Math.floor(Math.random() * randomBlockSelection.length);
                tempNextBlocks.push(randomBlockSelection[randomNum]);
                tempRandom.push(randomNum);
                nextIndex = tempRandom.shift();
                next = tempNextBlocks.shift();
            }
            setNextBlocks(tempNextBlocks);  
            setRandomArr(tempRandom);

            for(let i=0; i<200; i++) {
                temp[i].guide = false;
            }

            switch(nextIndex) {
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
            
            if(next !== undefined) {
                setSortedBlock(next);
    
                if(next !== undefined) {
                    temp[next[0]].active = true;
                    temp[next[1]].active = true;
                    temp[next[2]].active = true;
                    temp[next[3]].active = true;
                }
    
                for(let j=0; j<4; j++) {
                    let rest = next[j] % 10;
                    for(let i=0; i<20; i++) {
                        temp[i*10 + rest].guide = true;
                    }
                }
    
                setBlocks(temp);
                setBlockChange(false);
                setRotateCount(0); 
            }
        }
    }, [blockChange])

    return (
        <div className="grid grid-cols-10 grid-rows-20 gap-x-1 gap-y-1 w-auto h-auto" >
            { blocks.map((item:blockType, index:number) => {
                return (
                    <div key={index} className={item.active ? blockFilledStyle : item.guide ? blockGuide : blockStyle}>
                    </div>
                )
            })}   
            <BlockMove />
        </div>
 
 )
}