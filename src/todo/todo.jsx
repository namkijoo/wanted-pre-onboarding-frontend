import React, {useEffect, useState} from "react"
import Axios from "axios";
import styles from "./todo.module.css"

function Todo() {
    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])
    const [counter, setCounter] = useState(true);
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editTodo,setEditTodo]=useState("")
    const toggleEdit = (todoId) => {
        setEditingTodoId(
            todoId === editingTodoId
                ? null
                : todoId
        );
    };
    const editOnchage=(e)=>{
        setEditTodo(e.target.value)
    }
    Axios.defaults.baseURL = 'https://www.pre-onboarding-selection-task.shop'
    useEffect(() => {
        Axios
            .get("/todos", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((response) => {
                console.log(response.data)
                setTodos(response.data)
                console.log(todos)
            })
            .catch((error) => {
                console.log(error)
            })
        }, [counter])
    const todoChange = (e) => {
        setTodo(e.target.value)
    }
    const create = () => {
        Axios
            .post("/todos", {
                todo: todo

            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                console.log(response)
                setCounter(!counter)
                setTodo("")
            })
            .catch((error) => {
                console.log(error)
            })
        }
    const deleteTodo = async (e) => {
        try {
            console.log(e);
            const response = await Axios.delete(`/todos/${e.id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            });
            console.log(response);
            setCounter(!counter);
        } catch (error) {
            console.log(error);
        }
    };

    const updateTodo = (e) => {
        console.log(!e.isCompleted);
        Axios
            .put(`/todos/${e.id}`, {
                todo: editTodo,
                isCompleted: !e.isCompleted
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                console.log(response);
                setCounter(!counter);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const checkTodo = (e) => {
        console.log(!e.isCompleted);
        Axios
            .put(`/todos/${e.id}`, {
                todo: e.todo,
                isCompleted: !e.isCompleted
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                console.log(response);
                setCounter(!counter);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(()=>{
        if(localStorage.getItem("token")==null){
            window.location.href="/signin"
        }
    },[])
    
    return (
        
            <div id={styles.wrapper}>
                <input 
                    id={styles.submitInput}
                    type="text"
                    value={todo}
                    onChange={todoChange}
                    data-testid="new-todo-input"></input>
                <button type="button" onClick={create} data-testid="new-todo-add-button">추가</button>
                {
                    todos.map((todo) => (
                        <div key={todo.id} id={styles.todoWrapper}>
                            {
                                editingTodoId === todo.id
                                    ? <li key={todo.id}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    onClick={() => {
                                                        updateTodo(todo);
                                                    }}
                                                    defaultChecked={todo.isCompleted}
                                                    data-testid="modify-input"
                                                    id={styles.content}/>
                                                <input type="text" value={editTodo} onChange={editOnchage} />
                                            </label>
                                            <button
                                                type="button"
                                                data-testid="submit-button"
                                                onClick={() => {updateTodo(todo); toggleEdit(todo.id)}}>제출</button>
                                            <button
                                                type="button"
                                                data-testid="cancel-button"
                                                onClick={() => {
                                                    toggleEdit(todo.id)
                                                }}>취소</button>
                                        </li>
                                    : <li key={todo.id}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    onClick={() => {
                                                        checkTodo(todo)
                                                    }}
                                                    defaultChecked={todo.isCompleted}/>
                                                <span id={styles.content}>{todo.todo}</span>
                                            </label>
                                            <button
                                                type="button"
                                                data-testid="modify-button"
                                                onClick={() => {toggleEdit(todo.id); setEditTodo(todo.todo);}}>수정</button>
                                            <button
                                                type="button"
                                                data-testid="delete-button"
                                                onClick={() => {
                                                    deleteTodo(todo)
                                                }}>삭제</button>
                                        </li>
                            }
                        </div>
                    ))
                }
            </div>

        
    )
}
export default Todo