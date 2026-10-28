document.addEventListener("DOMContentLoaded", () => {
    const cv = document.querySelector(".cv");

    if (!cv) {
        return;
    }

    cv.style.opacity = "0";
    cv.style.transform = "translateY(40px)";

    window.setTimeout(() => {
        cv.style.transition = "all 0.8s ease";
        cv.style.opacity = "1";
        cv.style.transform = "translateY(0)";
    }, 100);
});

function downloadPDF() {
    const element = document.querySelector(".cv");
    const opt = {
        margin: 0,
        filename: 'CV-Bandjan-Kourouma.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { format: 'a4', orientation: 'portrait' }
    };
    
    // Masquer le bouton avant génération
    const downloadBtn = document.querySelector(".download");
    if (downloadBtn) {
        downloadBtn.style.display = "none";
    }

    // Générer et télécharger le PDF
    html2pdf().set(opt).from(element).save().then(() => {
        // Afficher le bouton après génération
        setTimeout(() => {
            if (downloadBtn) {
                downloadBtn.style.display = "flex";
            }
        }, 500);
    });
}

// Gérer les événements d'impression
window.addEventListener("beforeprint", () => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.body.style.backgroundColor = "white";
    
    // Forcer les couleurs
    document.documentElement.style.colorScheme = "light";
});

window.addEventListener("afterprint", () => {
    document.body.style.margin = "";
    document.body.style.padding = "";
    document.body.style.backgroundColor = "";
});
