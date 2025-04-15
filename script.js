// Simulação de carregamento
window.onload = () => {
  setTimeout(() => {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('main-content').classList.remove('hidden');
  }, 3000); // 3 segundos de carregamento
};

// Função para consultar o IP do usuário
document.getElementById('fetch-ip-btn').addEventListener('click', function() {
  const userIp = document.getElementById('ip-input').value.trim();
  if (userIp) {
    document.getElementById('status').textContent = 'Consultando IP...';
    fetchIpInfo(userIp);
  } else {
    document.getElementById('status').textContent = 'Por favor, insira um IP válido.';
  }
});

// Função para pegar o IP do usuário
function fetchIpInfo(userIp) {
  const ipApis = [
    `https://api.ipify.org?format=json`, // IP público
    `https://ip-api.com/json/${userIp}?fields=country,region,city,isp,lat,lon,query`, // IP detalhado
    `https://ipinfo.io/${userIp}/json`  // IPInfo API
  ];

  // Consultando múltiplas APIs para detalhes do IP
  Promise.all(ipApis.map(url => fetch(url).then(res => res.json())))
    .then(data => {
      document.getElementById('ip-result').textContent = `IP: ${data[0].ip || data[1].query || data[2].ip}`;
      document.getElementById('location-result').textContent = `Localização: ${data[1].city}, ${data[1].region}, ${data[1].country}`;
      document.getElementById('status').textContent = 'Consulta concluída!';
      summarizeIpDetails(data[0], data[1]);
    })
    .catch(error => {
      document.getElementById('status').textContent = 'Erro ao consultar IP.';
      console.error('Erro:', error);
    });
}

// Função para consultar o IP atual do usuário
document.addEventListener('DOMContentLoaded', function () {
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      document.getElementById('custom-ip-result').textContent = `Seu IP: ${data.ip}`;
    })
    .catch(error => console.error('Erro ao pegar o IP:', error));
});

// Função para resumir os dados do IP usando a IA
function summarizeIpDetails(ipData, locationData) {
  const userDetails = `
    IP: ${ipData.ip}
    Localização: ${locationData.city}, ${locationData.region}, ${locationData.country}
    ISP: ${locationData.isp}
  `;
  
  const aiRequest = {
    model: "mistralai/mistral-7b-instruct",
    inputs: userDetails
  };

  fetch('https://api.openrouter.ai/v1/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer sk-or-v1-d47c1a5467ab283d5629cdda97c7228325e7148625ea13f8111
