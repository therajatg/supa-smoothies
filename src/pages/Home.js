import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState([]);
  const [orderBy, setOrderBy] = useState("created_at");

  useEffect(() => {
    fetchSmoothies();
    insertTodo();
  }, [orderBy]);

  const handleDelete = (id) => {
    setSmoothies((prev) => prev.filter((sm) => sm.id !== id));
  };

  const fetchSmoothies = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .select("*")
      .order(orderBy, { ascending: false });
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

  const insertTodo = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .insert([
        { user_id: "4b6607e0-afb4-4e2b-8166-bc97709d2028", task: "someValue" },
      ])
      .select();

    console.log(error, data);
  };

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies.length > 0 && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy("created_at")}>
              Time Created
            </button>
            <button onClick={() => setOrderBy("title")}>Title</button>
            <button onClick={() => setOrderBy("rating")}>Rating</button>
            {orderBy}
          </div>
          <div className="smoothie-grid">
            {smoothies?.map((smoothie) => (
              <SmoothieCard
                key={smoothie.id}
                smoothie={smoothie}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
