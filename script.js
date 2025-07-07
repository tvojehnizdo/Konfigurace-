
function updateArea() {
  document.getElementById("areaValue").textContent = document.getElementById("area").value;
}
function updateTerraceSize() {
  document.getElementById("terraceSizeValue").textContent = document.getElementById("terraceSize").value;
}
function toggleTerrace() {
  const terraceEnabled = document.getElementById("terraceToggle").checked;
  document.getElementById("terraceSettings").style.display = terraceEnabled ? "block" : "none";
}

function generateSummary() {
  const layout = document.getElementById("layout").value;
  const area = parseInt(document.getElementById("area").value);
  const finish = document.getElementById("finish").value;
  const terrace = document.getElementById("terraceToggle").checked;
  const terraceSize = terrace ? parseInt(document.getElementById("terraceSize").value) : 0;
  const terraceRoof = document.getElementById("terraceRoof").checked;
  const wc = document.getElementById("wcCount").value;
  const bathroom = document.getElementById("bathroom").value;
  const flooring = document.getElementById("flooring").value;
  const electro = document.getElementById("electro").value;

  let pricePerM2 = finish === "hrubá stavba" ? 16500 : finish === "k dokončení" ? 24500 : 30500;
  let housePrice = area * pricePerM2;
  let terracePrice = terrace ? terraceSize * 2500 : 0;
  let electroPrice = electro === "priprava" ? 60000 : electro === "chytra" ? 165000 : 0;
  let totalPrice = housePrice + terracePrice + electroPrice;

  document.getElementById("summaryBox").innerHTML = `
    <p><strong>Dispozice:</strong> ${layout}</p>
    <p><strong>Plocha domu:</strong> ${area} m²</p>
    <p><strong>Stupeň dokončení:</strong> ${finish}</p>
    <p><strong>Cena za dům:</strong> ${housePrice.toLocaleString()} Kč</p>
    ${terrace ? `<p><strong>Terasa:</strong> ${terraceSize} m² ${terraceRoof ? "(zastřešená)" : ""}</p>` : ""}
    ${terrace ? `<p><strong>Příplatek za terasu:</strong> ${terracePrice.toLocaleString()} Kč</p>` : ""}
    <p><strong>Počet WC:</strong> ${wc}</p>
    <p><strong>Koupelna:</strong> ${bathroom}</p>
    <p><strong>Podlaha:</strong> ${flooring}</p>
    <p><strong>Elektroinstalace:</strong> ${electro}</p>
    <p><strong>Příplatek za elektroinstalaci:</strong> ${electroPrice.toLocaleString()} Kč</p>
    <h3>Celková cena: ${totalPrice.toLocaleString()} Kč</h3>
  `;
}

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const summary = document.getElementById("summaryBox");
  html2canvas(summary).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    doc.text("Rekapitulace návrhu domu", 10, 10);
    doc.addImage(imgData, "PNG", 10, 20, 180, 0);
    doc.save("rekapitulace-domu.pdf");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateTerraceSize();
  toggleTerrace();
});
