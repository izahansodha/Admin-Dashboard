function StatCard({ title, value, subtitle }) {
  return (
    <div className={styles.card}>
      <h4 className={styles.title}>{title}</h4>
      <h2 className={styles.value}>{value}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}

const styles = {
  card: "flex flex-col bg-gray-700 shadow-md rounded p-4 w-48 text-white",
  title: " text-sm",
  value: "text-2xl font-bold",
  subtitle: "text-xs mt-1",
};

export default StatCard;
