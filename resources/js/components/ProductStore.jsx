import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function ProductStore() {
    const { idproduct } = useParams();
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        axios.get(`/api/get_product_store/${idproduct}`)
            .then(response => {
                setApiData(response.data.products);
                console.log(idproduct)
                console.log(apiData)
            }).catch(err => console.log(err))
    }, [])
    return (
        <div className='bg-white w-10/12 xl:w-7/12  grid  xl:grid-cols-3 xl:gap-y-4 gap-6 justify-items-center gap-y-10 m-auto shadow-2xl mt-20 py-5 px-2 rounded-md'>
            {
                apiData.map((item) =>

                    <div key={item.id} className='bg-gray-50 px-4 py-2'>
                        <img src={'../' + item.image} className='w-40 h-36 object-cover ' alt='image' />
                        <div>
                            <p className='text-2xl font-bold'>{item.name}</p>
                        </div>
                        <div>
                            <p>Location: {item.location}</p>
                            <p>Price: {item.price}$</p>
                        </div>

                        <div className='flex justify-between mt-2 gap-2'>
                            <Link to={'/update/'+item.id+'/'+item.store_id} className='text-lg tracking-wide bg-sky-600 px-2 rounded-lg text-gray-50'>Update</Link>
                            <button  className='text-lg bg-red-600 px-2 tracking-wide  rounded-lg text-gray-50'>Delete</button>
                        </div>



                    </div>
                )
            }
        </div>
    )
}

export default ProductStore
