import axios from 'axios'
import React from 'react'
import AppContext from '../context'

import Info from './Info'


const Drawer = ({ setCartVisable, items = [], onCartItemRemove }) => {
    const { setCartItems, cartItems } = React.useContext(AppContext)
    const [loading, setLoading] = React.useState(false)
    const [orderId, setOrderId] = React.useState(null)
    const [isOrderCompleted, setIsOrderCompleted] = React.useState(false)
    const totalPrice = items.reduce((sum, obj) => obj.price + sum, 0)

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    console.log(cartItems)
    const onClickOreder = async () => {
        try {
            setLoading(true)
            const { data } = await axios.post('https://614fbf57a706cd00179b72f1.mockapi.io/orders', {
                items: cartItems
            })
            setOrderId(data.id)
            setIsOrderCompleted(true)
            setCartItems([])
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];

                await axios.delete('https://614fbf57a706cd00179b72f1.mockapi.io/cart/' + item.id)
                await delay(1000)
            }

        } catch (error) {
            alert('Не удалость совершить покупку')
        }
        setLoading(false)
    }
    
    return (
        <div className='overlay' >
            <div className="drawer">
                <div className='drawerTop'>
                    <h3>Корзина</h3>
                    <img onClick={() => setCartVisable(false)} src="/btnRemove.svg" alt="" />
                </div>
                {items.length > 0 ? (
                    <>
                        <div className="itemsCard">
                            {items.map((item, index) =>
                                <div key={index} className="itemCard">
                                    <img height={70} width={70} src={item.imageUrl} alt="" />
                                    <div className="itemCardInfo">
                                        <p>{item.title}</p>
                                        <b>{item.price} руб.</b>
                                    </div>
                                    <img onClick={() => onCartItemRemove(item.id)} src="/btnRemove.svg" alt="" />
                                </div>)}

                        </div>
                        <div className="itemCardBottom">
                            <ul>
                                <li>
                                    <p>Итого: </p>
                                    <div></div>
                                    <b>{totalPrice} руб. </b>
                                </li>
                                <li>
                                    <p>Налог 5%:</p>
                                    <div></div>
                                    <b> {Math.ceil((totalPrice / 100) * 5)} руб. </b>
                                </li>
                            </ul>
                            <button disabled={loading} onClick={onClickOreder} className='greenButton'>Оформить заказ
                                <img src="/arrow.svg" alt="" />
                            </button>
                        </div>
                    </>
                ) : (
                    <Info
                        title={isOrderCompleted ? 'Заказ оформлен!' : 'Корзина пустая'}
                        desc={isOrderCompleted ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
                        image={isOrderCompleted ? '/completed.jpg' : '/cartClear.png'}
                    />
                )
                }
            </div >
        </div >
    )

}

export default Drawer
