// =====================================
// MELOSAV - STORAGE SYSTEM
// =====================================

// Get all users
function getUsers() {
    return JSON.parse(localStorage.getItem("meloUsers")) || [];
}

// Save all users
function saveUsers(users) {
    localStorage.setItem(
        "meloUsers",
        JSON.stringify(users)
    );
}

// Get current logged-in user
function getCurrentUser() {
    return JSON.parse(
        localStorage.getItem("meloCurrentUser")
    ) || null;
}

// Save current logged-in user
function saveCurrentUser(user) {
    localStorage.setItem(
        "meloCurrentUser",
        JSON.stringify(user)
    );
}

// Create default data for a new user
function createDefaultData() {
    return {
        balance: 0,
        income: [],
        expenses: [],
        savings: [],
        transactions: [],
        dailyBudget: 0
    };
}

// Update user data
function updateUser(updatedUser) {

    let users = getUsers();

    users = users.map(user => {

        if (user.id === updatedUser.id) {
            return updatedUser;
        }

        return user;
    });

    saveUsers(users);
    saveCurrentUser(updatedUser);
}
