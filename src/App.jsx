import React from "react";
import Drawer from "./components/Drawer";
import axios from 'axios'

import Header from "./components/header/Header";
import Home from "./pages/Home";
import { Route } from "react-router-dom";
import Favorites from "./pages/Favorites";
import AppContext from './context'
import Orders from "./pages/Orders";

function App() {

  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favoriteItems, setFavotiteItems] = React.useState([])
  const [cartVisivble, setCartVisable] = React.useState(false)

  const [searche, setSearche] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(true)
  React.useEffect(() => {
    async function fetchData() {
      try {
        const itemsResponse = await axios.get('https://614fbf57a706cd00179b72f1.mockapi.io/items')
        const cartResponse = await axios.get('https://614fbf57a706cd00179b72f1.mockapi.io/cart')
        const favoriteReasponse = await axios.get('https://614fbf57a706cd00179b72f1.mockapi.io/favorites')
        setIsLoading(false)
        setItems(itemsResponse.data)
        setCartItems(cartResponse.data)
        setFavotiteItems(favoriteReasponse.data)


      } catch (error) {
        alert('Ошибка при запросе')
      }
    }

    fetchData()

  }, [])
  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://614fbf57a706cd00179b72f1.mockapi.io/cart/${findItem.id}`)
      } else {

        const { data } = await axios.post('https://614fbf57a706cd00179b72f1.mockapi.io/cart', obj)
        setCartItems((prev) => [...prev, data])

      }
    } catch (error) {
      alert('Ошибка с добавлением в корозину')
    }



  }
  
  const onAddToFavorite = async (obj) => {
    try {
      console.log(obj)
      if (favoriteItems.find((favObj) => Number(favObj.id) === Number(obj.id))) {
       axios.delete(`https://614fbf57a706cd00179b72f1.mockapi.io/favorites/${obj.id}`)
        setFavotiteItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      } else {
        const { data } = await axios.post('https://614fbf57a706cd00179b72f1.mockapi.io/favorites', obj)
        setFavotiteItems((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалость добавить в избранное')
    }
  }

  const searcheValue = (e) => {
    setSearche(e.currentTarget.value)
  }


  const onCartItemRemove = async (id) => {
    try {

      await axios.delete(`https://614fbf57a706cd00179b72f1.mockapi.io/cart/${id}`)
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert('Ошибка при удаление')
    }

  }
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };


  return (
    <AppContext.Provider value={{
      cartItems,
      setCartItems,
      onAddToFavorite,
      favoriteItems,
      isItemAdded,
      onAddToCart
    }}>
      <div className='wrapper'>
        {cartVisivble && <Drawer
          visable={setCartVisable}
          items={cartItems}
          setCartVisable={setCartVisable}

          onCartItemRemove={onCartItemRemove} />}


        <Header setCartVisable={setCartVisable} />
        <div className='content'>

          <Route path='/' exact>
            <Home searche={searche}
              items={items}
              searcheValue={searcheValue}
              onAddToCart={onAddToCart}
              isItemAdded={isItemAdded}
              isLoading={isLoading}
              onAddToFavorite={onAddToFavorite}
            />
          </Route>
          <Route path='/favorites' exact component={Favorites} />
          <Route path='/orders' exact component={Orders}/> 
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
