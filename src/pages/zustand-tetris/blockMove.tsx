import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { blockType } from ".";
import { blockChangeStore, blockStore, sortedBlockStore, isMovingStore, curBlockStore, rotateCountStore } from "./store";
import { IRotate, TRotate, SRotate, ZRotate, JRotate, LRotate, ORotate } from "./blocks";
import _ from 'lodash';
import styled from "styled-components";

interface PropsType {
    setShift: Dispatch<SetStateAction<number>>
    hold: boolean,
    setHold: Dispatch<SetStateAction<boolean>>,
    gameOver: boolean
}

export function BlockMove(props: PropsType) {
    const [keyDown, setKeyDown] = useState<string>("");
    const [isKeyDown, setIsKeyDown] = useState<boolean>(false);

    const rotateCount:number = rotateCountStore((state) => state.rotateCount);
    const setRotateCount = rotateCountStore((state) => state.setRotateCount);
    const sortedBlock:number[] = sortedBlockStore((state) => state.sortedBlock);
    const blocks:blockType[] = blockStore((state) => state.blocks);
    const setSortedBlock = sortedBlockStore((state) => state.setSortedBlock);
    const setBlocks = blockStore((state) => state.setBlocks);
    const setBlockChange = blockChangeStore((state) => state.setBlockChange);
    const curBlock:string = curBlockStore((state) => state.curBlock);

    const hold = props.hold;
    const setHold = props.setHold;

    // setInterval과 clearInterval이 반환하는 값은 NodeJS.Timeout
    let intervalId: NodeJS.Timeout;

    const handleKeyDown = (e: any) => {
        setKeyDown(e.key);
        setIsKeyDown(prev=>!prev);
        e.preventDefault();
    }

    // blockDirection 함수가 등록될 당시의 block 값이 반영되어 undefined 처리되는 것 방지.
    // handleKeyDown이 실행되면 keyDown을 통해 useEffect로 함수 등록 갱신

    useEffect(() => {
        switch (keyDown) {
            case 'ArrowUp' :
                break;
            case 'ArrowDown' :
                blockDown();
                break;
            case 'ArrowRight' :
                blockRight();
                break;
            case 'ArrowLeft' :
                blockLeft();
                break;
            case ' ' :
                blockRotate();
                break;
            case 'Shift' :
                props.setShift(prev=>prev+1);
                break;
            case 'Enter' :
                if(!props.gameOver)
                    setHold(prev=>!prev);
            default :
                break;
        }
    }, [keyDown, isKeyDown])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
    }, [])

    useEffect(() => {
        if(!hold) {
            if(blocks.length !== 0) {
                intervalId = setTimeout(() => {
                    blockDown();
                }, 500)
            }
            // setInterval이 중첩되어 동작하지 않도록 하기 위해서는 clearInterval 사용
            // useEffect가 실행될 때마다 새로운 setInterval이 생성됨
            // 따라서, clearInterval을 통해 정리해주어야 함.

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [blocks])

    // shift keyDown시, 현재 동작 중인 timeout을 clear하고, 새로운 timeout 발생하지 않도록 함
    useEffect(() => {
        if(hold) {
            clearTimeout(intervalId);
        } else {
            blockDown();
        }
    }, [hold])

    const blockDown = () => {
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
                            for(let i=0; i<4; i++) {
                                let tempNum:number = sortedBlock[i];
                                tempArr.push(tempNum+10);
                                setSortedBlock(tempArr);
                                setIsKeyDown(prev=>!prev);
                            }
                        } else {setBlockChange(true);}
                    } else {setBlockChange(true);}
                } else {setBlockChange(true);}     // 여기서 탈출하는 애들이 문제. 한번 변한 temp가 반영이 되어버림
            } else {setBlockChange(true);}
    }

    const blockRight = () => {
        let temp = _.cloneDeep(blocks);

        for(let i=0; i<200; i++) {
            temp[i].guide = false;
        }

        if((sortedBlock[0]+1)%10!==0 && !temp[sortedBlock[0]+1].active) {
            temp[sortedBlock[0]].active = false;
            temp[sortedBlock[0]+1].active = true;
            if((sortedBlock[1]+1)%10!==0 && !temp[sortedBlock[1]+1].active) {
                temp[sortedBlock[1]].active = false;
                temp[sortedBlock[1]+1].active = true;
                if((sortedBlock[2]+1)%10!==0 && !temp[sortedBlock[2]+1].active) {
                    temp[sortedBlock[2]].active = false;
                    temp[sortedBlock[2]+1].active = true;
                    if((sortedBlock[3]+1)%10!==0 && !temp[sortedBlock[3]+1].active) {
                        temp[sortedBlock[3]].active = false;
                        temp[sortedBlock[3]+1].active = true;

                        let tempArr:number[] = [];
                        for(let i=0; i<4; i++) {
                            let tempNum:number = sortedBlock[i];
                            let rest = (tempNum+1)%10 ;
                            tempArr.push(tempNum+1);
                            setSortedBlock(tempArr);
                            setIsKeyDown(prev=>!prev);
                            for(let j=0; j<20; j++) {
                                temp[j*10 + rest].guide = true;
                            }
                        }
                        setBlocks(temp);
                    } 
                } 
            }    
        } 
    }

    const blockLeft = () => {
        let temp = _.cloneDeep(blocks);

        for(let i=0; i<200; i++) {
            temp[i].guide = false;
        }

        if(sortedBlock[3]%10!==0 && !temp[sortedBlock[3]-1].active) {
            temp[sortedBlock[3]].active = false;
            temp[sortedBlock[3]-1].active = true;
            if(sortedBlock[2]%10!==0 && !temp[sortedBlock[2]-1].active) {
                temp[sortedBlock[2]].active = false;
                temp[sortedBlock[2]-1].active = true;
                if(sortedBlock[1]%10!==0 && !temp[sortedBlock[1]-1].active) {
                    temp[sortedBlock[1]].active = false;
                    temp[sortedBlock[1]-1].active = true;
                    if(sortedBlock[0]%10!==0 && !temp[sortedBlock[0]-1].active) {
                        temp[sortedBlock[0]].active = false;
                        temp[sortedBlock[0]-1].active = true;
                        let tempArr:number[] = [];
                        for(let i=0; i<4; i++) {
                            let tempNum:number = sortedBlock[i];
                            let rest = (tempNum-1)%10 ;
                            tempArr.push(tempNum-1);
                            setSortedBlock(tempArr);
                            setIsKeyDown(prev=>!prev);
                            for(let j=0; j<20; j++) {
                                temp[j*10 + rest].guide = true;
                            }
                        }
                        setBlocks(temp);
                    } 
                }
            } 
        } 
    }

    const blockRotate = () => {
        switch(curBlock) {
            case 'i' :
                rotate(IRotate);
                break;
            case 'j' :
                rotate(JRotate);
                break;
            case 'l' :
                rotate(LRotate);
                break;
            case 'o' :
                rotate(ORotate);
                break;
            case 'z' :
                rotate(ZRotate);
                break;
            case 's' :
                rotate(SRotate);
                break;
            case 't' :
                rotate(TRotate);
                break;
            default :
                break;
        }
    } 

    const rotate = (arr:Array<Array<number>>) => {
        let rotateTemp:number[] = _.cloneDeep(sortedBlock);
        let temp = _.cloneDeep(blocks);
        let i = 0;
        let moveLeft = 0;
        let moveRight = 0;

        for(; i<200; i++) {
            temp[i].guide = false;
        }
        
        for(i=0; i<4; i++) {
            if(rotateTemp[i]%10===9 || rotateTemp[i]%10===8 || rotateTemp[i]%10===7 ) {
                if((rotateTemp[i]+arr[rotateCount][i])%10===0 || (rotateTemp[i]+arr[rotateCount][i])%10===1 || (rotateTemp[i]+arr[rotateCount][i])%10===2)
                moveLeft++;
            }
            if(rotateTemp[i]%10===0 && (rotateTemp[i]+arr[rotateCount][i])%10===9) {
                moveRight++;
            }
        }
        for(i=0; i<4; i++) {
            rotateTemp[i] = rotateTemp[i] + arr[rotateCount][i];
        }
        if(moveLeft !== 0) 
            for(i=0; i<4; i++)
                rotateTemp[i] -= moveLeft;
        else if(moveRight !== 0) 
            for(i=0; i<4; i++) 
                rotateTemp[i] += moveRight;
        if(rotateCount === 3) 
            setRotateCount(0);
        else {
            let temp = rotateCount + 1;
            setRotateCount(temp);
        }    
        for(i=0; i<4; i++) {
                temp[sortedBlock[i]].active = false;
        }
        for(i=0; i<4; i++) {
            if(rotateTemp[i]<200 && rotateTemp[i]>=0 && !temp[rotateTemp[i]].active) 
                temp[rotateTemp[i]].active = true; 
        }
        for(let k=0; k<4; k++) {
            let rest = rotateTemp[k] % 10;
            for(let v=0; v<20; v++) {
                if(temp[v*10 + rest] !== undefined)
                    temp[v*10 + rest].guide = true;
            }
        }
        if(i === 4) {
            setBlocks(temp);
            setSortedBlock(rotateTemp); 
        }
    }

    return (
        <div onKeyDown={handleKeyDown} />
    )
}
