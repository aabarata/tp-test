import { User } from "../@types/user";

const USER_BASE_URL = "https://randomuser.me/api/";

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch(
      `${USER_BASE_URL}?exc=dob,registered,location&results=5`
    );
    const usersResponse = await response.json();
    return usersResponse.results;
  } catch (error) {
    return Promise.reject(new Error("Error fetching users"));
  }
}
