import Board from "./board";
import NextBlocks from "./nextBlocks";
import styled from "styled-components";

export interface blockType {
    x: number,
    y: number,
    active: boolean,
    guide: boolean
}

export default function Home() {

    return (
        <div className="w-screen h-screen pr-64 pl-64 pt-6">
            <Pt className="center" style={{}}>Zustand Tetris</Pt>
            <div className="w-full h-full flex flex-row justify-center">
                <div className="w-auto h-auto bg-gray-900 rounded-xl mr-12 overflow-hidden">
                    <Board />
                </div>
                <div className="w-[20%] h-full flex flex-col">
                    <div className="center mt-[-2vh]">
                        <P>SCORE</P>
                    </div>
                    <div className="w-full h-[10%] bg-gray-900 rounded-xl">

                    </div>
                    <div className="center h-10">
                        <P>NEXT</P>
                    </div>
                    <div className="w-full h-[42%] bg-gray-900 rounded-xl overflow-hidden">
                        <NextBlocks />
                    </div>
                    <div className="center h-10">
                        <P>KEEP</P>
                    </div>
                    <div className="w-full h-[25%] bg-gray-900 rounded-xl">

                    </div>
                </div>
            </div>

        </div>
    )
}

const P = styled.p`
    font-family: 'lemon';
    font-size: 1.5rem;
`

const Pt = styled.p`
    font-family: "inlander";
    font-size: 5rem;
    margin-bottom: 2vh;
`