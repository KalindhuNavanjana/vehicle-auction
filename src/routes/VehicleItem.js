import React, { useRef, useState } from "react";
import { Button, Card, Col, Toast } from "react-bootstrap";

const VehicleItem = ({ vehicle: { id, name, details },addToBiddings }) => {
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [toastInfo, setToastInfo] = useState({
        topic: "",
        content: "",
        theme:'primary'
    });

    const input = useRef(null);
    const submit = useRef(null);

    const toggleToast = () => {
        setShowToast(!showToast);
    };

    const handleChange = (event) => {
        if (input.current.value != "") {
            console.log("hello");
            setBtnDisabled(false);
        } else {
            console.log(input.current.value);
            setBtnDisabled(true);
        }
    };

    const handleSubmit = () => {
        if (input.current.value > details.price) {
            //submit code 
            const biddingAmount = input.current.value;
            input.current.value = 0;
            setBtnDisabled(true);

            addToBiddings(biddingAmount,id,name,details);

            setToastInfo({
                topic: "Successful",
                content: "Your bid has been recorded",
                theme:'success'
            });
            toggleToast();
        } else {
            setToastInfo({
                topic: "Oops!",
                content: "You cannot bid lower than the current price",
                theme:'danger'
            });
            toggleToast();
        }
    };

    return (
        <Col className='py-2 text-center'>
            <Card>
                <Card.Title className='vehicle-name'>{name}</Card.Title>
                <p className='brand'>
                    {details.brand} {details.manufactureYear}
                </p>
                <hr />
                {details.image ? (
                    <Card.Img
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
                <hr />
                <Card.Body>
                    <div className='card-info'>
                        <div
                            className='color'
                            style={{ backgroundColor: details.color }}
                        ></div>
                        <p className='price'>
                            {details.currency} {details.price}
                        </p>
                    </div>
                    <div className='input-group mb-3'>
                        <input
                            ref={input}
                            type='number'
                            min={1}
                            className='form-control'
                            placeholder='Bidding Amount'
                            aria-label='Bidding Amount'
                            aria-describedby='button-addon2'
                            onChange={handleChange}
                        ></input>
                        <button
                            ref={submit}
                            className='bid-btn btn btn-outline-light'
                            type='button'
                            id='button-addon2'
                            onClick={handleSubmit}
                            disabled={btnDisabled}
                        >
                            Add to Biddings
                        </button>
                    </div>
                </Card.Body>
            </Card>
            <Toast
                className='d-inline-block m-0'
                show={showToast}
                bg={toastInfo.theme}
                delay={3000}
                autohide
                onClose={() => setShowToast(false)}
            >
                <Toast.Header>
                    <img
                        src='holder.js/20x20?text=%20'
                        className='rounded me-2'
                        alt=''
                    />
                    <strong className='me-auto'>{toastInfo.topic}</strong>
                    <small></small>
                </Toast.Header>
                <Toast.Body className={"text-white"}>
                    {toastInfo.content}
                </Toast.Body>
            </Toast>{" "}
        </Col>
    );
};

export default VehicleItem;
