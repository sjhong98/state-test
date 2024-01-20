// 10 x 20

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { HoldType, blockType } from ".";
import { IBlock, ZBlock, SBlock, JBlock, LBlock, OBlock, TBlock } from "./blocks";
import React from 'react';
import { blockChangeStore, blockStore, curBlockStore, isMovingStore, nextBlocksStore, prevTimeStore, rotateCountStore, sortedBlockStore, timeStore } from "./store";
import { BlockMove } from "./blockMove";
import _ from 'lodash';
import styled from "styled-components";
import { useRouter } from "next/router";

interface PropsType { 
    hold: HoldType | undefined
    setHold: Dispatch<SetStateAction<HoldType | undefined>>
    setScore: Dispatch<SetStateAction<number>>
    score: number
}

export default function Board(props: PropsType) {
    const [randomArr, setRandomArr] = useState<number[]>([]);
    const [shift, setShift] = useState<number>(0);
    const [pause, setPause] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [maxHold, setMaxHold] = useState<boolean>(false);

    const nextBlocks = nextBlocksStore((state) => state.nextBlock);
    const setNextBlocks = nextBlocksStore((state) => state.setNextBlock);
    const setSortedBlock = sortedBlockStore((state) => state.setSortedBlock);
    const sortedBlock = sortedBlockStore((state) => state.sortedBlock);
    const blocks:blockType[] = blockStore((state) => state.blocks);
    const setBlocks = blockStore((state) => state.setBlocks);
    const blockChange:boolean = blockChangeStore((state) => state.blockChange);
    const setBlockChange = blockChangeStore((state) => state.setBlockChange);
    const setCurBlock = curBlockStore((state) => state.setCurBlock);
    const curBlock:string = curBlockStore((state) => state.curBlock);
    const setRotateCount = rotateCountStore((state) => state.setRotateCount);
    const time:number = timeStore((state) => state.time);
    const setTime = timeStore((state) => state.setTime);
    const prevTime = prevTimeStore((state) => state.prevTime);

    const blockStyle = "bg-gray-800 rounded-sm center w-[2vw] h-[2vw]";
    const blockFilledStyle = "bg-white rounded-sm center w-[2vw] h-[2vw]";
    const blockGuide = "bg-gray-700 rounded-sm center w-[2vw] h-[2vw]";

    const randomBlockSelection = [IBlock, ZBlock, SBlock, LBlock, JBlock, OBlock, TBlock];

    const setHold = props.setHold;
    const router = useRouter();

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
        let lines = 0;
        let tempPrevTime = prevTime;

        // 채워진 row 제거
        if(blocks.length !== 0) {
            let count = 0;
            for(let i=0; i<20; i++) {
                for(let j=0; j<10; j++) {
                    if(blocks[10*i + j].active) {
                        count++;
                    }
                }
                if(count === 10) {
                    lines++;
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

        switch(lines) {
            case 1 :
                props.setScore(prev=>prev+1);
                break;
            case 2 :
                props.setScore(prev=>prev+3);
                break;
            case 3 :
                props.setScore(prev=>prev+5);
                break;
            case 4 :
                props.setScore(prev=>prev+8);
                break;
            default:
                break;
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

                for(let t=0; t<4; t++) {
                    if(temp[next[t]].active) {
                        setGameOver(true);
                        break;
                    } else {
                        temp[next[t]].active = true;
                    }
                }
    
                // 가이드 그리기
                for(let j=0; j<4; j++) {
                    let rest = next[j] % 10;
                    for(let i=0; i<20; i++) {
                        temp[i*10 + rest].guide = true;
                    }
                }
    
                setBlocks(temp);
                setBlockChange(false);
                setRotateCount(0); 
                setTime(prevTime);
                if(shift !== 1)
                    setMaxHold(false);
            }
        }
    }, [blockChange])

    useEffect(() => {
        if(!maxHold) {
            if(shift !== 0) {
                // shift keydown 시 기존 block 제거
                let temp:blockType[] = _.cloneDeep(blocks);
                for(let i=0; i<4; i++) {
                    temp[sortedBlock[i]].active = false;
                }
                let tempElem:HoldType = { curPos:[], index: 0, pos:[] };

                switch(curBlock) {
                    case 'i' : 
                        tempElem.curPos = [1, 4, 7, 10];
                        tempElem.index = 0;
                        tempElem.pos = [35, 25, 15, 5];
                        break;
                    case 'z' :
                        tempElem.curPos = [0, 1, 4, 5];
                        tempElem.index = 1;
                        tempElem.pos = [16, 15, 5, 4];
                        break;
                    case 's' :
                        tempElem.curPos = [1, 2, 3, 4];
                        tempElem.index = 2;
                        tempElem.pos = [15, 14, 6, 5]
                        break;
                    case 'l' :
                        tempElem.curPos = [1, 4, 7, 8];
                        tempElem.index = 3;
                        tempElem.pos = [26, 25, 15, 5]
                        break; 
                    case 'j' :
                        tempElem.curPos = [1, 4, 6, 7];
                        tempElem.index = 4;
                        tempElem.pos = [25, 24, 15, 5]
                        break;
                    case 'o' :
                        tempElem.curPos = [0, 1, 3, 4];
                        tempElem.index = 5;
                        tempElem.pos = [15, 14, 5, 4]
                        break;
                    case 't' :
                        tempElem.curPos = [1, 3, 4, 5];
                        tempElem.index = 6;
                        tempElem.pos = [16, 15, 14, 5]
                        break;
                }
                if(props.hold !== undefined)
                    switch(props.hold.index) {
                        case 0 : setCurBlock('i'); break;
                        case 1 : setCurBlock('s'); break;
                        case 2 : setCurBlock('z'); break;
                        case 3 : setCurBlock('l'); break;
                        case 4 : setCurBlock('j'); break;
                        case 5 : setCurBlock('o'); break;
                        case 6 : setCurBlock('t'); break;
                    }
                
                
                if(shift === 1) {
                    setBlockChange(true);  
                } else {
                    if(props.hold !== undefined) {
                        for(let i=0; i<4; i++) {
                            temp[props.hold.pos[i]].active = true;
                        }
                        setSortedBlock(props.hold.pos);
                    }
                }

                setHold(tempElem);
                setBlocks(temp);
                setRotateCount(0);
                props.setHold(tempElem);
                setMaxHold(true);
                console.log("holded");
            }
        }
    }, [shift])

    useEffect(() => {
        if(gameOver) {
            setPause(true);
        }    
    }, [gameOver])


    return (
        <div className="grid grid-cols-10 grid-rows-20 gap-x-1 gap-y-1 w-auto h-auto" >
            { blocks.map((item:blockType, index:number) => {
                return (
                    <div key={index} className={item.active ? blockFilledStyle : item.guide ? blockGuide : blockStyle} />
                )
            })}   
            <BlockMove setShift={setShift} hold={pause} setHold={setPause} gameOver={gameOver} />
            { pause ?
                gameOver ?
                <PauseScreen className="center flex-col">
                    <P>GameOver</P>
                    <P3>{props.score}</P3>
                    <P2 onClick={()=>router.reload()}>retry</P2>
                </PauseScreen>
                :
                <PauseScreen>
                    <P>Pause</P>
                </PauseScreen>
                :
                <></>
            }
        </div>
 
 )
}

const PauseScreen = styled.div`
    width: 200vw;
    height: 200vh;
    background-color: black;
    position: fixed;
    left: -50vw;
    top: -50vh;
    opacity: 0.5;
`

const P = styled.p`
    font-size: 12rem;
    color: white;
    font-family: 'dimit';
    margin-bottom: -4vh;
`

const P2 = styled.p`
    &:hover{
        scale: 1.2;
    }
    font-size: 6rem;
    color: white;
    font-family: 'dimit';
    cursor: pointer;
`

const P3 = styled.p`
    font-size: 6rem;
    color: white;
    font-family: 'dimit';
    opacity: 1;
`