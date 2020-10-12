import React, { useState } from "react";
import Button from '@material-ui/core/Button';



export default function App() {
  //Need state for list of tasks
  const [items, setItems] = useState([]);

  //Need state for the current value of each text input
  const [currTitle, setTitle] = useState("");
  const [currDescription, setDescription] = useState("");
  const [currDuedate, setDuedate] = useState("")


  //Need a function to add a task to the task list
  const handleAdd = () => {
    if(currTitle == "" || currDescription == "" || currDuedate == "") alert("1 or more fields empty");
    else{
      setItems(
        [...items, {
          title : currTitle,
          description : currDescription,
          duedate : currDuedate,
        }]
      )
      setTitle("");
      setDescription("");
      setDuedate("");
    }
  };

  //This is a component that will be reused to represent each individual task.
  //What props does each task need?
  const TodoItem = ({item}) => {
    //Need state to represent whether the task is checked off or not
    const [checkedOff, checkOff] = useState(false);
    //Need a function to toggle whether the task is checked off or not
    const handleCheckOff = () => {
      checkOff(!checkedOff);
    };

    //Need a function to delete the task from the todo list
    //Note that because we've placed this component inside of our main app,
    //it has direct access to the state of our main app
    const handleDelete = () => {
      const tempArray = [];
        items.forEach(element => {
          if(element != item){
            tempArray.push(element);
          }
        });
        setItems(tempArray);
    };

    return (
      <div>
        {checkedOff ? 
        (<div style={{border:"solid black 3px", marginTop:"10px"}}><strike>{item.title}</strike> <br></br> 
        <Button onClick={handleCheckOff} variant="contained" color="primary">Uncheck</Button>
        <Button onClick={handleDelete} variant="contained" color="secondary">Delete</Button></div>) :
        (<div style={{border:"solid black 3px", marginTop:"10px"}}><h3>{item.title}</h3>
        <h4>{item.description}</h4>
        <h4>{item.duedate}</h4> 
        <Button onClick={handleCheckOff} variant="contained" color="primary" style={{marginRight:"3px"}}>Check Off</Button>
        <Button onClick={handleDelete} variant="contained" color="secondary">Delete</Button></div>)
        }
      </div>
    );
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* All of the text fields and their labels should go here */}
      <label>
        Title
        <input type="text" value={currTitle} onChange={(e) => setTitle(e.target.value)}/>
      </label>
      <label>
        Description
        <input type="text" value={currDescription} onChange={(e) => setDescription(e.target.value)}/>
      </label>
      <label>
        Due Date
        <input type="text" value={currDuedate} onChange={(e) => setDuedate(e.target.value)}/>
      </label>
      <br></br>
      <Button onClick={handleAdd} variant="contained" color="primary">Add Todo Item</Button>
    
      {
        items.map(x => <TodoItem item={x}></TodoItem>)
      }
    </div>
  );
}