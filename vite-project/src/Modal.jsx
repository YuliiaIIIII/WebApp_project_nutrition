import { useState } from 'react'
import { useGetRecipesInformationQuery } from './services/ingredients.api.js'

function Modal({changeActive, recipeIdRequest}){
  const {data, isFetching, isError} = useGetRecipesInformationQuery(recipeIdRequest);
  console.log(data)
  
  return(
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm: max-w-5xl">
            <div className="bg-indigo-100 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">

                <div className="mt-3 text-center sm:ml-4 sm:text-left">
                  <div className="border border-white text-center bg-indigo-200 decoration-indigo-800 underline">
                    <h3 className="text-2xl p-5 font-semibold leading-6 text-indigo-900" id="modal-title">
                    {data?.title}
                    </h3>
                  </div>

                  <div className="mt-2 flex w-full">
                    <div>
                      <img 
                        className="border border-white w-full"
                        src={data?.image} 
                        alt="img" />    
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 w-full p-8">
                        List of indredients:
                        {(data?.extendedIngredients) ? data.extendedIngredients.map((element) => <p key={element.id}>{element.original}</p> ): null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-indigo-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button" className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto">Add to fav</button>
              <button 
                type="button" 
                className="mt-3 inline-flex w-full justify-center border border-1 border-indigo-600 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => changeActive()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;