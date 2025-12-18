function UserForm({
    name,
    email,
    role,
    editid,
    setname,
    setemail,
    setrole,
    handleadduser,
    isactive,
    setisactive,
}) {
    
  return (
     <form onSubmit={handleadduser}>
      <div className={styles.formContainer}>
        <input className={styles.input}
          placeholder="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <input className={styles.input}
          placeholder="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <select className={styles.input} value={role} onChange={(e) => setrole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className={`w-full p-2 border rounded mb-4 ${isactive ? 'bg-green-500' : 'bg-red-500'}`} type="button" onClick={() => setisactive(!isactive)}>
          {isactive ? "Active" : "Inactive"}
        </button>
        <button className="w-full p-2 border rounded mb-4" type="submit">{editid ? "Update User" : "Add User"}</button>
      </div>
      </form>
  );
}
const styles = {
  formContainer: "w-full  flex flex-col items-center gap-2 mb-4 border border-gray-300 p-4 rounded",
  input: "w-full p-2 border rounded mb-4",
}

export default UserForm;