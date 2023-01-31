import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Row } from "react-bootstrap";
import BidItem from "./BidItem";
import VehicleItem from "./VehicleItem";

const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    const [brand, setBrand] = useState(null);
    const [biddings, setbiddings] = useState([]);
    const [showCart, setshowCart] = useState(false);
    const [total, setTotal] = useState(0);

    const Brands = ["Volkswagen", "Audi", "Ford", "Mercedes", "BMW"];

    const brandElement = useRef(null);
    const cart = useRef(null);

    const addToBiddings = (amount, id, name, details) => {
        // console.log(amount);
        const item = {
            bid: amount,
            id: id,
            name: name,
            details: details,
        };

        let bids = biddings;
        bids.push(item);
        setbiddings(bids);
        // console.log(biddings);
        updateTotal()
    };

    const updateTotal = () => {
        let temp = 0;
        biddings.forEach(element => {
            temp = parseInt(temp) + parseInt(element.bid);
        });

        setTotal(temp);
    }

    const toggleCart = () => {
        setshowCart(!showCart);
    };

    const handleBrandChange = () => {
        setBrand(brandElement.current.value);
    };

    useEffect(() => {
        if (brand) {
            axios.get("http://157.245.61.32:7979/vehicles?details.brand="+brand).then((res) => {
                setVehicles(res.data);
            });
        }else{
            axios.get("http://157.245.61.32:7979/vehicles").then((res) => {
                setVehicles(res.data);
            });
        }
    },[brand]);

    return (
        <div className='main'>
            <h1 className='mt-2'>Vehicle Auction</h1>
            <Row>
                <div className='control col-10'>
                    <select
                        className='form-select'
                        aria-label='Select Brand'
                        defaultValue={0}
                        onChange={handleBrandChange}
                        ref={brandElement}
                    >
                        <option value={0} disabled>
                            Select a Brand
                        </option>
                        {Brands.map((brand) => (
                            <option key={brand} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className='btn btn-cart ms-5 col-1'
                    onClick={toggleCart}
                >
                    Show Cart
                </button>
            </Row>

            <Row xs={1} md={2} lg={3} className='card-grid'>
                {vehicles.map((vehicle) => (
                    <VehicleItem
                        key={vehicle.id}
                        vehicle={vehicle}
                        addToBiddings={addToBiddings}
                    />
                ))}
            </Row>

            {showCart ? (
                <div className='cart' ref={cart}>
                    <h2>Cart</h2>
                    {biddings.map((item) => (
                        <BidItem key={item.id} item={item} />
                    ))}
                    <h3 className="total">Rs. {total} /=</h3>
                </div>
            ) : null}
        </div>
    );
};

export default Home;
