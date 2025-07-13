import React from 'react'
import { grid } from 'ldrs'
grid.register()
const Loading = () => {
    return (
        <div className='min-h-screen w-full flex justify-center items-center'>
            <l-grid
                size="150"
                speed="1.5"
                color="#77af29"
            ></l-grid>
        </div>
    )
}

export default Loading
