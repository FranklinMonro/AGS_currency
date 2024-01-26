interface CurrencyRates {
    currency_name?: string;
    rate?: string;
    rate_for_amount?: string;
}

interface CurrencyConverted {
    id?: string;
    from_country?: string;
    to_country?: string;
    from_amount?: string;
    currency_name?: string;
    rate?: string;
    rate_for_amount?: string;
}

export {
    CurrencyRates,
    CurrencyConverted,
};