import { useEffect, useState } from "react";
import { nextBlocksStore } from "./store"
import { blockType } from ".";
import _ from 'lodash';


export default function NextBlocks() {
    const nextBlocks = nextBlocksStore((state) => state.nextBlock);
    const [filled, setFilled] = useState<boolean[]>([]);

    const blockStyle = "rounded-sm center w-[1.8vw] h-[1.8vw]";
    const blockFilledStyle = "bg-white rounded-sm center w-[1.8vw] h-[1.8vw]";

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

        console.log(nb1, nb2);

        if(nb1 !== undefined) {
            nb2 = nb2.map((item) => item+50);
            for(let i=0; i<4; i++) {
                tempFilled[nb1[i]] = true;
                tempFilled[nb2[i]] = true;
            }
        }
        setFilled(tempFilled);

    }, [nextBlocks])
    
    return (
        <div className="grid grid-cols-10 grid-rows-9 w-[32vh] h-[29vh] mt-12">
            { blocks.map((item:number, index:number) => {
                return (
                    <div key={index} className={filled[index] ? blockFilledStyle : blockStyle}>
                    </div>
                )
            })}
        </div>
    )
}