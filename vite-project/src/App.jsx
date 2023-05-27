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
  // const [modalActive, setModalActive] = useState(true);

  const [currentModalId, setCurrentModalId] = useState('');

  const onOptionChange = e => {setCategorySearch(e.target.value)}
  const {data, isFetching, isError} = category(categorySearch, serverRequestText);

  const changeActive = () => {
    setModalActive(false);
    setCurrentModalId('');
  }

  const chooseReceipt = (id) => {
    setModalActive(true);
    setCurrentModalId(id);
  }
  
  return (
    <div id='userRequest' className='w-full block ml-auto mr-auto bg-gradient-to-b from-blue-400 to-blue-100'>
      <header className="bg-gradient-to-t from-indigo-500 to-indigo-200">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6" aria-label="Global">
          <div className="flex">
            <a href="#" className="-m-1.5 p-1.5">
              <img className="h-8 w-auto mr-5" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
              </img>
              </a>
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900">Perfect nutrition</h2>
              </div>
          </div>
        </nav>
      </header>

      <div className='mt-9 sm:mt-6 '>
        <div className="flex flex-row justify-center text-base mb-9 sm:mb-1 sm:flex-col sm:w-4/5 sm:mx-auto sm:text-center sm:text-sm md:w-3/5">
          <p className='p-3 rounded-md shadow-md bg-white/60 sm:mb-3 sm:text-base md:text-base md:text-justify lg:bg-white/40 xlg:text-2xl xlg:font-normal'>
            Here you can find receipts by ingredients or by nutrients. Just type a general ingridients or a nutrition score. Choose a suitable option and click the button "Find receipt"
          </p>
          <input 
            type="text" 
            className='border border-1 rounded-l-md sm:rounded-md border-solid border-blue-800 px-2 py-1.5 hover:border-blue-500 sm:mb-3 sm:text-center xlg:text-2xl'
            placeholder="What are you looking for?"
            value={inputText} 
            onChange={(event) => setInputText(event.target.value)}
          />
        </div>

        <div>
          <div className='lg:bg-white/40 shadow-md lg:w-3/5 lg:rounded-md lg:mx-auto'>
            <div className="flex flex-row justify-center text-base mb-3">
            <div>
              <p className="p-1 sm:w-4/5 sm:text-base sm:font-normal sm:mx-auto sm:text-center md:w-full xlg:font-medium xlg:text-2xl">How do you prefer to find a receipt?</p>
            </div>
          </div>
          <div className="flex flex-row justify-center text-base mb-9 pb-6 sm:justify-around sm:mb-6 sm:w-full sm:mx-auto sm:text-sm md:w-3/5 lg:w-4/5 md:justify-between lg:justify-around">
              <div className='p-2 bg-white/60 shadow sm:border sm:rounded-md sm:w-2/5 sm:text-center hover:scale-105 hover:bg-sky-100 lg:bg-transparent lg:w-2/5 lg:border-blue-600 lg:bg-blue-200 xlg:bg-sky-100
              xlg:font-medium xlg:text-xl'>
                <input
                  type="radio" 
                  value="ingridients" 
                  id="findByIngridients"
                  className='accent-indigo-500'
                  checked={categorySearch === "ingridients"}
                  onChange={onOptionChange}
                  name="categorySearch" />
                <label className='mr-8 ml-2 sm:mr-0' htmlFor="findByIngridients">
                  Search by ingridients
                </label>
              </div>
              <div className='p-2 bg-white/60 shadow sm:border sm:rounded-md sm:w-2/5 sm:text-center hover:scale-105 hover:bg-sky-100 lg:bg-transparent lg:w-2/5 lg:border-blue-600 lg:bg-blue-200 xlg:bg-sky-100 xlg:font-medium xlg:text-xl'>
                <input 
                  type="radio" 
                  value="nutrients" 
                  id="findByNutrients"
                  className='accent-indigo-500'
                  checked={categorySearch === "nutrients"}
                  onChange={onOptionChange}
                  name="categorySearch"/>
                <label className='ml-2' htmlFor="findByNutrients">
                  Search by nutrients
                </label>
              </div>
            </div>
          </div>
        
          <button 
            type="button" 
            onClick={() => setServerRequestText(inputText)} 
            className='inline-flex shadow-md items-center rounded-r-md rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-indigo-400 sm:flex sm:mx-auto md:w-3/5 md:justify-center xlg:text-2xl'
          >
            Find a receipt
          </button>
          <div 
          className="grid grid-cols-4 gap-x-6 gap-y-8 text-base py-4 px-3 mt-6 cursor-pointer sm:grid-cols-1 sm:bg-orange-100 lg:grid-cols-2 lg:gap-x-0 xlg:grid-cols-4"
        >
          {(isFetching) ? <Loading/> : data.map((item) => <Component receipt={item} func={chooseReceipt} />)} 
        </div>
        </div>

        <footer className="bg-gradient-to-t from-indigo-200 to-indigo-500 text-center">
          <div className='flex justify-center '>
            <div className='mt-3'>
              <a className='p-1 font-semibold underline xlg:text-xl'>
                Contacts
              </a>
            </div>
            <div className='mt-3'>
              <a className='p-1 font-semibold underline xlg:text-xl'>
                About
              </a>
            </div>
          </div>
          <div>
            <p className='p-1 font-normal text-sm xlg:text-base'>
              Perfect nutrition 2023
            </p>
          </div>
        </footer>
      </div>
      {(modalActive) ? <Modal changeActive={changeActive} recipeIdRequest={currentModalId} /> : null}
    </div>
  )
}

export default App