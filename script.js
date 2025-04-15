function consultarIP() {
  const ip = document.getElementById("ipInput").value;
  const resultado = document.getElementById("resultado");

  if (!ip) {
    alert("Digite um IP válido!");
    return;
  }

  resultado.innerText = "Consultando IP...";

  fetch(`http://ip-api.com/json/${ip}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`)
    .then(response => response.json())
    .then(data => {
      if (data.status === "success") {
        resultado.innerText = `
=====================================
       CONSULTA IP COMPLETA
=====================================

IP: ${data.query}
Continente: ${data.continent} (${data.continentCode})
País: ${data.country} (${data.countryCode})
Região: ${data.regionName} (${data.region})
Cidade: ${data.city}
CEP: ${data.zip}
Fuso Horário: ${data.timezone}

Latitude: ${data.lat}
Longitude: ${data.lon}

Provedor (ISP): ${data.isp}
Organização: ${data.org}
Sistema Autônomo (AS): ${data.as}

=====================================
`;
      } else {
        resultado.innerText = "Erro: " + data.message;
      }
    })
    .catch(() => {
      resultado.innerText = "Erro ao consultar IP.";
    });
}
