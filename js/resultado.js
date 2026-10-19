/* ======================================================
   resultado.js — lógica exclusiva da página de resultado
   Lê o que foi salvo pelo formulário (sessionStorage), calcula
   signo + arcano usando as funções de dados.js, e preenche
   a página com o resultado + interpretações.
   ====================================================== */

const registroBruto = sessionStorage.getItem('oraculo_atual');

if (!registroBruto) {
  // Se a pessoa chegou aqui direto, sem passar pelo formulário,
  // manda de volta pro início
  window.location.href = 'index.html';
} else {
  const registro = JSON.parse(registroBruto);
  const [ano, mes, dia] = registro.nascimento.split('-').map(Number);

  const signo = calcularSigno(dia, mes);
  const infoSigno = SIGNOS[signo];
  const arcano = calcularArcano(dia, mes, ano);

  // ---- Preenche o cabeçalho e o resumo do signo ----
  document.getElementById('ola').textContent = 'olá, ' + registro.nome;
  document.getElementById('simboloSigno').textContent = infoSigno.simbolo;
  document.getElementById('valorSigno').textContent = signo;
  document.getElementById('valElemento').textContent = infoSigno.elemento;
  document.getElementById('valModalidade').textContent = infoSigno.modalidade;
  document.getElementById('valPlaneta').textContent = infoSigno.planeta;

  // ---- Preenche o resumo do arcano pessoal ----
  document.getElementById('arcanoVisual').textContent = arcano.emoji;
  document.getElementById('numeroArcano').textContent = arcano.numero;
  document.getElementById('valorArcano').textContent = arcano.nome;

  // ---- Preenche os blocos de interpretação (lá embaixo) ----
  document.getElementById('interpSignoTitulo').textContent =
    signo + ' — ' + infoSigno.elemento + ' / ' + infoSigno.modalidade;
  document.getElementById('interpSignoTexto').textContent = infoSigno.texto;

  document.getElementById('interpArcanoTitulo').textContent =
    arcano.emoji + ' Arcano ' + arcano.numero + ' — ' + arcano.nome;
  document.getElementById('interpArcanoTexto').textContent = arcano.texto;

  document.getElementById('interpCombinado').innerHTML = gerarCombinado(signo, arcano);
}
