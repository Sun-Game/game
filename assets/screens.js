// Author: Anderson Lot
// Year: 2022
// Este arquivo contem as definições dos objetos Screen
// ORDEM DE EXECUÇÃO : 4

var screen = [];

for (let i = 0; i < Manager.settings.numTelas; i++) {
  screen[i] = new Screen();
}


screen[0].setup = function () {
  Manager.settings.setStartState(false);
  size = 40;
  texto = Manager.getText(Manager.getScreen(),0);
  startButton = new Botao(Manager.getText("menus","start"), [
    width / 2,
    height * 0.65,
  ]);
  loadButton = new Botao(Manager.getText("menus","load"), [
    width / 2,
    height * 0.65 + 60,
  ]);
  texto1 = new TextoDigitavel(
    texto,
    [width / 2, height / 2 - 50],
    0.15,
    null,
    false
  );
};
screen[0].loop = function () {
  background(Manager.paleta[0]);
  Manager.applyFont("pixelBold");
  push();
  textSize(size);
  fill(Manager.paleta[1]);
  textAlign(CENTER, CENTER);
  texto1.digitar();
  pop();
  startButton.draw();
  loadButton.draw();
  Manager.settings.setStartState(startButton.getState());
  if (Manager.settings.start) this.transicao.fade(1);
};
screen[1].setup = function () {
  skipButton = new Botao(Manager.getText("menus","skip"), [width / 2, height - 50]);
  texto1 = new TextoDigitavel(
    Manager.getText(Manager.settings.tela,0),
    [width / 2, height / 2 - 100],
    0.5,
    35,
    false
  );
};
screen[1].loop = function () {
  background(0);
  push();
  textAlign(CENTER, TOP);
  textSize(15);
  fill(Manager.paleta[1]);
  Manager.applyFont("pixelLigth");
  texto1.digitar();
  pop();
  skipButton.draw();
  if (skipButton.getState()) {
    this.transicao.fade(2);
  }
};
screen[2].setup = function () {
  this.reset();
  skipButton = new Botao(Manager.getText("menus","skip"), [width / 2, height - 50]);
  imgY = height + 50;
  _fundo_vermelho = 0;
  texto1 = new TextoDigitavel(
    Manager.getText(Manager.settings.tela,0),
    [width / 2, height / 2 - 200],
    0.5,
    35,
    false
  );
};
screen[2].loop = function () {
  background(0);
  background(100, 20, 20, _fundo_vermelho);
  push();
  textAlign(CENTER, TOP);
  textSize(15);
  fill(Manager.paleta[1]);
  Manager.applyFont("pixelLigth");
  texto1.digitar();
  Manager.image.brasaoSUN.resize(25 * 5, 33 * 5);
  if (this.frame > 400) {
    _fundo_vermelho = lerp(_fundo_vermelho, 255, 0.01);
    Manager.sound.play("hinoSUN",true);
    let imgY_alvo = 200 + 10 * sin(this.frame / 50);
    let imgY_velocidade = 0.05;
    imgY = lerp(imgY, imgY_alvo, imgY_velocidade);
    image(Manager.image.brasaoSUN, width / 2 - 65, imgY);
  }

  pop();
  skipButton.draw();
  if (skipButton.getState()) {
    Manager.sound.stop("hinoSUN");
    this.transicao.fade(3);
  }
};
screen[3].setup = function () {
  skipButton = new Botao(Manager.getText("menus","ok"), [100, 150]);
  sala_computador.setup();
  texto1 = new TextoDigitavel(Manager.getText(Manager.settings.tela,0), [25, 25], 0.7, 35, false);
};
screen[3].loop = function () {
  sala_computador.draw();
  background(0,230);
  push();
  textAlign(LEFT, TOP);
  textSize(90);
  fill(Manager.paleta[1]);
  textSize(12);
  Manager.applyFont("pixelLigth");
  texto1.digitar();
  pop();
  skipButton.draw();
  if (skipButton.getState()) {
    this.transicao.cut(4);
  }
};
screen[4].setup = function () {
  sala_computador.setup();

};
screen[4].loop = function () {
  sala_computador.draw();
  sala_computador.att(deltaTime);
  if(sala_computador.itens.broche.pos[0]>700){
    this.transicao.fade(0);
  }
};