// 10 x 20

import { useEffect, useState } from "react";
import { blockType } from ".";
import { IBlock, ZBlock, SBlock, JBlock, LBlock, OBlock, TBlock } from "./blocks";
import _ from 'lodash';

export default function Board() {
    // zustand state 처리할것
    const [blocks, setBlocks] = useState<blockType[]>([]);
    const [stack, setStack] = useState<number[]>([]);
    const [sortedBlock, setSortedBlock] = useState<number[]>([]);
    const [blockChange, setBlockChange] = useState<boolean>(false);

    const blockStyle = "bg-gray-800 rounded-sm center";
    const blockFilledStyle = "bg-white rounded-sm center"

    const randomBlockSelection = [IBlock, ZBlock, SBlock, LBlock, JBlock, OBlock, TBlock];

    const blockMove = () => {
        // 얕은 복사가 문제였음. spread 사용해도 얕은 복사되어 같은 주소 참조함.
        let temp = _.cloneDeep(blocks);
        if(sortedBlock[0]+10<200 && !temp[sortedBlock[0]+10].active) {
            temp[sortedBlock[0]].active = false;
            temp[sortedBlock[0]+10].active = true;
            if(sortedBlock[1]+10<200 && !temp[sortedBlock[1]+10].active) {
                temp[sortedBlock[1]].active = false;
                temp[sortedBlock[1]+10].active = true;
                if(sortedBlock[2]+10<200 && !temp[sortedBlock[2]+10].active) {
                    temp[sortedBlock[2]].active = false;
                    temp[sortedBlock[2]+10].active = true;
                    if(sortedBlock[3]+10<200 && !temp[sortedBlock[3]+10].active) {
                        temp[sortedBlock[3]].active = false;
                        temp[sortedBlock[3]+10].active = true;
                        setBlocks(temp);
                        let tempArr:number[] = [];
                        console.log("moved");
                        for(let i=0; i<4; i++) {
                            let tempNum:number = sortedBlock[i];
                            tempArr.push(tempNum+10);
                            setSortedBlock(tempArr);
                        }
                    } else {console.log("exit at 3\n\n\n\n"); setBlockChange(true);}
                } else {console.log("exit at 2\n\n\n\n"); setBlockChange(true);}
            } else {console.log("exit at 1\n\n\n\n"); console.log("before blocks : ", blocks); setBlockChange(true);}     // 여기서 탈출하는 애들이 문제. 한번 변한 temp가 반영이 되어버림
        } else {console.log("exit at 0\n\n\n\n"); setBlockChange(true);}
    }

    useEffect(() => {
        if(blockChange) {
            console.log("blocks : ", blocks)
            console.log("changing\n\n\n\n");
            // let tempSorted:number[] = randomBlockSelection[Math.floor(Math.random() * randomBlockSelection.length)];
            let tempSorted:number[] = LBlock;
            tempSorted.sort((a, b) => b-a);
            let tempStack = [...stack];
            setSortedBlock(tempSorted);
            let tempBlock:blockType[] = [...blocks];

            tempBlock[tempSorted[0]].active = true;
            tempBlock[tempSorted[1]].active = true;
            tempBlock[tempSorted[2]].active = true;
            tempBlock[tempSorted[3]].active = true;

            setBlocks(tempBlock);
            setStack(tempStack);
            setBlockChange(false);
        }
    }, [blockChange])

    useEffect(() => {
        // setInterval과 clearInterval이 반환하는 값은 NodeJS.Timeout
        let intervalId: NodeJS.Timeout;

        if(blocks.length !== 0) {
            intervalId = setTimeout(() => {
                blockMove();
            }, 200)
        }
        // setInterval이 중첩되어 동작하지 않도록 하기 위해서는 clearInterval 사용
        // useEffect가 실행될 때마다 새로운 setInterval이 생성됨
        // 따라서, clearInterval을 통해 정리해주어야 함.
        return () => {
            clearInterval(intervalId);
        };
    }, [blocks])

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
        
        setTimeout(() => {
            let tempSorted:number[] = ZBlock;
            tempSorted.sort((a, b) => b-a);
            let tempStack = [...stack];
            let tempBlock:blockType[] = [...temp];
            setSortedBlock(tempSorted);
            console.log("This block : ", tempSorted);

            tempBlock[tempSorted[0]].active = true;
            tempBlock[tempSorted[1]].active = true;
            tempBlock[tempSorted[2]].active = true;
            tempBlock[tempSorted[3]].active = true;

            setBlocks(tempBlock);
            setStack(tempStack);
        }, 200)

        // setInterval(() => {
        //     blockMove();
        // }, 1000)

    }, [])

    const point = "text-[0.8rem] text-gray-700";

    return (
        <div className="grid grid-cols-10 grid-rows-20 gap-x-1 gap-y-1 w-[25vw] h-[80vh]">
            { blocks.map((item:blockType, index:number) => {
                return (
                    <div key={index} className={item.active ? blockFilledStyle : blockStyle} >
                        <p className={point}>{index}</p>
                    </div>
                )
            })}   
        </div>
    )
}