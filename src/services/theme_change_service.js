function changeTheme() {
    const randomElement = darkThemeColors[Math.floor(Math.random() * darkThemeColors.length)];
    document.body.style.background = randomElement;
}
