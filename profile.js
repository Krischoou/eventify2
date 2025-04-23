document.addEventListener("DOMContentLoaded", function () {
    const editProfileBtn = document.getElementById("editProfileBtn");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");

    editProfileBtn.addEventListener("click", function () {
        // Превръщаме полетата в редактируеми
        if (usernameInput.disabled) {
            usernameInput.disabled = false;
            emailInput.disabled = false;
            editProfileBtn.textContent = "Запази промените";
        } else {
            // Записваме новите стойности (тук може да добавим логика за запазване в локално хранилище или сървър)
            usernameInput.disabled = true;
            emailInput.disabled = true;
            editProfileBtn.textContent = "Редактирай профил";
            alert("Промените бяха запазени!");
        }
    });
});
