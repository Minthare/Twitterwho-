const signupForm = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#usernamesignup').value.trim();
    const password = document.querySelector('#passwordsignup').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
document.querySelector('#signupform').addEventListener('submit', signupForm);
