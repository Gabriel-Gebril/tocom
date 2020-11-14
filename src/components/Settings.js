import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

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
        
        </div>
    )
}

function Settings(props) {
    return(
        <div>
            {props.keybinds.map(e => <KeybindSetting keybinds={props.keybinds} onBindSave={props.onBindSave} index={e.id} seq={e.keybind} action={e.action}/>)}
        </div>
    )
}

export default Settings;