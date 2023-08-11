import React,{useEffect, useState} from "react"
import Axios from "axios";

function Todo(){
    const [todo,setTodo]=useState("")
    const [todos,setTodos]=useState([])
    const [counter, setCounter] = useState(true);
    Axios.defaults.baseURL = 'https://www.pre-onboarding-selection-task.shop'
    useEffect(()=>{
        Axios.get("/todos",{
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((response)=>{
            console.log(response.data)
            setTodos(response.data)
            console.log(todos)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[counter])
    const todoChange=(e)=>{
        setTodo(e.target.value)
    }
    const create=()=>{
        Axios.post("/todos",{
            todo:todo
            
        },{
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        })
        .then((response)=>{
            console.log(response)
            setCounter(!counter)
            setTodo("")
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const deleteTodo = async (e) => {
        try {
          console.log(e);
          const response = await Axios.delete(`/todos/${e.id}`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          });
          console.log(response);
          setCounter(!counter);
        } catch (error) {
          console.log(error);
        }
      };
      
    
      

      
    const click=()=>{
        console.log(todos)
    }
    return(
        <div>
            <div>
                <input type="text" value={todo} onChange={todoChange} data-testid="new-todo-input"></input>
                <button type="button" onClick={create} data-testid="new-todo-add-button">추가</button>
                {todos.map((todo)=>(
                    <li key={todo.id}>
                    <label>
                        <input type="checkbox"/>
                        <span>{todo.todo}</span>
                    </label>
                    <button type="button" data-testid="modify-button">수정</button>
                    <button type="button" data-testid="delete-button" onClick={()=>{deleteTodo(todo)}}>삭제</button>
                    </li>
                ))}
            </div>
            
        </div>
    )
}
export default Todo