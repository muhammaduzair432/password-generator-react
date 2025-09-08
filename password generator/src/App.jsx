import {  useState ,useEffect ,useCallback,useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [charc, setCharac] = useState(false);
  const [password, setPassword] = useState("");
  const passwordref = useRef(null);

  const passwordGenerator= useCallback(()=>{
  let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if (numbers) str += "0123456789";
  if (charc) str += "!@#$%^&*()_+[]{}|;:,.<>?";
  for (let i = 1; i <= length; i++) {
    let char = Math.floor(Math.random() * str.length + 1);
    pass += str.charAt(char);
  }
  setPassword(pass);
}, [length, numbers, charc, setPassword]);
 const copypassword = useCallback ( ()=> { 
  passwordref.current?.select();
  passwordref.current?.setSelectionRange(8, 32);
  window.navigator.clipboard.writeText(password)
}, [password]);


  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, charc, passwordGenerator]);


  return (
    <>
      <div className="box">
        <span id="text">password generator</span>
        <div id="password-container">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="password"
            id="password"
            ref={passwordref}
          />
          <button id="copy"  onClick={copypassword}>copy</button>
        </div>
        <div id="range-container">
          {" "}
          <input
            type="range"
            min={8}
            max={32}
            value={length}
            id="rangebar"
            onChange={(e) => setLength(e.target.value)}
          />
          length: {length}
        </div>
          <div id="checkbox1">
        <input
          type="checkbox"
          defaultChecked={numbers}
         onChange={() => setNumbers(prev => !prev)}

        />
        Include Numbers
      </div>
      <div id="checkbox2">
        <input
          type="checkbox"
          defaultChecked={charc}
          onChange={() => setCharac(prev => !prev)}
        />
        Include Characters
      </div>
      </div>
    
    </>
  );
}

export default App;
