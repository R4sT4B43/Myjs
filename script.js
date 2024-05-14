document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('passwordPopup');
    const passwordInput = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitButton');
    const getPasswordButton = document.getElementById('getPasswordButton');
    const errorNotification = document.getElementById('errorNotification');
    
    const showPasswordCheckbox = document.getElementById('showPasswordCheckbox');
    const passwordShownText = document.getElementById('passwordShownText');
    const showPasswordCheckboxR = document.getElementById('showPasswordCheckboxR');
    const passwordShownTextR = document.getElementById('passwordShownTextR');
    
    showPasswordCheckboxR.addEventListener('change', function() {
        if (showPasswordCheckboxR.checked) {
            registerPasswordInput.type = 'text';
            registerConfirmPasswordInput.type = 'text';
            passwordShownTextR.style.display = 'inline'; // Tampilkan teks jika dicentang
        } else {
            registerPasswordInput.type = 'password';
            registerConfirmPasswordInput.type = 'password';
            passwordShownTextR.style.display = 'none'; // Sembunyikan teks jika tidak dicentang
        }
    });
    
    showPasswordCheckbox.addEventListener('change', function() {
        if (showPasswordCheckbox.checked) {
            passwordInput.type = 'text';
            passwordShownText.style.display = 'inline'; // Tampilkan teks jika dicentang
        } else {
            passwordInput.type = 'password';
            passwordShownText.style.display = 'none'; // Sembunyikan teks jika tidak dicentang
        }
    });

    // Tampilkan pop-up saat halaman dimuat
    popup.style.display = 'block';

    let wrongAttempts = 0; // Variabel untuk menghitung percobaan salah
    
    const usernameInput = document.getElementById('usernameInput');
    
    submitButton.addEventListener('click', function() {
        const email = usernameInput.value;
        const password = passwordInput.value;
        
        if (email === '') { // Cek jika password kosong
            errorNotification.textContent = 'Email tidak boleh kosong!';
            errorNotification.style.display = 'block';
        } else if (password=== '') { // Cek jika password kosong
            errorNotification.textContent = 'Password tidak boleh kosong!';
            errorNotification.style.display = 'block';
        } else { firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Password benar, tutup pop-up
                popup.classList.add('fadeOut'); // Tambahkan kelas fadeOut
                setTimeout(() => {
                popup.style.display = 'none'; // Tutup pop-up setelah animasi selesai
                popup.classList.remove('fadeOut'); // Hapus kelas fadeOut
            }, 500);
                // ... (reset percobaan salah, simpan password di local storage jika perlu)
            })
            .catch((error) => {
            wrongAttempts++;
            errorNotification.textContent = 'Username / Password salah!'; // Kembalikan pesan error semula
            errorNotification.style.display = 'block';
            
            if (wrongAttempts >= 4) {
              alert('Anda mencoba terlalu banyak!')
                window.location.href = 'https://www.contoh-url.com'; 
            }
        });
        if (savePasswordCheckbox.checked) {
            localStorage.setItem('blogPassword', passwordInput.value);
            localStorage.removeItem('refreshCount'); // Reset refresh count jika password disimpan ulang
        } else {
            localStorage.removeItem('blogPassword');
        }
        }
    });
    const registerPopup = document.getElementById('registerPopup');
    const registerLinkButton = document.getElementById('registerLinkButton');
    const LoginLinkButton = document.getElementById('LoginLinkButton');
    const registerButton = document.getElementById('registerButton');
    const registerEmailInput = document.getElementById('registerEmailInput');
    const registerConfirmPasswordInput = document.getElementById('registerConfirmPasswordInput');
    const registerPasswordInput = document.getElementById('registerPasswordInput');
    const registerErrorNotification = document.getElementById('registerErrorNotification');

    registerLinkButton.addEventListener('click', function () {
      registerErrorNotification.textContent = '';
      registerErrorNotification.style.display = 'block';
        passwordPopup.style.display = 'none'; // Sembunyikan popup login
        registerPopup.style.display = 'block'; // Tampilkan popup register
    });
    
    LoginLinkButton.addEventListener('click', function () {
      errorNotification.textContent = '';
      errorNotification.style.display = 'block';
        passwordPopup.style.display = 'block'; // Sembunyikan popup login
        registerPopup.style.display = 'none'; // Tampilkan popup register
    });
    
    const getPasswordPopup = document.getElementById('getPasswordPopup');
    const getPasswordLinkButton = document.getElementById('getPasswordLinkButton');
    const getLoginLinkButton = document.getElementById('getLoginLinkButton');
    const sendResetEmailButton = document.getElementById('sendResetEmailButton');
    const getEmailInput = document.getElementById('getEmailInput');
    const getPasswordErrorNotification = document.getElementById('getPasswordErrorNotification');

    getPasswordLinkButton.addEventListener('click', function () {
      errorNotification.textContent = '';
      errorNotification.style.display = 'block';
        passwordPopup.style.display = 'none'; // Sembunyikan popup login
        registerPopup.style.display = 'none'; // Sembunyikan popup register
        getPasswordPopup.style.display = 'block'; // Tampilkan popup get password
    });
    
    getLoginLinkButton.addEventListener('click', function () {
      getPasswordErrorNotification.textContent = '';
      getPasswordErrorNotification.style.display = 'block';
        passwordPopup.style.display = 'block'; // Sembunyikan popup login
        registerPopup.style.display = 'none'; // Sembunyikan popup register
        getPasswordPopup.style.display = 'none'; // Tampilkan popup get password
    });
    
    sendResetEmailButton.addEventListener('click', function () {
    const email = getEmailInput.value;

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        getPasswordErrorNotification.textContent = 'Email tidak valid.';
        getPasswordErrorNotification.style.display = 'block';
        return;
    }

    // Coba kirim email reset password tanpa memeriksa keberadaan email
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            getPasswordErrorNotification.textContent = 'Email reset password telah dikirim.';
            getPasswordErrorNotification.style.display = 'block';
        })
        .catch((error) => {
            if (error.code === 'auth/user-not-found') {
                // Email tidak terdaftar
                getPasswordErrorNotification.textContent = 'Email tidak terdaftar.';
            } else {
                // Tangani error lain yang mungkin terjadi
                getPasswordErrorNotification.textContent = 'Terjadi kesalahan. Silakan coba lagi.';
            }
            getPasswordErrorNotification.style.display = 'block';
        });
});

    
    registerButton.addEventListener('click', function () {
        const email = registerEmailInput.value;
        const password = registerPasswordInput.value;
        const confirmPassword = registerConfirmPasswordInput.value;
        const gmailRegex = /^[^\s@]+@gmail\.com$/;
        
        if (email === '') { // Cek jika password kosong
            registerErrorNotification.textContent = 'Email tidak boleh kosong!';
            registerErrorNotification.style.display = 'block';
        } else if (!gmailRegex.test(email)) {
            registerErrorNotification.textContent = 'Hanya email Gmail yang diperbolehkan!';
            registerErrorNotification.style.display = 'block';
            return; // Hentikan proses registrasi jika email tidak valid
        } else if (password=== '') { // Cek jika password kosong
            registerErrorNotification.textContent = 'Password tidak boleh kosong!';
            registerErrorNotification.style.display = 'block';
        } else if (confirmPassword=== '') { // Cek jika password kosong
            registerErrorNotification.textContent = 'Password Konfimasi tidak boleh kosong!';
            registerErrorNotification.style.display = 'block';
        } else if (password !== confirmPassword) {
            registerErrorNotification.textContent = 'Password dan Confirm Password tidak cocok!';
            registerErrorNotification.style.display = 'block';
        } else {firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              
              popup.classList.add('fadeOut'); // Tambahkan kelas fadeOut
              setTimeout(() => {
                passwordPopup.style.display = 'block';
                registerPopup.style.display = 'none';
                popup.classList.remove('fadeOut');
            }, 500);
            
            })
            .catch((error) => {
                
                registerErrorNotification.textContent = error.message;
                registerErrorNotification.style.display = 'block';
            });
        }
    });
    const savePasswordCheckbox = document.getElementById('savePasswordCheckbox');
    const passwordSavedText = document.getElementById('passwordSavedText');
    
    savePasswordCheckbox.addEventListener('change', function() {
        if (savePasswordCheckbox.checked) {
            passwordSavedText.style.display = 'inline'; // Tampilkan teks jika dicentang
        } else {
            passwordSavedText.style.display = 'none'; // Sembunyikan teks jika tidak dicentang
        }
    });

    // Cek jumlah refresh halaman
    let refreshCount = localStorage.getItem('refreshCount') || 0;
    refreshCount++;
    localStorage.setItem('refreshCount', refreshCount);

    // Cek apakah password sudah disimpan di local storage
    const savedPassword = localStorage.getItem('blogPassword');
    if (savedPassword && refreshCount <= 3) {
        passwordInput.value = savedPassword;
        savePasswordCheckbox.checked = true;
        popup.style.display = 'none';
    } else {
        // Hapus password dan uncheck checkbox setelah 3 kali refresh
        localStorage.removeItem('blogPassword');
        savePasswordCheckbox.checked = false;
    }
});
