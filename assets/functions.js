// Author: Anderson Lot
// Year: 2022

// função responsavel por fazer a transicao das telas, esmaece a tela atual e envia o user para a tela  de destino. Essa função atualiza a variável _frame_inicio (valor do frame que uma tela iniciou ).

/**
 * Essa função imprime no console desde que a variável debugMode esteja ativada
 * 
 * @param  {...any} args - O que será mostrado no console
 */
function debugLog(...args) {
  if (debugMode) console.log(...args);
}


// Observer que será adicionado ao relógio
function criaContadorDeCliques(_cliques,_tempo,_mensagem,_recorrencia=false) {
  let recorrencia=_recorrencia;
  let cliques=_cliques||3;
  let tempo=_tempo||3000;
  let mensagem = _mensagem ||"Atingiu contagem";
  let contador_cliques = 0;
  let tempo_primeiro_clique = null;
  let aviso_enviado = false;

  return function (evento) {
    if(evento!="click"){
      return;
    }
    if (aviso_enviado) return;
    const tempo_atual = millis();
    if (tempo_primeiro_clique === null) {
      tempo_primeiro_clique = tempo_atual;
    }
    if (tempo_atual - tempo_primeiro_clique <= tempo) {
      contador_cliques++;
    } else {
      contador_cliques = 1;
      tempo_primeiro_clique = tempo_atual;
    }
    if (contador_cliques >= cliques) {
      uiMensagem.exibir(mensagem,3000);
      if(!recorrencia){
      aviso_enviado = true;
      }
    }
  };
}

/**
 * Adiciona um comportamento dentro da função att() de um objeto 
 * 
 * @param {objeto} objeto -Objeto deve possuir método att()
 * @param {function} novaFuncao -Função a ser adicionada
 */
function adicionarComportamentoExtra(objeto, novaFuncao) {
  const attOriginal = objeto.att;

  objeto.att = function (deltaTime) {
    // Primeiro executa o original
    attOriginal.call(this, deltaTime);

    // Depois executa a nova função extra
    novaFuncao.call(this, deltaTime);
  };
}

/**
 * Função cria efeito de texto digitado em tela. Para aceletar a digitação basta alterar o valor de _velocidade_digitacao (VALOR MÁXIMO é 1). Se não tiver argumento o valor será de 0.7.
 * 
 */
function digitar(_texto, position, _velocidade_digitacao, _largura, _comSom, memoria) {
  if (!memoria.frameInicio) {
    memoria.frameInicio = screen[Manager.settings.tela].frame;
    memoria.isWorking = true;
  }
  let _caracteres_a_serem_mostrados;
  if (memoria.isWorking) {
    _caracteres_a_serem_mostrados = round((screen[Manager.settings.tela].frame - memoria.frameInicio) * _velocidade_digitacao, 0);
    memoria.linhasPuladas = 0;
    memoria.tamanhoLinha = 0;
    let pular_linha = false;
    for (let i = 0; i < _caracteres_a_serem_mostrados; i++) {
      let _digitando = false;
      if (memoria.tamanhoLinha <= _largura && !_digitando) {
        _digitando = true;
        if (_texto[i - memoria.linhasPuladas] !== "\n") {
          memoria.tamanhoLinha++;
        }
        if (_texto[i - memoria.linhasPuladas] === "\n") {
          memoria.tamanhoLinha = 0;
        }
        memoria.textoNovo[i] = _texto[i - memoria.linhasPuladas];
        if (memoria.textoNovo[i] === " ")
          memoria.posUltimoEspaco = i;
      }
      if (memoria.tamanhoLinha > _largura && !_digitando) {
        _digitando = true;
        memoria.tamanhoLinha = 0;
        memoria.linhasPuladas++;
        if (i - memoria.posUltimoEspaco > _largura)
          memoria.textoNovo[i] = "-\n";
        if (i - memoria.posUltimoEspaco <= _largura) {
          i = memoria.posUltimoEspaco + 1;
          memoria.textoNovo[i] = "\n";
        }
      }
    }
  }
  if (memoria.textoNovo.length >= _texto.length + memoria.linhasPuladas) {
    memoria.isWorking = false;
    memoria.done = true;
  }
  if (_caracteres_a_serem_mostrados > memoria.quantChars && _comSom)
    playCharSong(_texto[_caracteres_a_serem_mostrados - 1 - memoria.linhasPuladas]);
  memoria.quantChars = _caracteres_a_serem_mostrados;
  text(memoria.textoNovo.join(""), position[0], position[1]);
  return memoria;
}

/**
 *Toca som se for uma letra 
 * @param {char} caractere 
 * @returns 
 */
function playCharSong(caractere) {
  if (isLetter(caractere)) {
    return Manager.sound.play("digito");
  }
  return Manager.sound.stop("digito");
}

/**
 * Retorna se é letra
 * @param {char} caracter 
 * @returns {bollean} True se for letra
 */
function isLetter(caracter) {
  if (["!", ".", "?", ",", ":", ";", " ", "\n"].includes(caracter)){
    debugLog("não é letra");
    return false;
  }
    return true;
}

function isMouseOver(_x1, _y1, _x2, _y2) {
  return (mouseX > _x1 && mouseX < _x2 &&
    mouseY > _y1 &&
    mouseY < _y2);
}

function isMouseOverPoligono(poligono) {
  var soma = 0;
  for (let i = 0; i < poligono.length; i++) {
    v1 = new p5.Vector(poligono[i][0] - mouseX, poligono[i][1] - mouseY);
    if (i === poligono.length - 1) {
      v2 = new p5.Vector(poligono[0][0] - mouseX, poligono[0][1] - mouseY);
    } else {
      v2 = new p5.Vector(poligono[i + 1][0] - mouseX, poligono[i + 1][1] - mouseY);
    }
    soma += v1.angleBetween(v2);
  }
  if (round(soma, 5) === round(2 * PI, 5)) {
    return true;
  }
  return false;
}
