import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Icon, Col, Card, Row } from 'antd'
import Meta from 'antd/lib/card/Meta'
import ImageSlider from '../../utils/ImageSlider'
import CheckBox from './Sections/CheckBox'
import RadioBox from './Sections/RadioBox'
import SeacrhFeature from './Sections/SeacrhFeature'
import { continents, price } from './Sections/Datas'

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [SearchTerm, setSearchTerm] = useState("")
    const [Filters, setFilters] = useState({
        continents:[],
        price:[],
        searchTerm: SearchTerm
    })

    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit
        }
        getProducts(body)
    }, [])

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
        .then(response => {
            if(response.data.success){
                if(body.loadMore) setProducts([...Products, ...response.data.productInfo])
                else setProducts(response.data.productInfo)
                setPostSize(response.data.postSize)
            } else{
                alert("상품들을 가져오는데 실패했습니다")
            }
        })
    }
    
    const loadMoreHandler = () => {
        let skip = Skip + Limit
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters
        }
        setSkip(skip)
        getProducts(body)
    }

    const renderCards = Products.map((product, index) => {
        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images}/></a>}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                    />
            </Card>
        </Col>
    })

    const showFilteredResult = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        setSkip(0)
        getProducts(body)
    }
    const handlePrice = (value) => {
        const data = price
        let array = []

        for(let key in data){
            if(data[key]._id === parseInt(value, 10)) {
                array = data[key].array
            }
        }
        return array
    }

    const handleFilters = (filters, category) => {
        const newFilters = {...Filters }
        newFilters[category] = filters

        if(category==="price"){
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }

        showFilteredResult(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm = (newSearchTerm) => {        
        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }
        
        setSearchTerm(newSearchTerm)
        setSkip(0)
        getProducts(body)
    }


    return (
        <div style={{witdh: '75%', margin: '3rem'}}>
            <div style={{ textAlign: 'center'}}>
                <h2>Let's Travel Anywhere <Icon type="rocket"/></h2>
            </div>

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <CheckBox 
                        list={continents}
                        handleFilters={filters => handleFilters(filters, "continents")}/>              
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox
                        list={price}
                        handleFilters={filters => handleFilters(filters, "price")}/>
                </Col>
            </Row>

                
            <div style={{display:'flex', justifyContent:'flex-end', margin:'1rem auto'}}>
                <SeacrhFeature refreshFunction={updateSearchTerm}/>
            </div>




            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>

            <br/>
            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent:'center'}}>
                    <button onClick={loadMoreHandler}>더보기</button>
                </div>
            }
        </div>
    )
}

export default LandingPage
