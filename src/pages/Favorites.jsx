import React from 'react'
import Card from '../components/card/Card'
import AppContext from '../context'

const Favorites = () => {
    const { favoriteItems, onAddToFavorite, onAddToCart } = React.useContext(AppContext)


    return (
        <>
            <div className='contentInfo'>
                <h1>{favoriteItems.length > 0 ? 'Мои закладки' : 'У вас еще нету закладок'}</h1>
            </div>
            <div className='contentWrapper'>
                {favoriteItems.map((items, index) => <Card
                    key={index}
                    onFavorite={onAddToFavorite}
                    favorited={true}

                    {...items}
                />)}
            </div>
        </>
    )
}

export default Favorites
