function Component({ receipt, func }) { 

  return (
    <div 
      id='userRequest' 
      className='bg-orange-50 w-10/12 block ml-auto mr-auto rounded border-lime-900 border-2'
      onClick={() => func(receipt.id)}
      >
      <div className = "bg-no-repeat bg-cover">
        <img src={receipt.image} 
        />
      </div>
      
      <p className='bg-indigo-200 mb-2 px-4 py-2'>{receipt.title}</p>

      <div className='flex flex-row text-white justify-around font-semibold text-base'>
				<button className='btn bg-indigo-600 mb-2 rounded px-2 py-1.5 hover:bg-indigo-600'>
					<i className="fa fa-heart"/>
					Add to fav
				</button>  
      </div>
    </div>
  )
}

export default Component