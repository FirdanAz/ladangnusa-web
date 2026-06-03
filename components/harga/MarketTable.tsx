import { formatCurrency } from "@/lib/utils";
import { RiskBadge } from "@/components/ui/RiskBadge";
import type { CommodityPrice } from "@/types";

interface MarketTableProps {
  data: CommodityPrice[];
}

export function MarketTable({ data }: MarketTableProps) {
  return (
    <div className="card-base" style={{ overflow: "hidden" }}>
      <div style={{ padding: "18px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 4 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Daftar Harga Hari Ini</div>
        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
          <i className="bi bi-clock" /> Update: {data[0]?.updatedAt ?? "-"}
        </div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="market-table">
          <thead>
            <tr>
              <th>Komoditas</th>
              <th>Harga</th>
              <th>Perubahan</th>
              <th>7 Hari</th>
              <th>Satuan</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="commodity-row">
                    <div className="commodity-icon">{item.emoji}</div>
                    <div>
                      <div className="commodity-name">{item.name}</div>
                      <div className="commodity-unit">{item.category}</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)" }}>
                  {formatCurrency(item.price)}
                </td>
                <td className={item.change > 0 ? "price-up" : "price-down"}>
                  <i className={`bi ${item.change > 0 ? "bi-caret-up-fill" : "bi-caret-down-fill"}`} />
                  {" "}{item.change > 0 ? "+" : ""}{formatCurrency(item.change)}
                </td>
                <td className={item.changePercent7d > 0 ? "price-up" : "price-down"}>
                  {item.changePercent7d > 0 ? "+" : ""}{item.changePercent7d}%
                </td>
                <td style={{ color: "var(--text-muted)", fontSize: 13 }}>/{item.unit}</td>
                <td>
                  {item.trend === "up" ? (
                    <RiskBadge level="Rendah" style={{ fontSize: 11 }}>📈 Naik</RiskBadge>
                  ) : item.trend === "down" ? (
                    <RiskBadge level="Tinggi" style={{ fontSize: 11 }}>📉 Turun</RiskBadge>
                  ) : (
                    <RiskBadge level="Sedang" style={{ fontSize: 11 }}>➡ Stabil</RiskBadge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
