// Author: Anderson Lot
// Year: 2022
// SETUP Principal - MAIN

// espaço para criar antes de modularizar

// -------------------------------------

const debugMode = true; // Defina como `false` em produção para desativar logs

var transicao = new Transicao();

function preload() {
  Manager.preload();
}
function setup() {
  Manager.sound.setup();
  frameRate(60);  
  canva = createCanvas(360*2,240*2);
  canva.parent('canvas');

}

function draw() {
  screen[Manager.settings.tela].draw();
  //debugLog("Desenhando Tela  " + Manager.settings.tela);
  //sala_computador.preload();
  uiMensagem.atualizar(deltaTime);
  uiMensagem.desenhar();
}