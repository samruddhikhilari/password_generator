import React, { useCallback, useEffect, useRef, useState } from 'react'
import "./app.css";

const App = () => {

  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numeric, setNumeric] = useState(false);
  const [character, setcharacter] = useState(false);
  const pwdRef = useRef(null);

  const generatePassword = useCallback(()=>{
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYAabcdefghijklmnopqrstuvwxyz";
    if(numeric){
          str = str + (str + "0123456789"); 
    }
    if(character){
      str = str + ("!@#$%^&*(){}[]:;?,.<>-=_+~`");
    }
    let pass="";
    for(let i=0; i < length; i++){
      let index = Math.floor(Math.random()* str.length +1);
      pass += str.charAt(index);
    }
    setPassword(pass);
  },[length, numeric , character])
  
  useEffect(()=>{
    generatePassword();
  },[length,numeric,character]);

  const copyToClipBoard = () =>{
    window.navigator.clipboard.writeText(password);
    pwdRef.current.select();
  }
  return (
   <>
   <h1 className='text-blue-900 text-center text-2xl uppercase bold mb-2 font-bold'>Password generator</h1>
   <div
   className='w-full h-fit bg-blue-950 text-white rounded-2xl p-3 flex flex-col justify-center items-center'
   >
    <div>
      <input type="text" value={password}  className='text-black bg-white rounded m-2 p-1' onChange={()=>{setPassword(password)}}/>
    <button className='bg-black p-3 m-1 rounded-2xl' onClick={()=> copyToClipBoard()} >Copy</button>
    </div>
    <div>
      <input type="range" value={length} min={6} max={20} onChange={(e)=> setLength(e.target.value)} ref={pwdRef}/>
      <label htmlFor="" className='bg-white text-blue-950 p-2 rounded-2xl m-1'>{length}</label>
      <span className='m-3'>
        <input type="checkbox" checked={numeric} onChange={()=>setNumeric(!numeric) }/>
        <label htmlFor="">Numeric</label>
      </span>
      <span className='m-3'>
        <input type="checkbox" checked={character} onChange={()=>setcharacter(!character)}/>
        <label htmlFor="">Character</label>
      </span>
    </div>
   </div>
   </>
  )
}

export default App
