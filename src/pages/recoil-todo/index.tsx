// useRecoilValue() : atom 읽기 전용
// useSetRecoilState() : atom 갱신 전용
// useRecoilState() : atom 읽기 · 쓰기 가능 (useState처럼 사용 가능)

import { useState } from "react"
import TodoCreate from "./todoCreate"
import TodoList from "./todoList"

export default function RecoilTodo() {
    const [selected, setSelected] = useState("todo");

    const tab = "center w-1/2 bg-gray-800";
    const selectedTab = "center w-1/2";

    return (
        <div className="pl-48 pr-48 pt-20 pb-20 center w-screen h-screen flex-col">
            <p className="text-3xl pb-6">To-do List</p>
            <div className="w-full h-full flex">   
                                                                {/* 부모 영역을 벗어나는 자식을 보이지 않도록 하려면 overflow hidden */}
                <div className="bg-gray-900 w-[90%] rounded-xl mr-12 overflow-hidden">
                    <div className="w-full h-[4vh] flex">
                        <div className={selected==="todo" ? selectedTab : tab} onClick={()=>setSelected("todo")} >
                            <p>To-do</p>
                        </div>
                        <div className={selected==="done" ? selectedTab : tab} onClick={()=>setSelected("done")} >
                            <p>Done</p>
                        </div>
                    </div>
                    <div className="p-6 h-full  overflow-y-auto">
                        <TodoList tab={selected} />
                    </div>
                </div>
                <TodoCreate />
            </div>
        </div>
    )
}