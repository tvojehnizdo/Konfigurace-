
function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const box = document.getElementById("summaryBox");

  html2canvas(box).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    doc.setFontSize(14);
    doc.text("Rekapitulace návrhu domu", 10, 10);
    doc.addImage(imgData, "PNG", 10, 20, 180, 0);
    doc.save("rekapitulace-domu.pdf");
  });
}

// Ukázková rekapitulace pro export
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("summaryBox").innerHTML = `
    <h2>Souhrn konfigurace</h2>
    <p><strong>Dispozice:</strong> 4+kk</p>
    <p><strong>Plocha domu:</strong> 120 m²</p>
    <p><strong>Stupeň dokončení:</strong> na klíč</p>
    <p><strong>Cena za dům:</strong> 3 660 000 Kč</p>
    <p><strong>Terasa:</strong> 12 m² (zastřešená)</p>
    <p><strong>Příplatek za terasu:</strong> 30 000 Kč</p>
    <hr/>
    <p><strong>Počet WC:</strong> 2</p>
    <p><strong>Koupelna:</strong> sprcha + vana</p>
    <p><strong>Podlaha:</strong> vinyl</p>
    <p><strong>Elektroinstalace:</strong> Plně chytrá domácnost</p>
    <p><strong>Příplatek za elektro:</strong> 165 000 Kč</p>
    <hr/>
    <h3>Celková cena domu: 3 855 000 Kč</h3>
  `;
});
