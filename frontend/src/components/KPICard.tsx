import "./KPICard.css";

type Props = {
  title: string;
  value: string | number;
};

export default function KPICard({ title, value }: Props) {
  return (
    <div className="kpi-card">
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}