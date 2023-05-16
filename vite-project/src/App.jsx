import { useState } from 'react'
import Component from './Component.jsx'
import { useGetByIngridientsQuery } from './services/ingredients.api.js'
import { Loading } from './Loading.jsx'

function App() {
  const [inputText, setInputText] = useState('')
  const [serverRequestText, setServerRequestText] = useState('')


  const { data = [], isFetching, isError } = useGetByIngridientsQuery(serverRequestText, {skip: serverRequestText.length === 0});
  
  return (
    <div id='userRequest' className='w-1/2 block ml-auto mr-auto mt-9'>
      <div>
        <div className="flex flex-row justify-around font-serif text-base mb-9">
          <input 
            type="text" 
            className='border-2 rounded border-solid border-black px-2 py-1.5' 
            value={inputText} 
            onChange={(event) => setInputText(event.target.value)}
          />
          
          <button 
            type="button" 
            onClick={() => setServerRequestText(inputText)} 
            className='bg-lime-400 rounded px-2 py-1.5 hover:bg-teal-500'
          >
            Find recipe
          </button>
      </div>


        <div className="grid grid-cols-4 gap-4 font-serif text-base mb-9">
          {(isFetching) ? <Loading/> : data.map((item) => <Component receipt={item} />)}
        </div>
        
      </div>

    </div>
  )
}

export default App