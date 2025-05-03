import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import RegionFilter from '../components/RegionFilter';
import CountryCard from '../components/CountryCard';
import axios from 'axios';
import Header from '../components/Header';
import { Button } from 'antd';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    // Fetch all countries
    axios.get("https://restcountries.com/v3.1/all")
      .then(res => setCountries(res.data))
      .catch(err => console.error(err));

    // Fetch favorite countries from the backend
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/favorites", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setFavoriteCountries(res.data);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };

    fetchFavorites();
  }, []);

  const filteredCountries = countries.filter((country) => {
    const matchesRegion = selectedRegion ? country.region === selectedRegion : true;
    const matchesSearch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    const isFavorite = favoriteCountries.some(fav => fav.countryCode === country.cca2);

    return matchesRegion && matchesSearch && (!showFavorites || isFavorite);
  });

  return (
    <>
      <Header />
      <div className='min-h-screen bg-[#F8FBFF]'>
        <div className='mx-auto max-w-7xl'>
          <div className='flex justify-between items-start mt-36'>
            <RegionFilter selectedRegion={selectedRegion} onRegionChange={setSelectedRegion} />
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <Button 
              onClick={() => setShowFavorites(prev => !prev)} 
              className="mt-4"
              type="primary"
            >
              {showFavorites ? "Show All Countries" : "Show Favorite Countries"}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 max-w-7xl mx-auto px-4">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <CountryCard 
                  key={country.cca3} 
                  country={country} 
                  favoriteCountries={favoriteCountries}
                  setFavoriteCountries={setFavoriteCountries} 
                />
              ))
            ) : (
              <p className='col-span-full text-center text-gray-500'>
                No countries found.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
