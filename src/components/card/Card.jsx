import React from 'react'
import ContentLoader from "react-content-loader"
import AppContext from '../../context'

const Card = ({
  title,
  price,
  imageUrl,
  onPlus,
  id,
  onFavorite,
  favorited = false,
  loading = false }) => {


  const { isItemAdded, onAddToFavorite } = React.useContext(AppContext)

  const [isFavorite, setIsFavorite] = React.useState(favorited)
  const obj = {
    id,
    parentId: id,
    title,
    price,
    imageUrl
  }
  const onClickFavorite = () => {
    onAddToFavorite(obj)
    setIsFavorite(!isFavorite)
  }


  const onClickPlus = () => {
    onPlus(obj)

  }
  return (
    <> {loading ? (
      <ContentLoader
        speed={2}
        width={210}
        height={260}
        viewBox="0 0 210 260"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"

      >
        <rect x="33" y="20" rx="7" ry="7" width="133" height="112" />
        <rect x="30" y="153" rx="7" ry="7" width="150" height="34" />
        <rect x="28" y="202" rx="4" ry="4" width="84" height="34" />
        <rect x="148" y="202" rx="4" ry="4" width="34" height="34" />
      </ContentLoader>
    ) : (<div className='item'>
     { onFavorite &&
        <div onClick={onClickFavorite} className='itemLike' >
          <img height={32} width={32} src={!isFavorite ? "/unliked.svg" : "/liked.png"} alt="like" />
        </div>}
      <img height={112} width={133} src={imageUrl} alt="" />

      <p>{title}</p>
      <div className='itemBottom'>
        <div className='itemPrice'>
          <span>Цена:</span> <b>{price} руб.</b>
        </div>
       {onPlus && <div>
          {<img onClick={onClickPlus} src={isItemAdded(id) ? '/check-active.svg' : '/itemBtn.svg'} alt="" />}
        </div>}
      </div>
    </div>)}




    </>
  )
}

export default Card
