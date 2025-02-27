import React from 'react'

const SearchFilters = () => {
  return (
    <div className='d-flex my-2 py-2 px-3 flex-wrap gap-3 align-items-center' style={{borderBottom: '2px solid rgb(153, 173, 202)',backgroundColor:'rgb(240, 245, 255)', borderRadius:'.4rem'}}>
        <div className="d-flex flex-wrap gap-3 flex-grow-1">
            <span className='me-2 my-1' style={{color:'rgb(69, 69, 69)'}}> Search results for :</span>
        </div>
    </div>
  )
}

export default SearchFilters