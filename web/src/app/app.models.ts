interface Cities {
    city?: string;
    state?: string;
    country?: string;
}


interface Weather {
  id?: number;
  city?: string;
  main?: string;
  description?: string;
  icon?: string;
}

interface WeatherByCity {
  id?: string;
  city?: string;
  main?: string;
  description?: string;
  date?: string;
  active?: boolean;
}

export {
    Cities,
    Weather,
    WeatherByCity,
};