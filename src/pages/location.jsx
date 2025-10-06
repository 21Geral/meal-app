import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../components/cards";

export default function Location() {
  const { areaName: paramArea } = useParams();
  const [flagUrl, setFlagUrl] = useState("");

  // Si no hay parámetro en la URL, usamos "American" como default
  const areaName = paramArea || "American";

  useEffect(() => {
    async function fetchFlag() {
      try {
        const mapping = {
          American: "United States",
          British: "United Kingdom",
          Canadian: "Canada",
          Chinese: "China",
          Croatian: "Croatia",
          Dutch: "Netherlands",
          Egyptian: "Egypt",
          Filipino: "Philippines",
          French: "France",
          Greek: "Greece",
          Indian: "India",
          Irish: "Ireland",
          Italian: "Italy",
          Jamaican: "Jamaica",
          Japanese: "Japan",
          Kenyan: "Kenya",
          Malaysian: "Malaysia",
          Mexican: "Mexico",
          Moroccan: "Morocco",
          Polish: "Poland",
          Portuguese: "Portugal",
          Russian: "Russia",
          Spanish: "Spain",
          Thai: "Thailand",
          Tunisian: "Tunisia",
          Turkish: "Turkey",
          Vietnamese: "Vietnam",
        };

        const country = mapping[areaName] || areaName;
        const res = await axios.get(`https://restcountries.com/v3.1/name/${country}?fields=flags`);
        setFlagUrl(res.data[0]?.flags?.svg || "");
      } catch (err) {
        console.error("Error fetching flag:", err.message);
        setFlagUrl("");
      }
    }

    fetchFlag();
  }, [areaName]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-3 pt-6 text-[#930f01]">
        {flagUrl && <img src={flagUrl} alt={`${areaName} flag`} className="w-8 h-6 object-cover rounded shadow" />}
        {areaName}
      </h2>
      <Cards endpoint={`filter.php?a=${areaName}`} />
    </div>
  );
}
