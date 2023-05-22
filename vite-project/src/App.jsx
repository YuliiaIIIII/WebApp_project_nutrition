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



<header class="bg-orange-200">
  <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
    <div class="flex lg:flex-1">
      <a href="#" class="-m-1.5 p-1.5">
        <span class="sr-only">Your Company</span>
        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
        </img>
        </a>
    </div>
    <div class="flex lg:hidden">
      <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
        <span class="sr-only">Open main menu</span>
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </div>
    <div class="hidden lg:flex lg:gap-x-12">
      <div class="relative">
        <button type="button" class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900" aria-expanded="false">
          Product
          <svg class="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </button>

      
        <div class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">

          
        </div>
      </div>

      <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Features</a>
      <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Marketplace</a>
      <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Company</a>
    </div>

  </nav>

  <div class="lg:hidden" role="dialog" aria-modal="true">

    <div class="fixed inset-0 z-10"></div>
    
  </div>
</header>



      <header className='mb-9' >
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Perfect nutrition</h2>
          </div>

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
      </header>

      <div>
        <div className="flex flex-row justify-around text-base mb-9">
          <input 
            type="text" 
            className='border-2 rounded border-solid border-black px-2 py-1.5'
            value={inputText} 
            onChange={(event) => setInputText(event.target.value)}
          />
          
          <button 
            type="button" 
            onClick={() => setServerRequestText(inputText)} 
            className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-indigo-600'
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