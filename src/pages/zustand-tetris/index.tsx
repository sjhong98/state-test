import Board from "./board";
import NextBlocks from "./nextBlocks";

export interface blockType {
    x: number,
    y: number,
    active: boolean,
    guide: boolean
}

export default function Home() {

    return (
        <div className="w-screen h-screen pr-64 pl-64 pt-12">
            <p className="text-[3rem] mb-12 center">Zustand Tetris</p>
            <div className="w-full h-full flex flex-row justify-center">
                <div className="w-auto h-[80vh] bg-gray-900 rounded-xl mr-12 overflow-hidden">
                    <Board />
                </div>
                <div className="w-[30%] h-full flex flex-col">
                    <div className="w-full h-[10%] bg-gray-900 rounded-xl">

                    </div>
                    <div className="w-full h-[40%] mt-[15%] bg-gray-900 rounded-xl overflow-hidden">
                        <NextBlocks />
                    </div>
                    <div className="w-full h-[25%] mt-[15%] bg-gray-900 rounded-xl">

                    </div>
                </div>
            </div>

        </div>
    )
}