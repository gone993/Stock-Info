import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [rates, setRates] = useState({ usd: null, jpy: null });
  const [indices, setIndices] = useState({ kospi: null, kosdaq: null });
  const [lastUpdate, setLastUpdate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Mock Data (임시 데이터)
        const mockRates = {
          usd: "1300.50",
          jpy: "9.45",
        };

        const mockIndices = {
          kospi: "2847.32",
          kosdaq: "892.45",
        };

        setRates(mockRates);
        setIndices(mockIndices);

        const now = new Date();
        setLastUpdate(now.toLocaleString("ko-KR"));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 60000); // 1분마다 업데이트
    return () => clearInterval(interval);
  }, []);

  const DataCard = ({ title, value, unit, prefix }) => (
    <div className="data-card">
      <div className="card-title">{title}</div>
      <div className="card-value">
        {loading
          ? "로딩중..."
          : value
            ? `${prefix || ""}${value}${unit || ""}`
            : "—"}
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📊 금융 지표</h1>
        <p className="subtitle">실시간 환율 & 지수</p>
      </header>

      <div className="data-grid">
        <DataCard title="USD/KRW" value={rates.usd} unit=" 원" />
        <DataCard title="JPY/KRW" value={rates.jpy} unit=" 원" />
        <DataCard title="KOSPI" value={indices.kospi} unit="" prefix="📈 " />
        <DataCard title="KOSDAQ" value={indices.kosdaq} unit="" prefix="📊 " />
      </div>

      <footer className="app-footer">
        <p>마지막 업데이트: {lastUpdate || "—"}</p>
      </footer>
    </div>
  );
}

export default App;
