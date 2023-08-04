import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState([]);

  useEffect(() => {
    fetchSmoothies();
  }, []);

  const fetchSmoothies = async () => {
    const { data, error } = await supabase.from("smoothies").select("*");
    console.log(data, error);
    if (error) {
      setFetchError("Could not fetch data");
      setSmoothies([]);
      console.log(error);
    }
    if (data) {
      setSmoothies(data);
      setFetchError(null);
    }
  };

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies.length > 0 && (
        <div className="smoothies">
          <div className="smoothie-grid">
            {smoothies?.map((smoothie) => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
