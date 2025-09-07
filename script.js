// Donatie tracking
let currentDonationAmount = 4361;
const targetAmount = 1000;

// Functie om de progress bar bij te werken
function updateProgressBar() {
    const actualPercentage = (currentDonationAmount / targetAmount) * 100;
    const progressBarPercentage = Math.min(actualPercentage, 100);
    const progressFill = document.getElementById('progressFill');
    const currentAmountElement = document.getElementById('currentAmount');
    const progressPercentage = document.getElementById('progressPercentage');
    
    if (progressFill && currentAmountElement && progressPercentage) {
        progressFill.style.width = progressBarPercentage + '%';
        currentAmountElement.textContent = '€' + currentDonationAmount.toFixed(0);
        progressPercentage.textContent = actualPercentage.toFixed(0) + '%';
    }
}

// Simulatie van donatie (in werkelijkheid zou dit via een echte payment provider gaan)
function donate(amount) {
    // Dit is een placeholder - in werkelijkheid zou hier een echte betaallink komen
    const message = `Bedankt voor je intentie om €${amount} te doneren!\n\nIn een echte implementatie zou je nu doorgestuurd worden naar een betaalprovider zoals:\n- iDEAL\n- PayPal\n- Mollie\n- Stripe\n\nVoeg hier je echte betaallinks toe.`;
    alert(message);
    
    // Simuleer een succesvolle donatie voor demo doeleinden
    // In werkelijkheid zou dit alleen gebeuren na een succesvolle betaling
    simulateDonation(amount);
}

// Custom donatie bedrag
function customDonation() {
    const amount = prompt("Voer het bedrag in dat je wilt doneren (in euro's):");
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
        donate(parseFloat(amount));
    }
}

// Simuleer een donatie (alleen voor demo - verwijder dit in productie)
function simulateDonation(amount) {
    currentDonationAmount += amount;
    updateProgressBar();
    localStorage.setItem('donationAmount', currentDonationAmount.toString());
}

// Delen op WhatsApp
function shareWhatsApp() {
    const text = encodeURIComponent("#durftevragen voor Ise ❤️ - Help mee om Ise's laatste wens te vervullen: een onvergetelijke shopdag! " + window.location.href);
    window.open(`https://wa.me/?text=${text}`, '_blank');
}


// Link kopiëren
function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link gekopieerd naar je klembord!');
    }).catch(() => {
        // Fallback voor oudere browsers
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Link gekopieerd naar je klembord!');
    });
}

// Functie om laatste update tijd weer te geven
function updateLastUpdated() {
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        // Statische laatste update tijd - update deze handmatig bij wijzigingen
        const lastUpdateDate = new Date('2025-09-10T17:38:00+02:00'); // 10 september 2025 om 17:38
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Europe/Amsterdam'
        };
        lastUpdatedElement.textContent = lastUpdateDate.toLocaleDateString('nl-NL', options);
    }
}

// Laad opgeslagen donatie bedrag bij het laden van de pagina
document.addEventListener('DOMContentLoaded', function() {
    // Start altijd met de ingestelde waarde, negeer localStorage voor nu
    updateProgressBar();
    updateLastUpdated();
    
    // Voeg wat animatie toe aan de donatieknoppen
    const donateButtons = document.querySelectorAll('.donate-btn');
    donateButtons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Smooth scrolling voor interne links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Functie om donaties handmatig bij te werken (voor de beheerder)
function updateDonationManually(amount) {
    currentDonationAmount = amount;
    updateProgressBar();
    localStorage.setItem('donationAmount', currentDonationAmount.toString());
}

// Functie om donatie bedrag te resetten (voor testing)
function resetDonations() {
    currentDonationAmount = 0;
    updateProgressBar();
    localStorage.removeItem('donationAmount');
}

// Admin functies (verberg deze in productie of beveilig ze)
// Om te gebruiken in browser console:
// updateDonationManually(150) - zet het bedrag op €150
// resetDonations() - reset naar €0
