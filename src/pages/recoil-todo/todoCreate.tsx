import { useRecoilState } from "recoil"
import { recoilAtom } from "./recoilAtom"
import todoType from "./todoType";
import { useCallback, useState } from "react";

export default function TodoCreate() {
    const [todoList, setTodoList] = useRecoilState<todoType[]>(recoilAtom);
    const [content, setContent] = useState<string>("");

    const getId = () => {
        if(todoList.length !== 0) {
            return todoList[todoList.length-1].id+1;
        } else {
            return 0;
        }
    }

    const addList = useCallback(() => {
        const curTodoList:todoType[] = [...todoList, {
            id: getId(),
            content: content,
            isDone: false
        }]
        setTodoList(curTodoList);
        setContent("");
    }, [content])

    return (
        <div className="flex flex-col">
            <textarea className="bg-gray-900 rounded-xl w-[12vw] h-[60%] text-xl p-6" value={content} onChange={(e)=>setContent(e.target.value)} />
            <button className="bg-red-500 rounded-xl h-[10vh] mt-12 cursor-pointer text-3xl" onClick={addList}>PUSH</button>
        </div>
    )
}