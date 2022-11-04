// 01 - useRef

// import { useEffect, useRef, useState } from "react";

// function App() {
//   const [name, setName] = useState('')
//   // useRef dont cause the update in the component, its similar to state
//   // const renderCount = useRef(0)
//   // { current: 0 }
//   // useEffect(() => {
//     //   renderCount.current = renderCount.current + 1
//     // })
    
//   // useRef is frequently used to store html elements
//   // const inputRef = useRef()
//   // const focus = () => {
//   //   inputRef.current.focus()
//   // }

//   // useRef is also used to store the previous value of your state
//   const prevName = useRef('')
//   useEffect(() => {
//     prevName.current = name
//   }, [name])

//   return (
//     <>
//       <input value={name} onChange={e => setName(e.target.value)}></input> {/*ref={inputRef}*/}
//       <p>My name is {name} and it used to be {prevName.current}</p>
//       {/* <div>I rendered {renderCount.current} times</div> */}
//       {/* <button onClick={focus}>Focus</button> */}
//     </>
//   );
// }

// export default App;

// 02 - useMemo
// import React, { useState, useMemo, useEffect } from 'react'
// export default function App() {
//   const [number, setNumber] = useState(0)
//   const [dark, setDark] = useState(false)
//   // Every time the component update, it runs this function again
//   // useMemo is essentialy the idea of caching the data.
//   // we don't want to use useMemo everywhere because it can slow down our application (too much memory usage, less performance)
//   const doubleNumber = useMemo(() => {
//     return slowFunction(number)
//   }, [number]) // the parameters which, when it updates, render the function again, otherwise it doesn't
//   const themeStyles = useMemo(() => {
//     return {
//       backgroundColor: dark ? 'black' : 'white',
//       color: dark ? 'white' : 'black'
//     }
//   }, [dark])
//   // This object isn't the same as the themeStyles, because each variable has its own reference.
//   // That's the reason why it is called every time the app updates
//   // const themeStyles2 = {
//   //   backgroundColor: dark ? 'black' : 'white',
//   //   color: dark ? 'white' : 'black'
//   // };

//   useEffect(() => {
//     console.log("Theme changed")
//   }, [themeStyles])

//   return (
//     <>
//       <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value))} />
//       <button onClick={() => setDark(prevDark => !prevDark)}>Change Theme</button>
//       <div style={themeStyles}>{doubleNumber}</div>
//     </>
//   )
// }

// function slowFunction(num) {
//   console.log('Calling slow function')
//   for(let i = 0; i <= 100000000; i++) {}
//   return num * 2
// }

// 03 - useCallback
// Just like useMemo, it won't run the function again if the paramaters inside the function didn't change
// import React, { useState, useCallback } from 'react'
// import List from './List'

// export default function App() {
//     const [number, setNumber] = useState(1)
//     const [dark, setDark] = useState(false)

//     const getItems = useCallback((incrementor) => {
//       return [number + incrementor, number + incrementor + 1, number + incrementor + 2]
//     }, [number])

//     const theme = {
//       backgroundColor: dark ? 'black' : 'white',
//       color: dark ? 'white' : 'black'
//     }

//     return (
//       <div style={theme}>
//         <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value))} />
//         {/* Everytime the theme changes, the items are updated. We can fix with useCallback! */}
//         <button onClick={() => setDark(prevDark => !prevDark)}>Change Theme</button>
//         <List getItems={getItems} />
//       </div>
//     )
//   }

// 04 - useReducer
// We can use the useReducer to store the data and update the component once it has changed, just like useState.
// The idea behind to use useReducer is getting you a more complex state, so it gives you set actions to performe on your state to convert your previous state to your new one based on the action you send to it.
// The example below is very simple
// import React, { useState, useReducer } from 'react'

// const ACTIONS = {
//   INCREMENT: 'increment',
//   DECREMENT: 'decrement'
// }

// function reducer(state, action) {
//   switch (action.type) {
//     case ACTIONS.INCREMENT:
//       return { count: state.count + 1 }
//     case ACTIONS.DECREMENT:
//       return { count: state.count - 1 }
//     default: 
//       return state
//   }
// }

// export default function App() {
//   const [state, dispatch] = useReducer(reducer, { count: 0 }) // this is essentialy the same as the line below
//   // const [count, setCount] = useState(0)

//   const increment = () => {
//     dispatch({ type: ACTIONS.INCREMENT })
//     // setCount(prevCount => prevCount + 1)
//   }

//   const decrement = () => {
//     dispatch({ type: ACTIONS.DECREMENT })
//     // setCount(prevCount => prevCount - 1)
//   }

//   return (
//     <>
//       <button onClick={decrement}>-</button>
//       <span>{state.count}</span>
//       <button onClick={increment}>+</button>
//     </>
//   )
// }

// import React, { useState, useReducer } from 'react'
// import Todo from './Todo'

// export const ACTIONS = {
//   ADD_TODO: 'add',
//   TOGGLE_TODO: 'toggle',
//   DELETE_TODO: 'delete'
// }

// function reducer(todos, action) {
//   switch(action.type) {
//     case ACTIONS.ADD_TODO:
//       return [...todos, newTodo(action.payload.name)]
//     case ACTIONS.TOGGLE_TODO:
//       return todos.map(todo => {
//         if(todo.id === action.payload.id) {
//           return { ...todo, complete: !todo.complete }
//         }
//         return todo
//       })
//     case ACTIONS.DELETE_TODO:
//       return todos.filter(todo => todo.id !== action.payload.id)
//     default: 
//       return todos
//   }
// }

// function newTodo(name) {
//   return { id: Date.now(), name, complete: false }
// }

// export default function App() {
//   const [todos, dispatch] = useReducer(reducer, [])
//   const [name, setName] = useState('')

//   function handleSubmit(e) {
//     e.preventDefault()
//     dispatch({ type: ACTIONS.ADD_TODO, payload: { name } })
//     setName('')
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={name} onChange={e => setName(e.target.value)} />
//       </form>
//       {todos.map(todo => {
//         return <Todo key={todo.id} todo={todo} dispatch={dispatch} />
//       })}
//     </>
//   )
// }

// 05 - useTransition
// Helps the performance of the app when we have multiple things going on
// When we have to change more than one state at once, at first we need to know what's the main action that should be triggered when something happens. (Example below: First we need to change the input value (most important), then render a large list).
// By default when a component renders, everything have a high priority, so nothing is rendered until everything is complete.

// import { useState, useTransition } from 'react'
// export default function App() {
//   const [isPending, startTransition] = useTransition()
//   const [input, setInput] = useState('')
//   const [list, setList] = useState([])

//   const LIST_SIZE = 2000

//   const handleChange = e => {
//     setInput(e.target.value)
//     startTransition(() => {
//       const l = []
//       for(let i = 0; i < LIST_SIZE; i++) {
//         l.push(e.target.value)
//       }
//       setList(l)
//     })
//   }

//   return (
//     <>
//       <input type="text" value={input} onChange={handleChange} />
//       {
//         !isPending ? list.map((item, index) => {
//           return <div key={index}>{item}</div>
//         }) : <span>Loading..</span>
//       }
//     </>
//   )
// }

// 06 - useDeferredValue
import { useState } from 'react'
import List from './List'

export default function App() {
  const [input, setInput] = useState('')
  const handleChange = e => {
    setInput(e.target.value)
  }

  return (
    <>
      <input type="text" value={input} onChange={handleChange} />
      <List input={input} />
    </>
  )
}