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
                        alt=''
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
                <p className="type">{details.brand}{" "}{details.manufactureYear}</p>
                <p className="price">{"Price : "}{details.currency}{" "}{details.price}</p>
                <h3 className="bid">{"Bid : "}{details.currency}{" "}{bid}</h3>
            </div>
        </Card>
    );
};

export default BidItem;
