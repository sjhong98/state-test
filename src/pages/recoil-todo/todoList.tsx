import { useRecoilState, useRecoilValue } from "recoil"
import { recoilAtom } from "./recoilAtom"
import todoType from "./todoType";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useEffect, useState } from "react";

export default function TodoList(props: {tab:string}) {
    const [todoList, setTodoList] = useRecoilState(recoilAtom);
    const [checkBox, setCheckBox] = useState(-1);
    let todo:todoType[] = []
    let done:todoType[] = []
    const [curList, setCurList] = useState<todoType[]>([]);
    const [selectedItem, setSelectedItem] = useState<number>(-1);
    const tab = props.tab;

    useEffect(() => {
        todo.splice(0);
        done.splice(0);
        for(let i=0; i<todoList.length; i++) {
            if(todoList[i].isDone) {
                done.push(todoList[i]);
            } else {
                todo.push(todoList[i]);
            }
        }
        if(tab === 'todo') setCurList(todo);
        else setCurList(done);
    }, [todoList, tab])

    const handleMouseOver = (index:number) => {
        setSelectedItem(index);
    }
    
    const handleMouseOut = () => {
        setSelectedItem(-1);
    }

    const handleDelete = (id:number) => {
        const newList = [...todoList];
        const findIndex = newList.findIndex(elem => elem.id === id);
        newList.splice(findIndex, 1);
        setTodoList(newList);
    }

    const handleDone = (index:number) => {
        // done으로 넘어가기 전에 체크 표시하기
        setCheckBox(index);

        setTimeout(() => {
            const newElem = {
                id: curList[index].id,
                content: curList[index].content,
                isDone: true
            }
            const newList = [...todoList];
            // todoList에서 특정 원소의 인덱스 값 찾기
            const findIndex = newList.findIndex(elem => elem.id===newElem.id);
            newList.splice(findIndex, 1, newElem);
            setTodoList(newList);
            setCheckBox(-1);
        }, 700);
    }

    return (
        <div className="grid grid-cols-4 w-full gap-y-12 gap-x-12">
            {
                curList.map((item:todoType, index:number) => {
                    return (
                        <div 
                            key={item.id} 
                            className="bg-gray-800 min-h-[13vh] rounded-md p-2" 
                            onMouseOver={() => handleMouseOver(index)}
                            onMouseOut={handleMouseOut}
                        >
                            <div className="flex justify-between">
                                { item.isDone || checkBox === index ?
                                    <CheckBoxIcon  />
                                    :
                                    <CheckBoxOutlineBlankIcon className="cursor-pointer" onClick={() => handleDone(index)} />
                                }
                                { selectedItem === index ?
                                    <DeleteOutlineIcon className="cursor-pointer" onClick={() => handleDelete(item.id)} />
                                    :
                                    <></>
                                }
                            </div>
                            <div className="center h-[90%] w-full">
                                <pre className="whitespace-pre-wrap">{item.content}</pre>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}