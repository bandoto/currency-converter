import { useEffect, useState } from 'react'
import axios from 'axios'
import AppHeader from '../appHeader/AppHeader'
import CurrencyInput from '../currencyInput/CurrencyInput'

const BASE_URL = 'https://v6.exchangerate-api.com/v6/'
const API_KEY = '5f44ec738d0cfec239fe8850'

function App() {

    const [usd, setUsd] = useState()
    const [eur, setEur] = useState() 

    const [selectOptions, setSelectOptions] = useState([])
    const [fromCurrency, setFromCurrency] = useState()
    const [toCurrency, setToCurrency] = useState()
    const [fromAmount, setFromAmount] = useState('')
    const [toAmount, setToAmount] = useState('')

    useEffect(() => {
        axios.get(`${BASE_URL}${API_KEY}/latest/UAH`)
            .then(res => {
                const usd = Object.keys(res.data.conversion_rates).find(item => item === 'USD')

                setSelectOptions(res.data.conversion_rates)
                setFromCurrency(res.data.base_code)
                setToCurrency(usd)
            })
    }, [])

    useEffect(() => {
        axios.get(`${BASE_URL}${API_KEY}/pair/EUR/UAH`)
            .then(res => {
                setEur(res.data.conversion_rate)
            })
        axios.get(`${BASE_URL}${API_KEY}/pair/USD/UAH`)
            .then(res => {
                setUsd(res.data.conversion_rate)
            })
    }, [])

    const onChangeFromAmount = (fromAmount) => {
        setFromAmount(fromAmount)
        setToAmount((fromAmount * selectOptions[toCurrency] / selectOptions[fromCurrency]).toFixed(2))
    }

    const onChangeFromCurrency = (fromCurrency) => {
        setFromCurrency(fromCurrency)
        setToAmount((fromAmount * selectOptions[toCurrency] / selectOptions[fromCurrency]).toFixed(2))
    }

    const onChangeToAmount = (toAmount) => {
        setToAmount(toAmount)
        setFromAmount((toAmount * selectOptions[fromCurrency] / selectOptions[toCurrency]).toFixed(2))
    }

    const onChangeToCurrency = (toCurrency) => {
        setToCurrency(toCurrency)
        setToAmount((fromAmount * selectOptions[toCurrency] / selectOptions[fromCurrency]).toFixed(2))
    }   

    return (
        <div className='wrapper'>
            <AppHeader 
                usd={usd}
                eur={eur}
            />
            <div className="main">
                <section className="converter">
                    <div className="container">
                        <div className="converter__body">
                            <CurrencyInput 
                                selectOptions={Object.keys(selectOptions)}
                                currency={fromCurrency}
                                onChangeCurrency={onChangeFromCurrency}
                                onChangeAmount={onChangeFromAmount}
                                amount={fromAmount}
                            />
                            <span>=</span>
                            <CurrencyInput 
                                selectOptions={Object.keys(selectOptions)}
                                onChangeCurrency={onChangeToCurrency}
                                onChangeAmount={onChangeToAmount}
                                currency={toCurrency}
                                amount={toAmount}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default App;