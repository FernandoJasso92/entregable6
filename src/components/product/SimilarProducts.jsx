import React, { useEffect, useState } from 'react'
import { axiosEcommerce } from '../../utils/configAxios'
import ProductCard from '../home/ProductCard'

const SimilarProducts = ({categoryId, productId}) => {

    const [similarProducts, setSimilarProducts] = useState([])

    useEffect(() => {
        if(categoryId){
        axiosEcommerce.get(`products?categoryId=${categoryId}`)
        .then((res) => {
            const otherProducts = res.data.filter(product => product.id !== productId)
            setSimilarProducts(otherProducts)
        })
        .catch((err) => console.log(err))
        }
    }, [categoryId, productId])
    
  return (
    <section className='px-2'>
        <h2 className='text-red-500 font-bold text-lg mb-6'>Discover similar items</h2>

        <section className='grid gap-6 py-4 grid-cols-3'>
            {
                similarProducts.map(product => <ProductCard 
                    key={product.id} product={product} />)
            }
        </section>
    </section>
  )
}

export default SimilarProducts