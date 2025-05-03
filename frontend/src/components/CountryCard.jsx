import { Card, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  HeartOutlined,
  HeartFilled
} from "@ant-design/icons";

export default function CountryCard({ country, favoriteCountries, setFavoriteCountries }) {
  const { Meta } = Card;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const isFav = favoriteCountries.some((fav) => fav.countryCode === country.cca2);
    setIsFavorite(isFav);
  }, [favoriteCountries, country.cca2]);

  const toggleFavorite = async () => {
    if (!token) {
      message.warning("Please log in to manage favorites");
      return;
    }

    try {
      if (isFavorite) {
        await axios.delete(`http://localhost:5000/api/favorites/${country.cca2}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavoriteCountries((prev) =>
          prev.filter((fav) => fav.countryCode !== country.cca2)
        );
        message.success(`${country.name.common} removed from favorites`);
      } else {
        const newFavorite = {
          countryCode: country.cca2,
          countryName: country.name.common,
          flag: country.flags?.png,
          capital: country.capital?.[0] || '',
          currency: country.currencies ? Object.values(country.currencies)[0]?.name : '',
          language: country.languages ? Object.values(country.languages).join(', ') : ''
        };

        await axios.post(
          "http://localhost:5000/api/favorites",
          newFavorite,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFavoriteCountries((prev) => [...prev, newFavorite]);
        message.success(`${country.name.common} added to favorites`);
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Card
      hoverable
      className="relative w-full max-w-xs mx-auto"
    >
      {/* Heart Icon */}
      <div
        className="absolute bottom-3 right-3 text-xl text-red-500 cursor-pointer z-10"
        onClick={toggleFavorite}
      >
        {isFavorite ? <HeartFilled /> : <HeartOutlined />}
      </div>

      <Meta
        title={
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-black">
              {country.name.common}
            </h2>
            <img
              src={country.flags?.png}
              alt={`${country.name.common} flag`}
              className="w-10 h-6 object-contain ml-2"
            />
          </div>
        }
        description={
          <div className="mt-2 text-sm text-gray-700">
            <p><strong>Capital:</strong> {country.capital?.[0] || 'No Capital'}</p>
            <p><strong>Currency:</strong> {country.currencies ? Object.values(country.currencies)[0]?.name : 'N/A'}</p>
            <p><strong>Language:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
            <button
              className="mt-3 px-4 py-2 bg-[#347928] text-white rounded hover:bg-[#347928]/80 transition"
              onClick={() => navigate(`/country/${country.cca2}`)}
            >
              View Details
            </button>
          </div>
        }
      />
    </Card>
  );
}
