function consultarIP() {
  const ip = document.getElementById("ipInput").value;
  const resultado = document.getElementById("resultado");

  if (!ip) {
    alert("Digite um IP válido!");
    return;
  }

  resultado.innerText = "Consultando IP...";

  fetch(`https://ipwho.is/${ip}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        resultado.innerText = `
=====================================
        CONSULTA IP COMPLETA
=====================================

IP: ${data.ip}
Continente: ${data.continent} (${data.continent_code})
País: ${data.country} (${data.country_code})
Região: ${data.region}
Cidade: ${data.city}
CEP: ${data.postal}
Fuso Horário: ${data.timezone.id}

Latitude: ${data.latitude}
Longitude: ${data.longitude}

Provedor (ISP): ${data.connection.isp}
Tipo de Conexão: ${data.connection.type}
Organização: ${data.connection.organization}

=====================================
`;
      } else {
        resultado.innerText = "Erro: IP inválido ou não encontrado.";
      }
    })
    .catch(() => {
      resultado.innerText = "Erro ao consultar IP.";
    });
}
