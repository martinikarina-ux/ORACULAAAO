/* ======================================================
   index.js — lógica exclusiva da página inicial (index.html)
   Pega os dados do formulário, calcula signo + arcano,
   guarda no sessionStorage e redireciona pra resultado.html
   (é assim que a atividade pede: "clique em um botão que
   irá redireciona-lo para uma outra página")
   ====================================================== */

document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const nascimento = document.getElementById('nascimento').value;
  if (!nome || !nascimento) return;

  // Guarda os dois valores puros de entrada; quem calcula o
  // signo/arcano é a página de resultado (resultado.js), usando
  // as funções de dados.js
  const registro = { nome, nascimento, data: new Date().toISOString() };

  // "Cadastro" simples: guarda o histórico de consultas feitas
  // neste navegador (não é enviado pra nenhum servidor)
  try {
    const lista = JSON.parse(localStorage.getItem('oraculo_consultas') || '[]');
    lista.push(registro);
    localStorage.setItem('oraculo_consultas', JSON.stringify(lista));
  } catch (err) {
    console.warn('Não foi possível salvar o histórico localmente', err);
  }

  // Guarda a consulta atual pra resultado.html ler
  sessionStorage.setItem('oraculo_atual', JSON.stringify(registro));

  // Redireciona pra página de resultado
  window.location.href = 'resultado.html';
});
