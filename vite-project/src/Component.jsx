function Component({ receipt }) { 
  return (
    <div id='userRequest' className='bg-orange-50 w-10/12 block ml-auto mr-auto rounded border-lime-900 border-2'>
      <div className = "bg-no-repeat bg-cover">
        <img src={receipt.image} />
      </div>
      
      <p className='bg-lime-100 mb-2 px-4 py-2'>{receipt.title}</p>

      <div className='flex flex-row justify-around font-serif text-base'>
				<button className='btn bg-lime-500 mb-2 rounded px-2 py-1.5 hover:bg-lime-600'>
					<i className="fa fa-heart"/>
					Add to fav
				</button>  
      </div>
    </div>
  )
}

export default Component