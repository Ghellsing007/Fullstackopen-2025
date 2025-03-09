const Filter = ({ value, onChange }) => {
    return (
        <div>
            Buscar: <input value={value} onChange={onChange} />
        </div>
    )
}

export default Filter
