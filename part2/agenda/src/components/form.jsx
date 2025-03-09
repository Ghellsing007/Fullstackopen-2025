const PersonForm = ({ onS, valueA, onA, valueB, onB }) => {
    return (
        <form onSubmit={onS}>
            <div>Name: <input value={valueA} onChange={onA} /></div>
            <div>Number: <input value={valueB} onChange={onB} /></div>
            <div><button type="submit">save</button></div>
        </form>
    )
}

export default PersonForm
