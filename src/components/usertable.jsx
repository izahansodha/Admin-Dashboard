function Usertable({
  paginatedUsers,
  editid,
  handledeleteuser,
  handleediteuser,
}) {
  return (
    <>
    <div className="overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-white">
    <table className={styles.table}>
      <thead className="bg-gray-300">
        <tr>
          <th className={styles.th}>ID</th>
          <th className={styles.th}>Email</th>
          <th className={styles.th}>Name</th>
          <th className={styles.th}>Role</th>
          <th className={styles.th}>Status</th>
          <th className={styles.th}>Action</th>
        </tr>
      </thead>

      <tbody>
        {paginatedUsers.map((user) => (
          <tr
            key={user.id}
            className={`${
              editid === user.id ? "bg-yellow-200" : "bg-white"
            } hover:bg-gray-50`}
          >
            <td className={styles.td}>{user.id}</td>
            <td className={styles.td}>{user.email}</td>
            <td className={styles.td}>{user.name}</td>
            <td className={styles.td}>{user.role}</td>

            <td className={styles.td}>
              <span
                className={`px-2 py-1 rounded text-xs text-white ${
                  user.isactive ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {user.isactive ? "Active" : "Inactive"}
              </span>
            </td>

            <td className={styles.td}>
              <button
                onClick={() => handleediteuser(user)
                }
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handledeleteuser(user.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              > 
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </>
  );
}
const styles = {
  table: "w-full border-collapse rounded mt-4",
  th:" px-3 py-2 text-left",
  td:" px-3 py-2",

};

export default Usertable;
