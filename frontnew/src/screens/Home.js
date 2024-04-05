import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { motion } from "framer-motion";

function Home() {

    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("https://foodapp-uqfe.onrender.com/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();

        setFoodItem(response[0]);
        setFoodCat(response[1]);
        // console.log(response[0], response[1]);
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 170, damping: 12 }}
            >
                <div><Navbar /></div>
                <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="2000"> {/* Set the interval to 2000 milliseconds (2 seconds) */}
                    
                    <div className="carousel-inner" id="carousel">
                        <div className="carousel-caption">
                            <div className="d-flex justify-content-center" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?Burger" className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?coke" className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div> </div>
                <div className='container'>
                    {
                        foodCat && foodCat.map((data) => {
                            return (
                                <div className='row mb-3' key={data._id}>
                                    <div className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {foodItem && foodItem.filter((item) =>
                                        (item.CategoryName === data.CategoryName) &&
                                        (item.name.toLowerCase().includes(search.toLowerCase()))
                                    ).map(filterItems => (
                                        <div className='col-12 col-md-6 col-lg-3' key={filterItems._id}>
                                            <Card
                                                foodItem={filterItems}
                                                options={filterItems.options[0]}
                                                foodName={filterItems.name}
                                                imgSrc={filterItems.img}
                                            />
                                        </div>
                                    ))}
                                </div>
                            );
                        })
                    }

                    <Card />
                </div>
                <div><Footer /></div>
            </motion.div>
        </div>
    )
}

export default Home