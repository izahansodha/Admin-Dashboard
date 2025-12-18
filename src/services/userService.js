const STORAGE_KEY = "users";

const DEFAULT_USERS = [
  { id: 1, name: "Izahan", email: "izahan@gmail.com", role: "admin" , isactive: true},
  { id: 2, name: "Rahul", email: "rahul@gmail.com", role: "user" , isactive: false},
  { id: 3, name: "Amit", email: "amit@gmail.com", role: "user", isactive: true},
];

// helper to simulate delay
const delay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const userService = {
  async getUsers() {
    const data = localStorage.getItem(STORAGE_KEY);

    // 👉 If database is empty, insert default users
    if (!data) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(DEFAULT_USERS)
      );
      return DEFAULT_USERS;
    }

    return JSON.parse(data);
  },

  async saveUsers(users) {
    await delay();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return users;
  },

  async addUser(newUser) {
    const users = await this.getUsers();
    const updated = [...users, newUser];
    return this.saveUsers(updated);
  },

  async updateUser(updatedUser) {
    const users = await this.getUsers();
    const updated = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    return this.saveUsers(updated);
  },

  async deleteUser(id) {
    const users = await this.getUsers();
    const updated = users.filter((u) => u.id !== id);
    return this.saveUsers(updated);
  },
};

export default userService;
