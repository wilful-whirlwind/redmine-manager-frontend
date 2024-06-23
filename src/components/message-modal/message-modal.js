import React, {useState} from "react"

export function MessageModal() {
    const [display, setDisplay] = useState('none');
    const [count, setCount] = useState(0);
    const close = () => {
        if (count > 0) {
            setDisplay('none');
            setCount(0);
        } else {
            setCount(1);
        }
    };
    const open = () => {
        setDisplay('block');
    };

    return (
        <div
            id={'message-modal'}
            style={{
                zIndex: 1001,
                width: "100%",
                height: "100%",
                backgroundColor: "#e0e0e0",
                opacity: 0.7,
                position: "absolute",
                top: 0,
                left: 0,
                display: display
            }}
            onClick={close}
        >
            <div id={"popup-message"} style={{
                width: "35%",
                height: "20%",
                backgroundColor: "#fff",
                position: "absolute",
                top: '40vh',
                left: '30vw'
            }}>
                <div style={{
                    fontSize: "25px",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex"
                }}>
                    <span style={{
                        width: "100%",
                        textAlign: "center"
                    }}
                          id={'modal-body-default'}
                    >

                    </span>
                </div>
            </div>
            <button type={'button'} onClick={open} id={'modal-open'} style={{
                display: 'none'
            }}></button>
            <button type={'button'} onClick={close} id={'modal-close'} style={{
                display: 'none'
            }}
            ></button>
        </div>
    );
}