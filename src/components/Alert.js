import React from 'react'

const Alert = (props) => {
    return (
        <div>
            <div className="alert alert-primary overflow-visible" role="alert">
                {props.message}
            </div>
        </div>
    )
}

export default Alert
