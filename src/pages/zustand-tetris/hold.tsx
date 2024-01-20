import { useEffect, useState } from "react";
import { HoldType } from ".";

export default function Hold(props:{ hold:HoldType | undefined }) {
    const [blocks, setBlocks] = useState<boolean[]>([]);

    const blockStyle = "rounded-sm center w-[2vw] h-[2vw]";
    const blockFilledStyle = "bg-white rounded-sm center w-[2vw] h-[2vw]";

    const hold = props.hold;

    useEffect(() => {
        if(hold !== undefined) {
            console.log(hold);
            let temp:boolean[] = [];
            for(let i=0; i<11; i++) {
                temp.push(false);
            }
            for(let i=0; i<4; i++) {
                temp[hold.curPos[i]] = true;
            }
            setBlocks(temp);
        }
    }, [hold])

    return (
        <div className="grid grid-rows-4 grid-cols-3 gap-1 mt-10 h-auto w-[7vw] ml-20">
            { blocks.map((item:boolean, index:number) => {
                return (
                    <div key={index} className={item ? blockFilledStyle : blockStyle} />
                )
            })}
        </div>
    )
}