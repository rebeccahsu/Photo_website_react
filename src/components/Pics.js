import React from 'react'

const Pics = ({ data }) => {
  return (
    <div className='pic'>
        <div className="imgContainer">
            <a target="_blank" href={data.src.large}><img src={data.src.large} alt={data.alt} /></a>
        </div>
        <p className='photographer'>Credit
          <span>{data.photographer}</span>
        </p>
        {/* <p>Download Image: 
            <a target="_blank" href={data.src.large}>Click Here</a>
        </p> */}
    </div>
  )
}

export default Pics;