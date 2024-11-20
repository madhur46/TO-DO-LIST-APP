import './App.css';
import React,{useEffect, useState} from 'react';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
function App() {

  const[isCompleteScreen,setIsCompleteScreen]=useState(false);
  const[allTodo,setTodo]=useState([]);
  const[newTitle,setNewTitle]=useState("");
  const[newDescription,setNewDescription]=useState("");
  const[completeTodo,setCompleteTodo]=useState([])

  const handleAddtodo=()=>
  {
    let newTodo={
      title:newTitle,
      description:newDescription
    }


    let updatedTodoarray=[...allTodo];
    updatedTodoarray.push(newTodo);
    setTodo(updatedTodoarray);
    localStorage.setItem('to-do-list',JSON.stringify(updatedTodoarray));
  };

  



  const handledelete=(index)=>
  {
    let reduced_item=[...allTodo];
    reduced_item.splice(index,1);

    localStorage.setItem('to-do-list',JSON.stringify(reduced_item));
    setTodo(reduced_item);


  };
  // delete function for completed tab
  const handle_completed_delete=(index)=>
  {
    let reduced_item=[...completeTodo];
    reduced_item.splice(index,1);

    localStorage.setItem('completeTodo',JSON.stringify(reduced_item));
    setCompleteTodo(reduced_item);


  };


  const handlecomplete=(index)=>
  {
    let now=new Date();
    let dd=now.getDate();
    let mm=now.getMonth();
    let yy=now.getFullYear();

    let hrs=now.getHours();
    let min=now.getMinutes();
    let sec=now.getSeconds();


    let completed_on=dd + '/' +mm + '/' + yy + ' at ' + hrs + ':' + min +':'+ sec ;
    let filterd_item={
      ...allTodo[index],
      completed_on:completed_on
    }

    let updated_completed_arr=[...completeTodo];
    updated_completed_arr.push(filterd_item);
    setCompleteTodo(updated_completed_arr);
    handledelete(index);
    localStorage.setItem('completeTodo',JSON.stringify(updated_completed_arr));
    
  };

  useEffect(()=>
  {
    let savedtodo=JSON.parse(localStorage.getItem('to-do-list'));
    let saved_completed_todo=JSON.parse(localStorage.getItem('completeTodo'));
    if(savedtodo)
    {
      setTodo(savedtodo);
    }

    if(saved_completed_todo)
    {
      setCompleteTodo(saved_completed_todo);
    }
    
  },[])


  return (
    <div className="App">
         <h1>MY TO-DO LIST</h1>
            <div className="to-do-conatiner">
              <div className="to-do-input-container">

                      <div className="to-do-input">
                        <label>Title</label>
                        <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What is your task title"/>
                      </div>


                      <div className="to-do-input">
                        <label>Description</label>
                        <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="Description of the task"/>
                      </div>
                      <div className="to-do-input">

                        {/* working of buttton to add task */}
                        <button type="button" onClick={handleAddtodo} type className="primaryBTN">ADD</button>
                      </div>

              </div>



              <div className="button-area">
                  <button className={`secondaryBTN  ${isCompleteScreen===false  && 'active'}`}
                  onClick={()=>setIsCompleteScreen(false)}
                  >TO-DO</button>
                  <button className={`secondaryBTN  ${isCompleteScreen===true  && 'active'}`}
                  onClick={()=>setIsCompleteScreen(true)}
                  >COMPLETED</button>
              </div>


              <div className="to-do-list">
                  {/* the tab for to do list */}
                { isCompleteScreen===false && allTodo.map((item,index)=>{
                 return (
                  <div className="to-do-list-item" key={index}>
                    <div className='task-info'>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    </div>
                      
                    <div>
                  <MdOutlineDeleteOutline className='icon' onClick={()=>handledelete(index)}/>
                  <FaCheck className='check-icon'  onClick={()=>handlecomplete(index)}/>
                   </div>
                  </div>
                 )
                     } )}

                     {/* the tab for completed list */}
                     { isCompleteScreen===true && completeTodo.map((item,index)=>{
                 return (
                  <div className="to-do-list-item" key={index}>
                    <div className='task-info'>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p><b>Completed on: {item.completed_on}</b></p>

                    </div>
                      
                    <div>
                  <MdOutlineDeleteOutline className='icon' onClick={()=>handle_completed_delete(index)}/>
                
                   </div>
                  </div>
                 )
                     } )}



                 
              </div>
              

            </div>
    </div>
  );
}

export default App;
