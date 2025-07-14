import React from 'react'
import { grid } from 'ldrs'
grid.register()
const Loading = ({ background }) => {
    return (
        <div className={`min-h-screen w-full flex justify-center items-center ${background && 'bg-primary'}`}>
            <l-grid
                size="150"
                speed="1.5"
                color={background ? 'white' : '#77af29'}
            ></l-grid>
        </div>
    )
}

export default Loading
