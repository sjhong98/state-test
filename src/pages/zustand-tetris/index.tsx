import Board from "./board";

export interface blockType {
    x: number,
    y: number,
    active: boolean
}

export default function Home() {

    return (
        <div className="w-screen h-screen pr-64 pl-64 pt-12">
            <p className="text-[3rem] mb-12 center">Zustand Tetris</p>
            <div className="w-full h-full flex flex-row justify-center">
                <div className="w-[25vw] h-[80vh] bg-gray-900 rounded-xl mr-12">
                    <Board />
                </div>
                <div className="w-[30%] h-full flex flex-col">
                    <div className="w-full h-[50%] bg-gray-900 rounded-xl">

                    </div>
                    <div className="w-full h-[25%] mt-[20%] bg-gray-900 rounded-xl">

                    </div>
                </div>
            </div>

        </div>
    )
}