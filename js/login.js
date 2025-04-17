    const toggleLink = document.getElementById('toggle-link');
    const formTitle = document.getElementById('form-title');
    const emailGroup = document.getElementById('email-group');
    const submitBtn = document.getElementById('submit-btn');
    let isLogin = true;

    toggleLink.addEventListener('click', (e) => {
      e.preventDefault();
      isLogin = !isLogin;

      formTitle.textContent = isLogin ? 'Login' : 'Register';
      toggleLink.textContent = isLogin ? 'Register' : 'Login';
      submitBtn.textContent = isLogin ? 'Login' : 'Register';
      emailGroup.style.display = isLogin ? 'none' : 'block';
    });

    document.getElementById('auth-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const email = document.getElementById('email').value;
      const rememberMe = document.getElementById('remember-me').checked;

      if (!username || !password || (!isLogin && !email)) {
        alert('Please fill out all required fields.');
        return;
      }

      alert(isLogin ? `Welcome back, ${username}! Remember Me: ${rememberMe}` : `Thanks for registering, ${username}!`);
      this.reset();
    });
