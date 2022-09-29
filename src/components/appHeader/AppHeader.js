import './appHeader.scss'

const AppHeader = ({ usd, eur }) => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__body">
                    <h1 className="header__title">Currency Converter</h1>
                    <div className="header__rate">
                        <span>1 USD = {usd} UAH</span>
                        <span>1 EUR = {eur} UAH</span>
                    </div>
                </div>
            </div>
        </header>
        
    );
};

export default AppHeader;