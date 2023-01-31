import React from "react";
import { Card } from "react-bootstrap";

const BidItem = ({ item: { bid, id, name, details }}) => {
    return (
        <Card className='cart-item row'>
            <div className='img'>
                {details.image ? (
                    <img
                        className='image'
                        variant='left'
                        src={details.image}
                    />
                ) : (
                    <div className='image d-flex align-items-center justify-content-center'>
                        <p className='text-center text-light'>
                            Preview not available
                        </p>
                    </div>
                )}
            </div>
            <div className='content'>
                <p className="name">{name}</p>
                <p className="name">{details.brand}{" "}{details.manufactureYear}</p>
                <p className="name">{details.price}</p>
                <h3 className="name">{bid}</h3>
            </div>
        </Card>
    );
};

export default BidItem;
