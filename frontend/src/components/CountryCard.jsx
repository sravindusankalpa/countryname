import { Card } from "antd";
import { useNavigate } from "react-router-dom";

export default function CountryCard({ country }) {
  const { Meta } = Card;
  const navigate = useNavigate();

  return (
    <Card 
      hoverable  
      className="w-full max-w-xs mx-auto"
      >
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
              className="mt-3 px-4 py-2 bg-[#347928] text-white rounded hover:bg-[#347928]/80 hover:text-white cursor-pointer transition"
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
