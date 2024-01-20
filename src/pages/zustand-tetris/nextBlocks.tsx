import { useEffect, useState } from "react";
import { nextBlocksStore } from "./store"
import { blockType } from ".";
import _ from 'lodash';


export default function NextBlocks() {
    const nextBlocks = nextBlocksStore((state) => state.nextBlock);
    const [filled, setFilled] = useState<boolean[]>([]);

    const blockStyle = "rounded-sm center w-[2vw] h-[2vw]";
    const blockFilledStyle = "bg-white rounded-sm center w-[2vw] h-[2vw]";

    const [blocks, setBlocks] = useState<number[]>([]);

    useEffect(() => {
        let temp = [];
        let tempFilled = [];

        for(let i=0; i<90; i++) {
            temp.push(i);
            tempFilled.push(false);
        }
        setBlocks(temp);

        let nb1 = nextBlocks[0];
        let nb2 = nextBlocks[1];


        if(nb1 !== undefined) {
            nb1 = nb1.map((item) => item-2)
            nb2 = nb2.map((item) => item+48);
            for(let i=0; i<4; i++) {
                tempFilled[nb1[i]] = true;
                tempFilled[nb2[i]] = true;
            }
        }
        setFilled(tempFilled);

    }, [nextBlocks])
    
    return (
        <div className="grid grid-cols-10 grid-rows-9 gap-y-1 gap-x-10 w-auto h-auto mt-4">
            { blocks.map((item:number, index:number) => {
                return (
                    <div key={index} className={filled[index] ? blockFilledStyle : blockStyle}>
                    </div>
                )
            })}
        </div>
    )
}