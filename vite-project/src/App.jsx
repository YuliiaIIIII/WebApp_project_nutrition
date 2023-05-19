import { useState } from 'react'
import Component from './Component.jsx'
import { useGetByIngridientsQuery, useGetByNutrientsQuery } from './services/ingredients.api.js'
import { Loading } from './Loading.jsx'

function category(categorySearch, serverRequestText) {
  const { data: dataIngr = [], isFetching: isFetchingIngr, isError: isErrorIngr } = useGetByIngridientsQuery(serverRequestText, {skip: serverRequestText.length === 0 || categorySearch === 'nutrients'});
  const { data: dataNutr = [], isFetching, isError } = useGetByNutrientsQuery(serverRequestText, {skip: serverRequestText.length === 0 || categorySearch === 'ingridients'});

  return (categorySearch === 'ingridients') ? {data: dataIngr, isFetching: isFetchingIngr, isError: isErrorIngr} : {data: dataNutr, isFetching, isError}
}

function App() {
  const [inputText, setInputText] = useState('')
  const [serverRequestText, setServerRequestText] = useState('')
  const [categorySearch, setCategorySearch] = useState('ingridients');

  const onOptionChange = e => {setCategorySearch(e.target.value)
  }
  const {data, isFetching, isError} = category(categorySearch, serverRequestText);

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
      <div className='w-1/2 flex flex-center ml-auto mr-auto mt-9 mb-8'>
            <input
              type="radio" 
              value="ingridients" 
              id="findByIngridients"
              checked={categorySearch === "ingridients"}
              onChange={onOptionChange}
              name="categorySearch" />
            <label className='mr-8' htmlFor="findByIngridients">Find by ingridients</label>
 
             <input 
              type="radio" 
              value="nutrients" 
              id="findByNutrients"
              checked={categorySearch === "nutrients"}
              onChange={onOptionChange}
              name="categorySearch"/>
             <label htmlFor="findByNutrients">Find by nutrients</label>

       </div>

        <div className="grid grid-cols-4 gap-4 font-serif text-base mb-9">
          {(isFetching) ? <Loading/> : data.map((item) => <Component receipt={item} />)}
        </div>
        
      </div>

        <p>
          Selected: {categorySearch}
        </p>
      </div>

    
  )
}

export default App