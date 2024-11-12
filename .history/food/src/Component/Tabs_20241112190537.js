import { useEffect, useState } from "react";
import axios from "axios";
import bgimg from "../Assets/Card.png";

const Tabs = () => {
  const [selectedBtn, setSelectedBtn] = useState("all");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000");
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (searchValue == "") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((food) => food.name.toLowerCase().includes(searchValue))
      );
    }
  };

  const filterfood = (type) => {
    setSelectedBtn(type);
    if (type === "all") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => item.type === type.toLowerCase());
      setFilteredData(filtered);
    }
  };

  const tab = [
    { name: "All", type: "all" },
    { name: "Breakfast", type: "breakfast" },
    { name: "Lunch", type: "Lunch" },
    { name: "Dinner", type: "dinner" },
  ];
  return (
    <>
      <div className="p-10">
        <div className="relative hidden md:block float-right ">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search icon</span>
          </div>
          <input
            type="text"
            onChange={searchFood}
            id="search-navbar"
            className="w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3 my-4">
          {tab.map((item, index) => (
            <button
              key={index}
              isSelected={selectedBtn === item.type}
              onClick={() => filterfood(item.type)}
              className={`p-4 rounded-lg font-medium text-gray-900 bg-red-500 dark:bg-red-700 border border-red-200 dark:border-red-700 hover:bg-red-600 dark:hover:bg-red-600 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 transition-colors duration-200 ${
                selectedBtn === item.type
                  ? "bg-red-600 dark:bg-red-600 text-white"
                  : "text-white"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-6 ">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 dark:bg-gray-800 dark:border-gray-700 w-full lg:w-3/12 p-4"
              style={{
                backgroundImage: `url(${bgimg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <img
                src={`http://localhost:9000${item.image}`}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 p-1 mb-4"
              />
              <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">
                {item.name}
              </h5>
              <p className="text-sm text-gray-700 dark:text-gray-400 mb-4 text-center">
                {item.text}
              </p>
              <div className="flex justify-between items-center w-full">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  ${item.price}.00
                </span>
                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Buy Now
                  <svg
                    className="w-4 h-4 ml-2 rtl:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tabs;
