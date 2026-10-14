
const simbolos = `
H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar
K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr
Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe
Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu
Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn
Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr
Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og
`.trim().split(/\s+/);

const nomes = `
Hidrogênio Hélio Lítio Berílio Boro Carbono Nitrogênio Oxigênio Flúor Neônio
Sódio Magnésio Alumínio Silício Fósforo Enxofre Cloro Argônio
Potássio Cálcio Escândio Titânio Vanádio Cromo Manganês Ferro Cobalto Níquel Cobre Zinco Gálio Germânio Arsênio Selênio Bromo Criptônio
Rubídio Estrôncio Ítrio Zircônio Nióbio Molibdênio Tecnécio Rutênio Ródio Paládio Prata Cádmio Índio Estanho Antimônio Telúrio Iodo Xenônio
Césio Bário Lantânio Cério Praseodímio Neodímio Promécio Samário Európio Gadolínio Térbio Disprósio Hólmio Érbio Túlio Itérbio Lutécio
Háfnio Tântalo Tungstênio Rênio Ósmio Irídio Platina Ouro Mercúrio Tálio Chumbo Bismuto Polônio Astato Radônio
Frâncio Rádio Actínio Tório Protactínio Urânio Netúnio Plutônio Amerício Cúrio Berquélio Califórnio Einstênio Férmio Mendelévio Nobélio Laurêncio
Rutherfórdio Dúbnio Seabórgio Bóhrio Hássio Meitnério Darmstádtio Roentgênio Copernício Nihônio Fleróvio Moscóvio Livermório Tenessino Oganessônio
`.trim().split(/\s+/);

const tabela = document.getElementById("tabela");
const extras = document.getElementById("extras");
const pesquisa = document.getElementById("pesquisa");
const detalhes = document.getElementById("detalhes");

const elementos = simbolos.map((simbolo, i) => ({
  numero: i + 1,
  simbolo,
  nome: nomes[i]
}));

// Posições dos elementos nas 7 linhas principais.
// Cada par contém o símbolo e a coluna (grupo).
const linhas = [
  [["H", 1], ["He", 18]],
  [["Li", 1], ["Be", 2], ["B", 13], ["C", 14],
   ["N", 15], ["O", 16], ["F", 17], ["Ne", 18]],
  [["Na", 1], ["Mg", 2], ["Al", 13], ["Si", 14],
   ["P", 15], ["S", 16], ["Cl", 17], ["Ar", 18]],
  [["K", 1], ["Ca", 2], ["Sc", 3], ["Ti", 4],
   ["V", 5], ["Cr", 6], ["Mn", 7], ["Fe", 8],
   ["Co", 9], ["Ni", 10], ["Cu", 11], ["Zn", 12],
   ["Ga", 13], ["Ge", 14], ["As", 15], ["Se", 16],
   ["Br", 17], ["Kr", 18]],
  [["Rb", 1], ["Sr", 2], ["Y", 3], ["Zr", 4],
   ["Nb", 5], ["Mo", 6], ["Tc", 7], ["Ru", 8],
   ["Rh", 9], ["Pd", 10], ["Ag", 11], ["Cd", 12],
   ["In", 13], ["Sn", 14], ["Sb", 15], ["Te", 16],
   ["I", 17], ["Xe", 18]],
  [["Cs", 1], ["Ba", 2], ["Hf", 4], ["Ta", 5],
   ["W", 6], ["Re", 7], ["Os", 8], ["Ir", 9],
   ["Pt", 10], ["Au", 11], ["Hg", 12], ["Tl", 13],
   ["Pb", 14], ["Bi", 15], ["Po", 16], ["At", 17],
   ["Rn", 18]],
  [["Fr", 1], ["Ra", 2], ["Rf", 4], ["Db", 5],
   ["Sg", 6], ["Bh", 7], ["Hs", 8], ["Mt", 9],
   ["Ds", 10], ["Rg", 11], ["Cn", 12], ["Nh", 13],
   ["Fl", 14], ["Mc", 15], ["Lv", 16], ["Ts", 17],
   ["Og", 18]]
];

