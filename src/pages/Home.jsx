import React from 'react'
import Card from '../components/card/Card'




const Home = ({ items, searche, onAddToCart, searcheValue, isItemAdded, isLoading, onAddToFavorite }) => {

  const renderItems = () => {
    const filtredItems = items.filter(items =>
      items.title.toLowerCase().includes(searche.toLowerCase())
    );
    return (isLoading ? [...Array(10)] : filtredItems).map((items, index) =>
      <Card
        loading={isLoading}
        key={index}
        onPlus={onAddToCart}
        onFavorite={(obj) => onAddToFavorite(obj)}
        isItemAdded={isItemAdded}
        {...items}
      />)
  }

  return (
    <>
      <div className='contentInfo'>
        <h1>{!searche ? 'Все кросовки' : `Поиск ${searche}`}</h1>
        <div className='contentSearche'>
          <img src="/searche.svg" alt="" />
          <input onChange={searcheValue} value={searche} type="text" placeholder='Поиск...' />
        </div>
      </div>
      <div className='contentWrapper'>
        {renderItems()}
      </div>
    </>
  )
}

export default Home
