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
    element.style.zoom = "1";
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
        fitCV();
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

// Garde la mise en page CV (2 colonnes) sur petit écran en réduisant la page
function fitCV() {
    const cv = document.querySelector(".cv");
    if (!cv) {
        return;
    }
    cv.style.zoom = "1";
    const pad = window.innerWidth > 900 ? 40 : 0;
    const scale = Math.min(1, (window.innerWidth - pad) / cv.offsetWidth);
    cv.style.zoom = scale;
}

window.addEventListener("load", fitCV);
window.addEventListener("resize", fitCV);
window.addEventListener("beforeprint", () => {
    const cv = document.querySelector(".cv");
    if (cv) {
        cv.style.zoom = "1";
    }
});
window.addEventListener("afterprint", fitCV);
