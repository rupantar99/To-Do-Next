'use client';
import Image from 'next/image'
import styles from './page.module.css'
import {useState, useEffect} from "react";

function Task({ text, selected, onSelect, onDel}) {
    let classname;
    if (selected) {
        classname = styles.selected
    } else {
        classname = ""
    }
    return (
        <div className={styles.task_parent}>
            <div onClick={onSelect} className={`${styles.task} ${classname}`}>
                <i className={styles.checkbox}></i>
                <label>{text}</label>
            </div>
            <div onClick={onDel} className={styles.delete}>
                <img src="delete.svg" alt=""/>
            </div>
        </div>
    )
}

export default function Home() {

    const [items,setItems]=useState([])
    const [input, setInput] = useState("")
    useEffect(() => {
        const data = window.localStorage.getItem('TASKS');
        if ( data !== null ) setItems(JSON.parse(data));
    }, []);
        
    useEffect(() => {
        window.localStorage.setItem('TASKS', JSON.stringify(items));
    }, [items]);
    //update item when clicked (done / not done toggle)
    function setItm(itm, id) {
        const i = itm.slice()
        if (itm[id].done) {
            i[id].done=false
        } else {
            i[id].done=true
        }
        console.log(i)
        setItems(i)
    }
    //create new task
    function createItem() {
        const i = items.slice()
        const new_i= [...i, {item: input, done: false}]
        setItems(new_i)
    }
    //delete a task
    function deleteItem(id) {
        const i = items.slice()
        i.splice(id,1)
        setItems(i)
    }
    return (
        <main className={styles.main}>
            <div className={styles.header}>To Do List</div>
            <div className={styles.tasks_list}>
                {items.map((e, index,array) => {
                    return (<Task key={index} text={e.item} selected={e.done} onSelect={() => setItm(items,index)} onDel={() => deleteItem(index)} />)
                })}
                <div className={styles.bottom_pad}></div>
            </div>
            <div className={styles.new_task}>
                <input
                    type="text"
                    onChange={e => setInput(e.target.value)}
                    value={input}
                />
                <button onClick={createItem} >
                    <img src="plus.svg" alt="create"/>
                </button>
            </div>
        </main>
    )
}


