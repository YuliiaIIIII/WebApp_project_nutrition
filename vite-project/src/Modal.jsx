import { useGetRecipesInformationQuery } from './services/ingredients.api'

function Modal({changeActive, recipeIdRequest}){
  const {data, isFetching, isError} = useGetRecipesInformationQuery(recipeIdRequest);
  
  return(
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6 text-center">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
              <div className="bg-indigo-100 px-4 pb-4 pt-5">
                <div className="mt-3 text-center">
                  <div className="border border-white text-center bg-indigo-200">
                    <h3 className="text-2xl p-5 font-semibold leading-6 text-indigo-900" id="modal-title">
                      {data?.title}
                    </h3>
                  </div>

                  <div className="mt-2 flex sm:flex-col w-full xlg:flex xlg:flex-row">
                    <div className='md:flex md:justify-center xlg:w-1/2'>
                      <img 
                        className="border border-white w-full md:w-3/4 lg:w-full"
                        src={data?.image} 
                        alt="img" 
                      />    
                    </div>
                    <div className='xlg:w-1/2'>
                      <p className="text-xl font-semibold text-gray-600 w-full px-8 text-center decoration-gray-700 underline sm:mt-3 md:text-2xl">
                        List of indredients:
                      </p>
                      <ul className="text-lg font-normal text-gray-500 w-full px-8 py-4 text-center md:text-xl">
                       {(data?.extendedIngredients) ? data.extendedIngredients.map((element) => <li key={element.id}>{element.original}</li> ): null}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-indigo-200 px-4 py-3">
                <button 
                  type="button" 
                  className="mt-3 inline-flex w-full justify-center border border-1 border-indigo-600 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-500 hover:text-white"
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