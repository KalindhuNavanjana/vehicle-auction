import { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Vehicle = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState({});

    console.log(id);
    useEffect(() => {
        Axios.get(
            "http://157.245.61.32:7979/vehicles?id="+{id}
        ).then((res) => {
            setVehicle(res.data);
        });
    }, []);

    return (
        <div>
            <Row>
                <div className='col-md-6'>
                    <img src={vehicle.details.image} alt='' />
                </div>
                <div className='col-md-6'>
                    <h2>{vehicle.name}</h2>
                    <h2>
                        {vehicle.brand}
                        {" - "} {vehicle.details.manufactureYear}
                    </h2>
                    <h2>
                        {vehicle.details.currency}
                        {" : "} {vehicle.details.price}
                    </h2>
                </div>
            </Row>
        </div>
    );
};

export default Vehicle;
