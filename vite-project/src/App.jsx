import { useState } from 'react'
import Component from './Component.jsx'
import { useGetByIngridientsQuery, useGetByNutrientsQuery } from './services/ingredients.api.js'
import { Loading } from './Loading.jsx'
import Modal from './Modal.jsx'

function category(categorySearch, serverRequestText) {
  const { data: dataIngr = [], isFetching: isFetchingIngr, isError: isErrorIngr } = useGetByIngridientsQuery(serverRequestText, {skip: serverRequestText.length === 0 || categorySearch === 'nutrients'});
  const { data: dataNutr = [], isFetching, isError } = useGetByNutrientsQuery(serverRequestText, {skip: serverRequestText.length === 0 || categorySearch === 'ingridients'});

  return (categorySearch === 'ingridients') ? {data: dataIngr, isFetching: isFetchingIngr, isError: isErrorIngr} : {data: dataNutr, isFetching, isError}

}

function App() {
  const [inputText, setInputText] = useState('')
  const [serverRequestText, setServerRequestText] = useState('')
  const [categorySearch, setCategorySearch] = useState('ingridients');
  const [modalActive, setModalActive] = useState(false);

  const onOptionChange = e => {setCategorySearch(e.target.value)}
  const {data, isFetching, isError} = category(categorySearch, serverRequestText);

  const changeActive = () => setModalActive(false);
  
  return (
    <div id='userRequest' className='w-4/5 block ml-auto mr-auto mt-9'>



<header className="bg-orange-200">
  <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
    <div className="flex lg:flex-1">
      <a href="#" className="-m-1.5 p-1.5">
        <span className="sr-only">Your Company</span>
        <img className="h-8 w-auto mr-5" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
        </img>
        </a>
        <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Perfect nutrition</h2>
          </div>
    </div>

    <div className="hidden lg:flex lg:gap-x-12">

      <div className="mt-5 flex lg:ml-4 lg:mt-0">
            <button 
              type="button" 
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-indigo-600">
                <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              Favourite
            </button>
          </div>
    </div>

  </nav>

</header>



      <header className='mb-9' >
        <div className="lg:flex lg:items-center lg:justify-between">

        </div>
      </header>

      <div>
        <div className="flex flex-row justify-center text-base mb-9">
          <input 
            type="text" 
            className='border border-1 rounded-l-md border-solid border-blue-800 px-2 py-1.5'
            placeholder="What are you looking for?"
            value={inputText} 
            onChange={(event) => setInputText(event.target.value)}
          />
          
          <button 
            type="button" 
            onClick={() => setServerRequestText(inputText)} 
            className='inline-flex items-center rounded-r-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-indigo-600'
          >
            Find recipe
          </button>
        </div>

        <div className='w-1/2 flex justify-center ml-auto mr-auto mt-9 mb-8'>
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
        <button 
          type="button" 
          className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-indigo-600'
          onClick={() => setModalActive(true)}
        >
          Close
        </button>
        <div className="grid grid-cols-4 gap-4 text-base mb-9">
          {(isFetching) ? <Loading/> : data.map((item) => <Component receipt={item} />)}
        </div>
      </div>
      {(modalActive) ? <Modal changeActive={changeActive} /> : null}
    </div>
  )
}

export default App