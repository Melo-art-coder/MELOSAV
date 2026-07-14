// =====================================
// MELOSAV - AUTH SYSTEM
// =====================================

// Create Account
function createAccount(name, email, gender, pin) {

    name = name.trim();
    email = email.trim().toLowerCase();
    pin = pin.trim();

    if (
        name === "" ||
        email === "" ||
        gender === "" ||
        pin === ""
    ) {
        showMessage("Please fill all fields", "error");
        return false;
    }

    let users = getUsers();

    const existingUser = users.find(
        user => user.email === email
    );

    if (existingUser) {
        showMessage("Email already exists", "error");
        return false;
    }

    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        gender: gender,
        pin: pin,
        data: createDefaultData()
    };

    users.push(newUser);

    saveUsers(users);
    saveCurrentUser(newUser);

    showMessage(`Thank you for choosing MeloSave, ${name} 💜`);

    return true;
}


// Login
function loginUser(email, pin) {

    email = email.trim().toLowerCase();
    pin = pin.trim();

    const users = getUsers();

    const user = users.find(
        account => account.email === email
    );

    if (!user) {
        showMessage("Account not found", "error");
        return false;
    }

    if (user.pin !== pin) {
        showMessage("Incorrect PIN. Try again", "error");
        return false;
    }

    saveCurrentUser(user);

    showMessage(`Welcome back, ${user.name} 💜`);

    return true;
}


// Logout
function logoutUser() {

    localStorage.removeItem("meloCurrentUser");

    window.location.href = "login.html";
}


// Switch Account
function switchAccount(email) {

    const users = getUsers();

    const user = users.find(
        account => account.email === email
    );

    if (!user) {
        showMessage("Account not found", "error");
        return false;
    }

    saveCurrentUser(user);

    showMessage(`Switched to ${user.name}'s account 💜`);

    return true;
}
