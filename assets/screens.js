// Author: Anderson Lot
// Year: 2022
// Este arquivo contem as definições dos objetos Screen
// ORDEM DE EXECUÇÃO : 4

var screen = [];

for (let i = 0; i < Manager.settings.numTelas; i++) {
  screen[i] = new Screen();
}


screen[0].setup = function () {
  Manager.settings.start = 0;
  size = 50;
  texto = texts[Manager.settings.tela][0];
  _botoes_menu = [];
  _botoes_menu[0] = new Botao("menu", texts[Manager.settings.tela][1], [
    width / 2,
    height * 0.65,
  ]);
  _botoes_menu[1] = new Botao("menu", texts[Manager.settings.tela][2], [
    width / 2,
    height * 0.65 + 60,
  ]);
  texto1 = new TextoDigitavel(
    texto,
    [width / 2, height / 2 - 50],
    0.15,
    50,
    false
  );
};
screen[0].loop = function () {
  background(Manager.paleta[0]);
  textFont(Manager.font.fonts[0]);
  push();
  textSize(size);
  fill(Manager.paleta[1]);
  textAlign(CENTER, CENTER);
  texto1.digitar();
  pop();
  //if (texto1.mem.done != true) {
  //  return;
  //}
  _botoes_menu[0].sprite.opacity = 100;
  _botoes_menu[0].draw();
  _botoes_menu[1].draw();
  Manager.settings.start = _botoes_menu[0].val;
  if (Manager.settings.start === 1) this.transicao.fade(1);
};
screen[1].setup = function () {
  exit = new Botao("opcao", "Pular", [width / 2, height - 50]);
  texto1 = new TextoDigitavel(
    texts[Manager.settings.tela][0],
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
  textFont(Manager.font.fonts[2]);
  texto1.digitar();
  pop();
  exit.draw();
  if (exit.val === 1) {
    this.transicao.fade(2);
  }
};
screen[2].setup = function () {
  this.reset();
  exit = new Botao("opcao", "Pular", [width / 2, height - 50]);
  imgY = height + 50;
  _fundo_vermelho = 0;
  texto1 = new TextoDigitavel(
    texts[Manager.settings.tela][0],
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
  textFont(Manager.font.fonts[2]);
  texto1.digitar();
  Manager.image.sprites[0].resize(25 * 5, 33 * 5);
  if (this.frame > 400) {
    _fundo_vermelho = lerp(_fundo_vermelho, 255, 0.01);
    Manager.sound.play("hinoSUN",true);
    let imgY_alvo = 200 + 10 * sin(this.frame / 50);
    let imgY_velocidade = 0.05;
    imgY = lerp(imgY, imgY_alvo, imgY_velocidade);
    image(Manager.image.sprites[0], width / 2 - 65, imgY);
  }

  pop();
  exit.draw();
  if (exit.val === 1) {
    Manager.sound.stop("hinoSUN");
    this.transicao.fade(3);
  }
};
screen[3].setup = function () {
  exit = new Botao("opcao", "OK", [100, 150]);
  sala_computador.setup();
  texto1 = new TextoDigitavel(texts[Manager.settings.tela][0], [25, 25], 0.7, 35, false);
};
screen[3].loop = function () {
  sala_computador.draw();
  background(0,230);
  push();
  textAlign(LEFT, TOP);
  textSize(90);
  fill(Manager.paleta[1]);
  textSize(12);
  textFont(Manager.font.fonts[2]);
  texto1.digitar();
  pop();
  exit.draw();
  if (exit.val === 1) {
    this.transicao.cut(4);
  }
};
screen[4].setup = function () {
  sala_computador.setup();

};
screen[4].loop = function () {
  sala_computador.draw();
  sala_computador.att(deltaTime);
  if(sala_computador.itens.broche.pos[0]>700&&sala_computador.itens.broche.pos[0]>460){
    this.transicao.fade(0);
  }
};