function categoria(e) {
  const n = e.numero;

  if (n >= 57 && n <= 71) return "Lantanídeo";
  if (n >= 89 && n <= 103) return "Actinídeo";

  if ([2, 10, 18, 36, 54, 86, 118].includes(n))
    return "Gás nobre";

  if ([9, 17, 35, 53, 85, 117].includes(n))
    return "Halogênio";

  if ([5, 14, 32, 33, 51, 52].includes(n))
    return "Semimetal";

  if ([1, 6, 7, 8, 15, 16, 34].includes(n))
    return "Não metal";

  if ([13, 31, 49, 50, 81, 82, 83, 84, 113, 114, 115, 116].includes(n))
    return "Metal pós-transição";

  if ([3, 4, 11, 12, 19, 20, 37, 38, 55, 56, 87, 88].includes(n))
    return "Metal representativo";

  if (n >= 89 && n <= 103) return "Actinídeo";
  if (n >= 57 && n <= 71) return "Lantanídeo";

  return "Metal de transição";
}

function classeCor(cat) {
  const classes = {
    "Não metal": "nao-metal",
    "Metal de transição": "transicao",
    "Metal representativo": "metal",
    "Metal pós-transição": "outro-metal",
    "Gás nobre": "gas-nobre",
    "Semimetal": "metaloide",
    "Halogênio": "halogenio",
    "Lantanídeo": "lantanideo",
    "Actinídeo": "actinideo"
  };

  return classes[cat] || "metal";
}

function criarElemento(e, container, coluna, linha) {
  const cat = categoria(e);
  const botao = document.createElement("button");

  botao.type = "button";
  botao.className = `elemento ${classeCor(cat)}`;
  botao.style.gridColumn = coluna;
  
  if (linha) {
    botao.style.gridRow = linha;
  }

  botao.dataset.numero = e.numero;
  botao.dataset.nome = e.nome.toLocaleLowerCase("pt-BR");
  botao.dataset.simbolo = e.simbolo.toLowerCase();

  botao.innerHTML = `
    <span class="numero">${e.numero}</span>
    <span class="simbolo">${e.simbolo}</span>
    <span class="nome">${e.nome}</span>
  `;

  botao.addEventListener("click", () => mostrarDetalhes(e, botao));
  container.appendChild(botao);
}

function mostrarDetalhes(e, botao) {
  document.querySelectorAll(".elemento").forEach(el => {
    el.classList.remove("selecionado");
  });

  botao.classList.add("selecionado");

  detalhes.innerHTML = `
    <h2>${e.nome} (${e.simbolo})</h2>
    <p><strong>Número atômico:</strong> ${e.numero}</p>
    <p><strong>Categoria:</strong> ${categoria(e)}</p>
    <p><strong>Símbolo químico:</strong> ${e.simbolo}</p>
  `;
}

// Monta a tabela principal.
linhas.forEach((linha, i) => {
  linha.forEach(([simbolo, grupo]) => {
    const e = elementos.find(el => el.simbolo === simbolo);
    if (e) criarElemento(e, tabela, grupo, i + 1);
  });
});

// Monta as duas linhas especiais.
elementos.forEach(e => {
  if (e.numero >= 57 && e.numero <= 71) {
    criarElemento(e, extras, e.numero - 56, 1);
  }

  if (e.numero >= 89 && e.numero <= 103) {
    criarElemento(e, extras, e.numero - 88, 2);
  }
});

// Pesquisa por nome, símbolo ou número atômico.
pesquisa.addEventListener("input", () => {
  const termo = pesquisa.value.trim().toLocaleLowerCase("pt-BR");

  document.querySelectorAll(".elemento").forEach(botao => {
    const corresponde =
      botao.dataset.nome.includes(termo) ||
      botao.dataset.simbolo.includes(termo) ||
      botao.dataset.numero === termo;

    botao.classList.toggle("oculto", !corresponde);
  });
});
