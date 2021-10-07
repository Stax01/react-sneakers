import axios from 'axios'
import React from 'react'
import Card from '../components/card/Card'

const Orders = () => {
    const [isLoading, setisLoading] = React.useState(false)
    const [orders, setOrders] = React.useState([])
    React.useEffect(() => {
        async function fethcOrder() {
            
            const { data } = await axios.get('https://614fbf57a706cd00179b72f1.mockapi.io/orders');
            setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        }
        setisLoading(false)
        fethcOrder()
    }, [])
console.log(orders)
    return (
        <>
            <div className='contentInfo'>
                <h1>Мои покупики</h1>

            </div>
            <div className='contentWrapper'>
                {orders.map((item, index) => <Card
                    key={index}
                    loading={isLoading}
                    {...item}

                />)}
            </div>
        </>
    )
}

export default Orders
