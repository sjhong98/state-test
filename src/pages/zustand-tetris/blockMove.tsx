import { useCallback, useEffect, KeyboardEvent, useState } from "react";
import { blockType } from ".";
import { blockChangeStore, blockStore, sortedBlockStore, isMovingStore } from "./store";
import _ from 'lodash';

export function BlockMove() {
    const [keyDown, setKeyDown] = useState<string>("");
    const [keyCount, setKeyCount] = useState<number>(0);
    const sortedBlock:number[] = sortedBlockStore((state) => state.sortedBlock);
    const blocks:blockType[] = blockStore((state) => state.blocks);
    const setSortedBlock = sortedBlockStore((state) => state.setSortedBlock);
    const setBlocks = blockStore((state) => state.setBlocks);
    const setBlockChange = blockChangeStore((state) => state.setBlockChange);
    const setIsMoving = isMovingStore((state) => state.setIsMoving);

    const handleKeyDown = (e: any) => {
        setKeyDown(e.key);
        setKeyCount((prev) => prev+1);
        e.preventDefault();
    }

    // blockDirection 함수가 등록될 당시의 block 값이 반영되어 undefined 처리되는 것 방지.
    // handleKeyDown이 실행되면 keyDown을 통해 useEffect로 함수 등록 갱신

    useEffect(() => {
        console.log(keyDown);
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
            default :
                break;
        }
    }, [keyDown, keyCount])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
    }, [])

    useEffect(() => {
        // setInterval과 clearInterval이 반환하는 값은 NodeJS.Timeout
        let intervalId: NodeJS.Timeout;

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
    }, [blocks])

    const freezeBoard = () => {
        setIsMoving(true);
        setTimeout(() => {
            setIsMoving(false);
        }, 300)
    }

    // left move 시에는 오름차순 정렬
    // right, down move 시에는 내림차순 정렬

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
                            freezeBoard();
                        }
                    } else {setBlockChange(true);}
                } else {setBlockChange(true);}
            } else {setBlockChange(true);}     // 여기서 탈출하는 애들이 문제. 한번 변한 temp가 반영이 되어버림
        } else {setBlockChange(true);}
    }

    const blockRight = () => {
        let temp = _.cloneDeep(blocks);
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
                        setBlocks(temp);
                        let tempArr:number[] = [];
                        for(let i=0; i<4; i++) {
                            let tempNum:number = sortedBlock[i];
                            tempArr.push(tempNum+1);
                            setSortedBlock(tempArr);
                            freezeBoard();
                        }
                    } 
                } 
            }    
        } 
    }

    const blockLeft = () => {
        let temp = _.cloneDeep(blocks);

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
                        setBlocks(temp);
                        let tempArr:number[] = [];
                        for(let i=0; i<4; i++) {
                            let tempNum:number = sortedBlock[i];
                            tempArr.push(tempNum-1);
                            setSortedBlock(tempArr);
                            freezeBoard();
                        }
                    } 
                }
            } 
        } 
    }

    return (
        <div onKeyDown={handleKeyDown} />
    )
}
