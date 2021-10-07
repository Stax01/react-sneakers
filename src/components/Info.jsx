import React from 'react'

const Info = ({title, desc, image}) => {
    return (
        <div className='drawerClear'>
            <img height={120} width={120} src={image} alt="clear" />
            <h3>{title}</h3>
            <p>{desc}</p>
           
        </div>
    )
}

export default Info
