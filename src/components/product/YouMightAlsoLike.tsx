"use client"
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { ProductDTO } from '@/types/product.types'
import { PRODUCT_SERVICES } from '@/api/product/product.service'

const YouMightAlsoLike = ({categoryId, productId}: {categoryId: string, productId: string}) => {
    console.log(categoryId, productId, 'idssss')
    const [products, setProducts] = useState<ProductDTO[]>([])

    useEffect(() => {
        const fetchSimilarProducts = async () => {
            const response = await PRODUCT_SERVICES.getFeeds({page: 1, limit: 5, categories: [categoryId]})
        console.log(response.data, 'datea response')
            const filteredProducts = response.data?.filter(item => item.id !== productId)
            console.log(productId, 'prod')
            setProducts(filteredProducts || [])
        }
        fetchSimilarProducts()
    }, [])
  return (
     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 md:gap-2 mx-auto">
          {products?.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} is3D={true}/>
          ))}
        </div>
  )
}

export default YouMightAlsoLike