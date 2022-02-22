import React from 'react'

const Alert = (props) => {
    return (
        <div className="row justify-content-center" style={{height: '50px'}}>
            {props.alert && <div className={`col-5 alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <div>{props.alert.msg}</div>
            </div>}
        </div>
    )
}

export default Alert
