import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Row } from "react-bootstrap";
import BidItem from "./BidItem";
import VehicleItem from "./VehicleItem";

const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    const [biddings, setbiddings] = useState([]);

    const Brands = ["Volkswagen", "Audi", "Ford", "Mercedes", "BMW"];
    const cart = useRef(null);

    const addToBiddings = (amount, id, name, details) => {
        console.log(amount);
        const item = {
            bid: amount,
            id: id,
            name: name,
            details: details,
        };

        let bids = biddings;
        bids.push(item);
        setbiddings(bids);
        console.log(biddings);
    };

    useEffect(() => {
    }, [biddings]);

    useEffect(() => {
        axios.get("http://157.245.61.32:7979/vehicles").then((res) => {
            setVehicles(res.data);
        });
    }, []);

    return (
        <div className='main'>
            <h1 className='mt-2'>Vehicle Auction</h1>
            <div className='control'>
                <select
                    className='form-select'
                    aria-label='Select Brand'
                    defaultValue={0}
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

            <Row xs={1} md={2} lg={3} className='card-grid'>
                {vehicles.map((vehicle) => (
                    <VehicleItem
                        key={vehicle.id}
                        vehicle={vehicle}
                        addToBiddings={addToBiddings}
                    />
                ))}
            </Row>

            <div className='cart' ref={cart}>
                {biddings.map((item) => (
                    <BidItem
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;