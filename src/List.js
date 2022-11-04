// 03 - useCallback
// import React, { useEffect, useState } from 'react'

// export default function List({ getItems }) {
//   const [items, setItems] = useState([])

//   useEffect(() => {
//     setItems(getItems(5))
//     console.log('Updating Items')
//   }, [getItems])

//   return items.map(item => <div key={item}>#{item}</div>)
// }

// 06 - useDeferredValue
import { useMemo, useDeferredValue, useEffect } from 'react'
export default function List({ input }) {
  const LIST_SIZE = 20000
  const deferredInput = useDeferredValue(input) // just as like throttling/debounce functions.
  const list = useMemo(() => {
    const l = []
    for(let i = 0; i < LIST_SIZE; i++) {
      l.push(<div key={i}>{deferredInput}</div>)
    }
    return l
  }, [deferredInput])

  useEffect(() => {
    console.log(`Input: ${input}  |   Deferred Input: ${deferredInput}`)
  }, [input, deferredInput])

  return list
}