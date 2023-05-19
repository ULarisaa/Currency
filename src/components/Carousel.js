import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import data from '../currencies-with-flags.json';
import axios from 'axios';
import CurrencyChart from './CurrencyChart';

const Carousel = () => {
  const [currencyData, setCurrencyData] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  useEffect(() => {
    fetchCurrencyData();
  }, []);

  const fetchCurrencyData = async () => {
    try {
      const response = await axios.get('https://victorysquarepartners.com/curs1.php');
      const xmlData = response.data;

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
      const cubeData = xmlDoc.querySelectorAll('Cube Rate');

      const currencyRates = Array.from(cubeData).map((rate) => ({
        currency: rate.getAttribute('currency'),
        value: rate.textContent,
      }));

      setCurrencyData(currencyRates);
    } catch (error) {
      console.error('Error fetching currency data:', error);
    }
  };

  const handleCurrencyClick = (currencyCode) => {
    setSelectedCurrency(currencyCode);
  };

  const saveCurrenciesToDatabase = async () => {
    try {
      await axios.post('mongodb+srv://larisa:@cluster0.sas9vb5.mongodb.net/', { currencies: currencyData });
      console.log('Currencies saved successfully!');
    } catch (error) {
      console.error('Error saving currencies:', error);
    }
  };

  const renderCarouselItems = () =>
    data.map((currency) => {
      const currencyValue = currencyData
        ? currencyData.find((rate) => rate.currency === currency.code)?.value
        : null;

      return (
        <div key={currency.code} onClick={() => handleCurrencyClick(currency.code)}>
          <center>
            <img src={currency.flag} alt={currency.code} style={{ cursor: 'pointer' }} />
            <p>{currency.code}</p>
            {currencyValue && <p>{currencyValue}</p>}
          </center>
        </div>
      );
    });

  return (
    <div>
      <AliceCarousel
        autoPlay
        autoPlayInterval={1000}
        mouseTracking
        disableSlideInfo
        items={renderCarouselItems()}
        responsive={{
          0: { items: 1 },
          576: { items: 3 },
          768: { items: 5 },
          992: { items: 7 },
        }}
      />
      <button
        onClick={saveCurrenciesToDatabase}
        style={{
          backgroundColor: '#1c449c',
          fontSize: '1.5rem',
          position: 'fixed',
          top: '50%',
          right: '2rem',
          transform: 'translateY(-50%)',
          fontFamily: 'Montserrat',
          color: 'white',
        }}
      >
        Save Currencies
      </button> 
      {selectedCurrency && <CurrencyChart currencyCode={selectedCurrency} />} {/* Display the currency chart */}
    </div>
  );
};

export default Carousel;

