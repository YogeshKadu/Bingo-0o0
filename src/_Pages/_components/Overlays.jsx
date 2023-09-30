import React from 'react'

function Overlays(props) {
  return (
    <div className='w-full h-full min-h-screen overflow-hidden flex justify-center items-center bg-slate-700/30 absolute top-0 left-0 z-40'>
        {props.children}
    </div>
  )
}

export default Overlays