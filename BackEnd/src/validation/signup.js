const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("signupfirstName").value.trim();
  const lastName = document.getElementById("signuplastName").value.trim();
  const email = document.getElementById("signupemail").value.trim();
  const password = document.getElementById("signuppassword").value;
  const newsletter = document.getElementById("signupnewsletter").checked;
  const messageEl = document.getElementById("message");

  // Clear previous message
  messageEl.innerText = "";

  // Regex patterns
  const nameRegex = /^[A-Za-z]{2,30}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;


  // Frontend validation with suggestions
  if (!firstName) {
    messageEl.innerText = "Please enter your first name.";
    return;
  }
  if (!nameRegex.test(firstName)) {
    messageEl.innerText = "First name must be 2-30 letters, no numbers/symbols.";
    return;
  }

  if (!lastName) {
    messageEl.innerText = "Please enter your last name.";
    return;
  }
  if (!nameRegex.test(lastName)) {
    messageEl.innerText = "Last name must be 2-30 letters, no numbers/symbols.";
    return;
  }

  if (!email) {
    messageEl.innerText = "Please enter your email.";
    return;
  }
  if (!emailRegex.test(email)) {
    messageEl.innerText = "Please enter a valid email (example@mail.com).";
    return;
  }

  if (!password) {
    messageEl.innerText = "Please enter a password.";
    return;
  }
  if (!passwordRegex.test(password)) {
    messageEl.innerText = "Password must be 6+ characters, include 1 uppercase letter and 1 digit.";
    return;
  }

  // ✅ All validations passed — send request
  const name = `${firstName} ${lastName}`;

  if (!/\S+@\S+\.\S+/.test(email)) {
    document.getElementById("message").innerText = "Invalid email format.";
    return;
  }
  

  try {
    const response = await fetch("http://localhost:8700/yoga/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        phone: 45666,
        address: "dfasdvfdv"
      }),
    });

    const data = await response.json();

    if (response.status === 201) {
      alert("Signup successful!");
      window.location.href = "Home.html"; // Redirect to login
    } else {
      document.getElementById("message").innerText = data.message || "Signup failed";
    }
  } catch (error) {
    console.error(error);
    document.getElementById("message").innerText = "Server error";
  }
});