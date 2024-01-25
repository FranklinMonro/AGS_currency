interface CurrencyRates {
    currency_name?: string;
    rate?: string;
    rate_for_amount?: string;
}

interface CurrencyConverted {
    from_country?: string;
    to_country?: string;
    from_amount?: string;
    currency_name?: string;
    rate?: string;
    rate_for_amoun?: string;
}

export {
    CurrencyRates,
    CurrencyConverted,
};