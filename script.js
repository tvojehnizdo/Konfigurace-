
function updateArea() {
  document.getElementById("areaValue").textContent = document.getElementById("area").value;
}
function updateTerraceSize() {
  document.getElementById("terraceSizeValue").textContent = document.getElementById("terraceSize").value;
}
function toggleTerrace() {
  document.getElementById("terraceSettings").style.display = document.getElementById("terraceToggle").checked ? "block" : "none";
}
function selectShape(shape) {
  document.getElementById("shape").value = shape;
  document.querySelectorAll(".shape").forEach(el => el.classList.remove("selected"));
  document.getElementById("shape-" + shape).classList.add("selected");
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
  const shape = document.getElementById("shape").value;

  let pricePerM2 = finish === "hrubá stavba" ? 16500 : finish === "k dokončení" ? 24500 : 30500;
  let housePrice = area * pricePerM2;
  let terracePrice = terrace ? terraceSize * 2500 : 0;
  let electroPrice = electro === "priprava" ? 60000 : electro === "chytra" ? 165000 : 0;
  let totalPrice = housePrice + terracePrice + electroPrice;

  document.getElementById("summaryBox").innerHTML = `
    <p><strong>Tvar domu:</strong> ${shape}</p>
    <p><strong>Dispozice:</strong> ${layout}</p>
    <p><strong>Plocha:</strong> ${area} m²</p>
    <p><strong>Stupeň dokončení:</strong> ${finish}</p>
    <p><strong>Cena za dům:</strong> ${housePrice.toLocaleString()} Kč</p>
    ${terrace ? `<p><strong>Terasa:</strong> ${terraceSize} m² ${terraceRoof ? "(zastřešená)" : ""}</p>` : ""}
    ${terrace ? `<p><strong>Příplatek za terasu:</strong> ${terracePrice.toLocaleString()} Kč</p>` : ""}
    <p><strong>Počet WC:</strong> ${wc}</p>
    <p><strong>Koupelna:</strong> ${bathroom}</p>
    <p><strong>Elektroinstalace:</strong> ${electro}</p>
    <p><strong>Příplatek za elektro:</strong> ${electroPrice.toLocaleString()} Kč</p>
    <h3>Celková cena: ${totalPrice.toLocaleString()} Kč</h3>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  updateArea();
  updateTerraceSize();
  toggleTerrace();
  selectShape("obdelnik");
});
