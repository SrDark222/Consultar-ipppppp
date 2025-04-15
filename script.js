function consultarIP() {
  const ip = document.getElementById("ipInput").value;
  const resultado = document.getElementById("resultado");

  if (!ip) {
    alert("Digite um IP válido!");
    return;
  }

  resultado.innerText = "Consultando IP...";

  fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,zip,lat,lon,isp,org,as,query`)
    .then(response => response.json())
    .then(data => {
      if (data.status === "success") {
        resultado.innerText = `
IP: ${data.query}
País: ${data.country}
Região: ${data.regionName}
Cidade: ${data.city}
CEP: ${data.zip}
Latitude: ${data.lat}
Longitude: ${data.lon}
ISP: ${data.isp}
Organização: ${data.org}
AS: ${data.as}
        `;
      } else {
        resultado.innerText = "Erro: " + data.message;
      }
    })
    .catch(() => {
      resultado.innerText = "Erro ao consultar IP.";
    });
}
