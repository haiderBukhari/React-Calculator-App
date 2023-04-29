import React, { useCallback, useEffect, useState } from 'react'
import "./App.css"

const App = () => {
  let [detail, setdetail] = useState('');
  let [show, setshow] = useState('');
  let [backspace, setbackspace] = useState('');
  let [counter, setcounter] = useState(0);
  let [counter1, setcounter1] = useState(0);
  let [answer, setanswer] = useState(0);
  let [display, setdisplay] = useState("");
  let handlebrightness = ()=>{
    setcounter1(counter1+1);
    if(counter1%2!=0){
      document.querySelector(".ee").classList.add('bi-brightness-low-fill');
      document.querySelector(".ee").classList.remove('bi-brightness-high');
      document.querySelector('body').classList.add('bright')
    }
    else{
      document.querySelector('body').classList.remove('bright')
      document.querySelector(".ee").classList.remove('bi-brightness-low-fill');
      document.querySelector(".ee").classList.add('bi-brightness-high');
    }
  }
  let handle_backspace = () =>{
    let words = detail.split(/(\+|\-|\*|\/|\.|\log|[1-9])/);
    words = words.filter((arr)=>arr!='');
    let lastWord = words[words.length - 1];
    setdetail(detail.slice(0, -lastWord.length));
    setbackspace(detail);
    console.log(lastWord);
    words = display.split(/(\+|\-|\*|\/|\.|\log|[1-9])/);
    words = words.filter((arr)=>arr!='');
    lastWord = words[words.length - 1];
    console.log(lastWord);
    setdisplay(display.slice(0,-1));
  }
  useEffect(()=>{
    if(counter%2!=0){
      document.querySelector('.remove').classList.remove('bi-arrow-bar-down');
      document.querySelector('.remove').classList.add('bi-arrow-bar-up');
      document.querySelector('.bottom-screen').classList.add('hidden')
      document.querySelector('.aside').classList.remove('show_it')
    }
    else{
      document.querySelector('.remove').classList.add('bi-arrow-bar-down');
      document.querySelector('.remove').classList.remove('bi-arrow-bar-up');
      document.querySelector('.bottom-screen').classList.remove('hidden')
      document.querySelector('.aside').classList.add('show_it')
    }
  }, [counter])
  let add_detail = (add) =>{
    let check = false;
    if(add==="sin" || add==="cos" || add==="tan"){
      setdisplay(display+`${add}`);
      add = `Math.${add}`;
      check = true;
    }
    if(add==="log"){
      setdisplay(display+"log");
      add = `Math.log10`;
      check = true;
    }
    if(add==="ln"){
      setdisplay(display+"ln");
      add = `Math.log`;
      check = true;
    }
    if(add==="PI"){
      setdisplay(display+`π`);
      add = `Math.${add}`;
      check = true;
    }
    if(add==="sqroot"){
      setdisplay(display+`√`);
      add = `Math.sqrt`;
      check = true;
    }
    if(add==="powers" || add==="onlypower"){
      setdisplay(display+`^`);
      add = `**`;
      check = true;
    }
    if(add==="E"){
      setdisplay(display+`exp`);
      add = `Math.E`;
      check = true;
    }
    if(add=="powerexp"){
      setdisplay(display+"e^");
      add="Math.E**";
      check = true;
    }
    if(add=="CLEAR"){
      setdetail("");
      setbackspace("");
      setdisplay("");
      return;
    }
    if(add=="Ans"){
      let ans = answer;
      setdetail(detail+ans);
      setbackspace(detail+ans);
      setdisplay(display+ans);
      return;
    }
    if(add=="EQUAL"){
      try{
        setshow(eval(detail));
        setanswer(eval(detail));
        return;
      }
      catch(error){
        document.querySelector('.show').textContent = "Poor Response Invalid Syntax";
        console.log("Error evaluating detail:", error);
      }
    }
    else{
      if(check){
        setdetail(detail+add);
        setbackspace(detail+add);
        check = false;
      }
      else{
        setdisplay(display+add);
        setdetail(detail+add);
        setbackspace(detail+add);
        check = false;
      }
    }
  }
  return (
    <div className='container'>
      <div className='main'>
          <p className='brightness'><i class="bi bi-brightness-high ee" onClick={handlebrightness}></i></p>
            <p className='btn-hide' onClick={()=>setcounter(counter+1)}><i class="bi bi-arrow-bar-down bi--4xl remove"></i></p>
        <div className='cal-body'>
          <div className='main-screen'>
            <p className='details'>{display}</p>
            <p className='show'>{show}</p>
          </div>
          <div className="bottom-screen">
            <ul>
              <li onClick={()=>{add_detail('CLEAR')}}>C</li>
              <li onClick={()=>{add_detail('Ans')}}>Ans</li>
              <li onClick={handle_backspace}><i class="bi bi-backspace"></i></li>
              <li onClick={()=>{add_detail('/')}}>÷</li>
            </ul>
            <ul>
              <li onClick={()=>{add_detail('7')}}>7</li>
              <li onClick={()=>{add_detail('8')}}>8</li>
              <li onClick={()=>{add_detail('9')}}>9</li>
              <li onClick={()=>{add_detail('*')}}>X</li>
            </ul>
            <ul>
              <li onClick={()=>{add_detail('4')}}>4</li>
              <li onClick={()=>{add_detail('5')}}>5</li>
              <li onClick={()=>{add_detail('6')}}>6</li>
              <li onClick={()=>{add_detail('-')}}>-</li>
            </ul>
            <ul>
              <li onClick={()=>{add_detail('1')}}>1</li>
              <li onClick={()=>{add_detail('2')}}>2</li>
              <li onClick={()=>{add_detail('3')}}>3</li>
              <li onClick={()=>{add_detail('+')}}>+</li>
            </ul>
            <ul>
              <li className='zero' onClick={()=>{add_detail('0')}}>O</li>
              <li className='dot' onClick={()=>{add_detail('.')}}>.</li>
              <li className='equal make' onClick={()=>{add_detail('EQUAL')}}>=</li>
            </ul>
          </div>
        </div>
        <div className='aside show_it'>
            <div className='left_part'>
              <div className='element'>
                <ul>
                  <li onClick={()=>add_detail('sin')}>sin</li>
                  <li onClick={()=>add_detail('cos')}>cos</li>
                  <li onClick={()=>add_detail('tan')}>tan</li>
                  <li onClick={()=>add_detail('log')} className='exp-color3'>log</li>
                </ul>
                <ul>
                  <li onClick={()=>add_detail('PI')}>π</li>
                  <li onClick={()=>add_detail('E')}>e</li>
                  <li onClick={()=>add_detail('powerexp')}>e<sup>x</sup></li>
                  <li onClick={()=>add_detail('ln')} className='exp-color2'>ln</li>
                </ul>
                <ul>
                  <li onClick={()=>add_detail('1/')}>1/<sub>x</sub></li>
                  <li onClick={()=>add_detail('powers')}>^</li>
                  <li onClick={()=>add_detail('onlypower')}>x<sup>1</sup></li>
                  <li onClick={()=>add_detail('sqroot')} className='exp-color1'>√</li>
                </ul>
                <ul>
                  <li onClick={()=>add_detail('(')}>(</li>
                  <li onClick={()=>add_detail(')')}>)</li>
                  <li onClick={()=>add_detail('%')}>%</li>
                  <li onClick={()=>add_detail('E')} className='exp-color'>Exp</li>
                </ul>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default App