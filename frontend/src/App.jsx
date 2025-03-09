import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const App = () => {
  const [data, setData] = useState([]);
  const [tradeCodes, setTradeCodes] = useState([]);
  const [selectedTradeCode, setSelectedTradeCode] = useState("");

  const handleUpdate = (id, field, value) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setData(updatedData);
    axios
      .put(
        `https://stcokchange.onrender.com/stocks/${id}/`,
        updatedData.find((item) => item.id === id)
      )
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axios
      .get("https://stcokchange.onrender.com/stocks/")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        const codes = [
          ...new Set(response.data.map((item) => item.trade_code)),
        ];
        setTradeCodes(codes);
        setSelectedTradeCode(codes[0]);
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredData = data.filter(
    (item) => item.trade_code === selectedTradeCode
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Stock Data Visualization
        </h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Select Trade Code:
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md mt-1"
            onChange={(e) => setSelectedTradeCode(e.target.value)}
            value={selectedTradeCode}
          >
            {tradeCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <LineChart
            width={800}
            height={400}
            data={filteredData}
            className="mx-auto"
          >
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="close"
              stroke="#8884d8"
            />
            <Bar yAxisId="right" dataKey="volume" fill="#82ca9d" />
          </LineChart>
        </div>
      </div>
      <div className=" mt-8">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Trade Code</th>
              <th className="border border-gray-300 p-2">High</th>
              <th className="border border-gray-300 p-2">Low</th>
              <th className="border border-gray-300 p-2">Open</th>
              <th className="border border-gray-300 p-2">Close</th>
              <th className="border border-gray-300 p-2">Volume</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item.id}
                className="text-center border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="border border-gray-300 p-2" data-label="Date">
                  <input
                    type="text"
                    value={item.date}
                    onChange={(e) =>
                      handleUpdate(item.id, "date", e.target.value)
                    }
                    className="w-full"
                  />
                </td>
                <td
                  className="border border-gray-300 p-2"
                  data-label="Trade Code"
                >
                  <input
                    type="text"
                    value={item.trade_code}
                    onChange={(e) =>
                      handleUpdate(item.id, "trade_code", e.target.value)
                    }
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-300 p-2" data-label="High">
                  <input
                    type="text"
                    value={item.high}
                    onChange={(e) =>
                      handleUpdate(item.id, "high", e.target.value)
                    }
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-300 p-2" data-label="Low">
                  <input
                    type="text"
                    value={item.low}
                    onChange={(e) =>
                      handleUpdate(item.id, "low", e.target.value)
                    }
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-300 p-2" data-label="Open">
                  <input
                    type="text"
                    value={item.open}
                    onChange={(e) =>
                      handleUpdate(item.id, "open", e.target.value)
                    }
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-300 p-2" data-label="Close">
                  <input
                    type="text"
                    value={item.close}
                    onChange={(e) =>
                      handleUpdate(item.id, "close", e.target.value)
                    }
                    className="w-full"
                  />
                </td>
                <td className="border border-gray-300 p-2" data-label="Volume">
                  <input
                    type="text"
                    value={item.volume}
                    onChange={(e) =>
                      handleUpdate(item.id, "volume", e.target.value)
                    }
                    className="w-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
