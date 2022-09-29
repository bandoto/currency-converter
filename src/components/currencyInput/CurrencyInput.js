import './currencyInput.scss'

const CurrencyInput = ({ selectOptions, currency, onChangeCurrency, amount, onChangeAmount }) => {
    return (
        <div className="converter__input">
            <input type="number" value={amount} onChange={e => onChangeAmount(e.target.value)} />
            <select value={currency} onChange={e => onChangeCurrency(e.target.value)} >
                {
                    selectOptions.map(option => (
                        <option 
                            key={option} 
                            value={option}>
                            {option}
                        </option>
                    ))
                }
            </select>
        </div>
    );
};

export default CurrencyInput;