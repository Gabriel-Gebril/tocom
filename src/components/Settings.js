import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from "../components/SideBar";
import { useEffect, useState } from 'react';
import './Settings.css'
import TopBar from "../components/TopBar";
function KeybindSetting(props){
    const [checked, setChecked] = useState(false);
    const [currSeq, updateSeq] = useState(props.seq);
    const [currAction, handleActionChange] = useState(props.action)
    const handleKeyDown = (event) => {

        if (!event.repeat){
            //
            updateSeq([...currSeq,event.key.toLowerCase()])
        }
    };
    const handleKeyUp = (event) => {
        if (currSeq.includes(event.key.toLowerCase() )){
            setChecked(!checked);
        }
    };  
      useEffect(() => {
        
        checked ? window.addEventListener('keydown', handleKeyDown):window.removeEventListener('keydown', handleKeyDown);
        checked ? window.addEventListener('keyup', handleKeyUp):window.removeEventListener('keyup', handleKeyUp);
        if (currSeq.length === 4 && checked) {
            setChecked(!checked)
        }
        if (!checked){
            // console.log(props.keybinds)
            let arr = props.keybinds
            let obj = arr.find((o, i) => {
                if (o.id === props.index) {
                    arr[i] = { id: o.id, action: currAction, keybind: currSeq };
                    return true; // stop searching
                }
            });
            if (obj){
                props.onBindSave(arr);
            }else{
                props.onBindSave([...props.keybinds, { id: props.index, action: currAction, keybind: currSeq }]);
            }
        }
        
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [checked,handleKeyDown,handleKeyUp,currSeq.length]);


    return (
        <div>
            <label for="actions">Action:</label>
            <select value={currAction} onChange={(event) => handleActionChange(event.target.value)} name="actions">
                <option value="unassigned">Unassigned</option>
                <option value="notify">Toggle Notification Mute</option>
                <option value="back">Navigate Back</option>
            </select>
            
            <label for="keybind">Keybind:</label>
            <input name="keybind" readOnly value={currSeq.join(" + ")} type="text"/>
            <button  type="button" onClick={() => {checked ? console.log(""): updateSeq([]);setChecked(!checked)}} className={checked ? "btn btn-danger":"btn btn-primary"}>Record</button>
            <button  type="button" onClick={() => props.onDelete(props.index)} className={"btn btn-danger"}>🗑️</button>
            <br></br><br></br>
        </div>
    )
}

function Settings(props) {
    let onDelete = (index)=>{
        let nArr = props.keybinds.filter((e) => e.id !== index)
        props.onBindSave(nArr)
    }

    let addKeybind = () => {
        props.onBindSave([...props.keybinds, { id: props.nextkIndex, action: "unassigned", keybind: [] }]);
        props.updateIndex(props.nextkIndex + 1);
    }



    return(
        <div style={{backgroundColor: "#fafafa", height: "10000px"}}>
            <TopBar></TopBar>
            <SideBar messages={props.messages} />
            <div style={{marginLeft: "345px"}}>
                <h3 style={{float: "left"}}>Notifications:</h3> 
                <br></br><br></br>
                <p style={{float: "left"}}>Enable Notifications?</p> <label class="switch" style={{float: "left", marginLeft: "405px"}}><input value={props.notify} checked={props.notify} onChange={()=> props.toggleNotification(!props.notify)}  style={{float: "left"}} type="checkbox"/><span style={{float: "left"}} class="slider round"></span></label>
                <br></br><br></br>
                <hr></hr>
                <h3 style={{float: "left"}}>Keybinds:</h3>  
                <button style={{float: "left", marginLeft: "455px"}} type="button" class="btn btn-success" onClick = {addKeybind}>+</button> 
                <br></br><br></br>
                <div style={{float: "left"}}> {props.keybinds.map(e => <KeybindSetting keybinds={props.keybinds} onDelete={onDelete} onBindSave={props.onBindSave} index={e.id} seq={e.keybind} action={e.action}/>)}</div>
                <br></br><br></br>
                <hr></hr>
            </div>
            
        </div>
    )
}

export default Settings;