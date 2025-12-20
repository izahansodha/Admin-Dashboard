import { useAuth } from "../contexts/authcontent";

function Navbar() {
  const { logout , user} = useAuth();

  const handlelogout = () => {
    logout();
  };
  return (
    <div className={styles.navbar}>
      <div >
        <span className={styles.buttons}>Role: <span>{user.role}</span></span>
      </div>
      <div>
      <button className={styles.buttons} onClick={handlelogout}>Log out</button>
      </div>
    </div>
  );
}

const styles = {
  navbar: "w-full sm:w-full h-14 bg-gray-700 flex justify-end items-center px-4 gap-4 sm:h-16",
  buttons:"sm:w-full text-center bg-white text-black px-4 py-2 rounded hover:bg-gray-100 transition font-bold",
};

export default Navbar;
