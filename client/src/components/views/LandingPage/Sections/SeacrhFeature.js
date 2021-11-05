import React, { useState } from 'react'
import { Input, Space } from 'antd';

const { Search } = Input;

function SeacrhFeature(props) {
    const [SearchTerm, setSearchTerm] = useState("")
    const searchHandler = (event) => {
        setSearchTerm(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }

    return (
        <div>
            <Search
                placeholder="input"
                onChange={searchHandler}
                style={{width:'200px'}}
                value={SearchTerm}
            />
        </div>
    )
}

export default SeacrhFeature
