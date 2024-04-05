import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';

export default function Card(props) {
    // const dispatch = useDispatch();
    const dispatch = useDispatchCart();
    let data = useCart();

    // console.log(props.foodItem);
    const priceRef = useRef();
    let options = props.options || {};
    let priceOptions = Object.keys(options);
    // let foodItem = props.foodItems;

    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")

    const handleAddtoCart = async () => {
        // toast.success('Added to cart!');
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;

                break;
            }
        }

        if(food !== []){
            if(food.size === size) {
                await dispatch({type: "UPDATE", id: props.foodItem._id, price:finalPrice, qty: qty})
                return toast.success('Updated Item Successfully!')
            }else if (food.size !== size){
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
                return toast.success('Added To Cart!')
                // await console.log(data)
            }
            return;
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
    }

    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div>
            <div>
                <div className="card mt-5" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img src={props.imgSrc} className="card-img-top" alt="Food Image" style={{ height: "120px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodName}</h5>
                        <div className='container w-100'>
                            <select className="m-2 h-100 bg-success" onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>

                            <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                            <div className='d-inline h-100 fs-6'>
                                $ {finalPrice} /-
                            </div>
                        </div>
                        <hr />
                        <button className={`btn btn-success justify-content-center ms-2`} onClick={handleAddtoCart}>Add To Cart</button>

                    </div>
                </div>
            </div>
        </div>
    )
}