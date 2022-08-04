import React, { useState , useEffect } from 'react';
import './App.css';

function App() {
  const [walk, setWalk] = useState("");
  const [PosNow, setPosNow] = useState([0, 0]);
  let CoreX = 0;
  let CoreY = 0;
  let Direction = "up";
  let rout = [];
  const Start = (e) => {
    e.preventDefault();
    for (let i = 0; i < walk.length; i++) {
      console.log('walk.length',walk.length);
      if (walk[i] === "W") {
        if (Direction === "up") {
          CoreY++;
          setPosNow([CoreX, CoreY]);
        } else if (Direction === "down") {
          CoreY--;
          setPosNow([CoreX, CoreY]);
        } else if (Direction === "left") {
          CoreX--;
          setPosNow([CoreX, CoreY]);
        } else if (Direction === "right") {
          CoreX++;
          setPosNow([CoreX, CoreY]);
        }
      } else if (walk[i] === "L") {
        if (Direction === "up") {
          Direction = "left";
        } else if (Direction === "left") {
          Direction = "down";
        } else if (Direction === "down") {
          Direction = "right";
        } else if (Direction === "right") {
          Direction = "up";
        }
      } else if (walk[i] === "R") {
        if (Direction === "up") {
          Direction = "right";
        } else if(Direction === "right") {
          Direction = "down";
        } else if(Direction === "down") {
          Direction = "left";
        } else if(Direction === "left"){
            Direction = "up";
        }
      }
      let name = 'pass'
      if (i == walk.length - 1) {
        name = 'end'
      }
      let pos = { name : name, x :CoreX , y : CoreY }
      rout.push(pos);
      
    }
    
    setFinalRout(rout)
    calTableSize(rout);
  };
  
  const [finalRout, setFinalRout] = useState([])

  const [tableSize, setTableSize] = useState(0);
  function calTableSize(rout = []) {
    let max = 0;
    rout.map(item=>{
      max = Math.abs(item.x) >= max ? Math.abs(item.x) : max;
      max = Math.abs(item.y) >= max ? Math.abs(item.y) : max;
    })
    max = (max*2) + 1
    console.log('max',max);
    setTableSize(max)
    return max
  }
  function CreateTable() {
    let start = 0-((tableSize-1)/2);
    console.log('start',start);
    let xAxis = [];
    for (let i = start; i <= (tableSize-1)/2; i++) {
      xAxis.push(i)
    }
    
    let yAxis = [...xAxis].reverse();
    let el = (
      <table className='table-border'>
        {
          yAxis.map(row => {
            return(
              <tr>
                {
                  xAxis.map(col =>{
                    let d = finalRout.find(item => item.x == col && item.y == row);
                    console.log('found = ',d);
                    if(d){
                      return(
                        <td className={`td-size ${d.name}`}></td>
                      )
                      
                    }else{
                      return(
                        <td className={`td-size ${col == 0 && row == 0 ? 'start' : ''}`}></td>
                      )
                    }
                    
                  }
                  )
                }
              </tr>
            )
          })
        }
      </table>
    )
  
    console.log('rout',rout);
    return el;
  }
  return  (
      <div className="App">       
      <div className='header'><b>Robot Walk</b></div>     
        <form onSubmit={Start}>             
      <div><h1>คำสั่ง Robot Walk </h1></div>             
      <input type="text" className="textbox" pattern='[W,R,L]{0,}' title="Only W, R, L" value={walk} onChange={e => setWalk(e.target.value.toUpperCase())} /><br></br><br></br>      
      <input type="submit" className='directionsubmit' value="คำนวณ" />     
        </form>             
      <p className='Pos'>ตำแหน่งปัจจุบัน  ({PosNow[0]} , {PosNow[1]})</p>
      <div className='table-area'>
        {
          CreateTable()
        }
      </div>
      
      <table>

        </table>        
      </div>   
      );
}

export default App
