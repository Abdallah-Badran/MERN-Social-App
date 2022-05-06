const DialogBox = ({ msg, success, leftBtn, rightBtn, leftBtnCb, rightBtnCb }) => {
    return (
        <div className="dialog-bg">
            <div className="dialog-box">
                <h3 style={success ? { backgroundColor: "rgb(23, 35, 100)" } : { backgroundColor: "rgb(151, 7, 7)" }}>
                    {success ? "SUCCESS" : "ERROR"}
                </h3>
                <div className="dialog-box-content">
                    {
                        msg?.map((msg, index) => {
                            return <div key={index}>* {msg}</div>
                        })
                    }
                </div>
                <div className="dialog-box-options">
                    {leftBtn && <button onClick={leftBtnCb} className="popup-button-confirm">{leftBtn}</button>}
                    {rightBtn && <button onClick={rightBtnCb} className="popup-button-cancel" style={!success ? { backgroundColor: "rgb(151, 7, 7)" } : null}>{rightBtn}</button>}
                </div>
            </div>
        </div >


    )
}

export default DialogBox