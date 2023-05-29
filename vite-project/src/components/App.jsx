import { useState } from 'react'
import Component from './Component.jsx'
import { useGetByIngridientsQuery, useGetByNutrientsQuery } from '../services/ingredients.api.js'
import Loading from './Loading.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
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
    <div id='userRequest' className='w-full'>
      <Header />
      <div className="w-full block ml-auto mr-auto mb-9">
        <div className='w-full bg-gradient-to-b from-blue-300 to-orange-100 border-t-2 border-orange-100'>
          <div className="pt-9 sm:p-3 flex flex-row justify-center text-base sm:mb-1 sm:flex-col sm:w-4/5 sm:mx-auto sm:text-center sm:text-sm md:w-3/5 lg:pt-9 xlg:pt-9">
            <p className='p-3 rounded-md shadow-md bg-white/60 sm:mb-3 sm:text-base md:text-base md:text-justify lg:bg-white/40 xlg:text-2xl xlg:font-medium xlg:mb-9 indent-8'>
              Here you can find recipes by ingredients or by nutrients. Just type a general ingridients or a nutrition score. Choose a suitable option and click the button "Find a recipe"
            </p>
            <input 
              type="text" 
              className='hover:ring-offset-2 hover:ring hover:ring-indigo-300 hover:border-none border border-1 rounded-l-md sm:rounded-md border-solid border-blue-800 px-2 py-1.5 hover:border-blue-500 sm:mb-3 sm:text-center xlg:w-1/2 xlg:text-2xl xlg:mx-auto xlg:mb-9'
              placeholder="What are you looking for?"
              value={inputText} 
              onChange={(event) => setInputText(event.target.value)}
            />
            <div>
              <div className='lg:bg-white/40 shadow-md lg:w-full lg:rounded-md lg:mx-auto xlg:mb-9'>
                <div className="flex flex-row justify-center text-base mb-3">
                  <p className="p-1 sm:w-4/5 sm:text-base sm:font-normal sm:mx-auto sm:text-center md:w-full xlg:font-medium xlg:text-2xl">How do you prefer to find a recipe?</p>
                </div>
                <div className="flex flex-row justify-center text-base mb-9 pb-6 sm:justify-around sm:mb-6 sm:w-full sm:mx-auto sm:text-sm md:w-3/5 lg:w-4/5 md:justify-between lg:justify-around">
                  <div className='p-2 bg-white/60 shadow-md sm:border sm:rounded-md sm:w-2/5 sm:text-center hover:scale-105 hover:bg-sky-100 lg:bg-transparent lg:w-2/5 lg:bg-blue-200 xlg:bg-sky-100 xlg:font-medium xlg:text-xl outline outline-offset-1 outline-indigo-200'>
                    <input
                      type="radio" 
                      value="ingridients" 
                      id="findByIngridients"
                      className='accent-indigo-500'
                      checked={categorySearch === "ingridients"}
                      onChange={onOptionChange}
                      name="categorySearch" />
                    <label 
                      className='mr-8 ml-2 sm:mr-0' 
                      htmlFor="findByIngridients">
                      Search by ingridients
                    </label>
                  </div>
                  <div className='p-2 bg-white/60 shadow-md sm:border sm:rounded-md sm:w-2/5 sm:text-center hover:scale-105 hover:bg-sky-100 lg:bg-transparent lg:w-2/5 lg:bg-blue-200 xlg:bg-sky-100 xlg:font-medium xlg:text-xl outline outline-offset-1 outline-indigo-200'>
                    <input 
                      type="radio" 
                      value="nutrients" 
                      id="findByNutrients"
                      className='accent-indigo-500'
                      checked={categorySearch === "nutrients"}
                      onChange={onOptionChange}
                      name="categorySearch"/>
                    <label 
                      className='ml-2' 
                      htmlFor="findByNutrients">
                      Search by nutrients
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='pb-6 lg:pb-9 xlg:pb-9'>
            <button 
                type="button" 
                onClick={() => setServerRequestText(inputText)} 
                className='inline-flex shadow-md items-center rounded-r-md rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-indigo-400 sm:flex sm:mx-auto md:w-3/5 md:justify-center md:w-1/5 xlg:text-2xl xlg:w-1/5 outline outline-offset-1 outline-white hover:underline'
              >
                Find a recipe
            </button>
          </div>
        </div>
        
        <div 
        className="bg-[url('./img/background.png')] bg-contain border-b-2 border-white  grid grid-cols-4 gap-x-6 gap-y-8 text-base py-4 px-3 cursor-pointer sm:grid-cols-1 sm:bg-orange-100 lg:grid-cols-2 lg:gap-x-0 xlg:grid-cols-4 lg:py-8 xlg:py-8"
        >
          {(isFetching) ? <Loading /> : data.map((item) => (<div key={item.id}><Component receipt={item} func={chooseReceipt} /> </div>))}
        </div>
        <Footer />
      </div>
      {(modalActive) ? <Modal changeActive={changeActive} recipeIdRequest={currentModalId} /> : null}
    </div>
  )
}

export default App