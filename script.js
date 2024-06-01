document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    
    // Vérifier si l'utilisateur a déjà une version assignée
    let version = localStorage.getItem('version');
    
    if (!version) {
        // Assigner aléatoirement une version
        version = Math.random() < 0.5 ? 'A' : 'B';
        localStorage.setItem('version', version);
    }

    const message = version === 'A' ? 'Please, make a donation!' : 'Make a donation!';

    contentDiv.innerHTML = `
        <h1>${message}</h1>
        <form id="donationForm">
            <label for="amount">Donation amount:</label>
            <input type="number" id="amount" name="amount" required>
            <button type="submit">To make a donation</button>
        </form>
    `;

    const form = document.getElementById('donationForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const amount = document.getElementById('amount').value;

        // Enregistrer le don dans le localStorage
        const donations = JSON.parse(localStorage.getItem('donations')) || [];
        donations.push({ version, amount });
        localStorage.setItem('donations', JSON.stringify(donations));

        // Rediriger vers la page de remerciement
        window.location.href = `thankyou.html?amount=${amount}`;
    });
});
