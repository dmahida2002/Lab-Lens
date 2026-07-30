
/**
 * This function can be used by other files
 * 
 * await until completion
 * @returns 
 */
export async function getApprovedUsers() {
    
    // Fetch the endpoint
    const response = await fetch("/api/users");
  
    // Error check
    if (!response.ok) {
      throw new Error("Unable to load approved users.");
    }
  
    // What is the response (in JSON format)
    const users = await response.json();
  
    // Return users as an array which is in JSON
    return users;
  }

  export async function getWorkForUser(appUserId) {
    const response = await fetch(`/api/work/${appUserId}`);
  
    if (!response.ok) {
      throw new Error("Unable to load assigned work.");
    }
  
    const workItems = await response.json();
  
    return workItems;
  }