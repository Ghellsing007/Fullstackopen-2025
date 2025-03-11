const Notification = ({ message, clase }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={clase}>
            {message}
        </div>
    )
}

export default Notification