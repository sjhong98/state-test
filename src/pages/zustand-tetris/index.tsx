import { useState } from "react";
import Board from "./board";
import NextBlocks from "./nextBlocks";
import styled from "styled-components";
import Hold from "./hold";

export interface blockType {
    x: number,
    y: number,
    active: boolean,
    guide: boolean
}

export interface HoldType {
    curPos: number[];
    index: number;
    pos: number[]
}

export default function Home() {
    const [hold, setHold] = useState<HoldType>();
    const [score, setScore] = useState<number>(0);

    return (
        <div className="w-screen h-screen pr-64 pl-64 pt-6">
            <Pt className="center" style={{}}>Zustand Tetris</Pt>
            <div className="w-full h-full flex flex-row justify-center">
                <div className="w-auto h-auto bg-gray-900 rounded-xl mr-12 overflow-hidden">
                    <Board hold={hold} setHold={setHold} setScore={setScore} score={score} />
                </div>
                <div className="w-[20%] h-full flex flex-col">
                    <div className="center mt-[-2vh]">
                        <P>score</P>
                    </div>
                    <div className="w-full h-[10%] bg-gray-900 rounded-xl center">
                        <P>{score}</P>
                    </div>
                    <div className="center h-10">
                        <P>next</P>
                    </div>
                    <div className="w-full h-[42%] bg-gray-900 rounded-xl overflow-hidden">
                        <NextBlocks />
                    </div>
                    <div className="center h-10">
                        <P>hold</P>
                    </div>
                    <div className="w-full h-[25%] bg-gray-900 rounded-xl overflow-hidden">
                        <Hold hold={hold} />
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