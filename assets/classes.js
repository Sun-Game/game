// Author: Anderson Lot
// Year: 2022
// Classes -> Segundo a ser executado


class Botao {
    constructor(tipo, texto, posicao) {
      this.texto = texto;
      this.tipo = tipo;
      this.posicao = posicao;
      this.size = [150, 50];
      this.estado = 0;
      this.val = 0;
      this.sprite = Manager.image.sprites[1];
      this._textSize = 25;
      this.opacidade = 0;
      this.released = false;
      this.pressed=false;
    }
    draw() {
      this.attPosicao();
      this.attOpacidade();
      if (this.estado === 0) this.drawSprite(0, Manager.paleta[1], 25);
      if (this.estado === 1 && this.tipo === "menu")
        this.drawSprite(1, Manager.paleta[2], 28);
      if (this.estado === 1 && this.tipo === "opcao")
        this.drawSprite(0, Manager.paleta[1], 28);
      this.checkmouseOver();
      this.checkMouseClick();
    }
    attPosicao() {
      this._x1 = this.posicao[0] - this.size[0] / 2;
      this._x2 = this.posicao[0] + this.size[0] / 2;
      this._y1 = this.posicao[1] - this.size[1] / 2;
      this._y2 = this.posicao[1] + this.size[1] / 2;
    }
    checkmouseOver() {
      if (isMouseOver(this._x1, this._y1, this._x2, this._y2)) {
        if (this.estado === 0) {
          this.estado = 1;
          if (this.tipo === "menu") {
            Manager.sound.play("efeitoBotao");
          }
        }
        return;
      }
      this.estado = 0;
      return;
    }
    checkMouseReleased() {
      if (!mouseIsPressed) {
        this.released = true;
      }
    }
    checkMouseClick() {
      this.checkMouseReleased();
      if (
        this.released &&
        this.estado == 1 &&
        mouseIsPressed &&
        mouseButton === LEFT &&
        !this.pressed
      ) {
        this.val = 1;
      }
    }
    attOpacidade() {
      this.opacidade = lerp(this.opacidade, 255, 0.007);
    }
    drawSprite(_frame, _cor, _lerp) {
      push();
      this.sprite.setFrame(_frame);
      tint(255, this.opacidade);
      image(this.sprite, this._x1, this._y1);
      this._textSize = lerp(this._textSize, _lerp, 0.1);
      textSize(this._textSize);
      textFont(Manager.font.fonts[1]);
      textAlign(CENTER, CENTER);
      fill(_cor[0], _cor[1], _cor[2], this.opacidade);
      text(this.texto, this.posicao[0], this.posicao[1]);
      pop();
    }
  }
  
  class TextoDigitavel {
    constructor(texto, posicao, velocidade, largura, comSom) {
      this.texto = texto;
      this.posicao = posicao;
      this.velocidade = velocidade || 0.7;
      this.largura = largura || 30;
      this.comSom = comSom ||false;
      this.memoria = {
        frameInicio: 0, //1 - frame inicial
        textoNovo: [], //2 - texto novo
        isWorking: 0, //3 - em execução ou não
        linhasPuladas: 0, //4 - número pulos de linha
        quantChars: 0, //5 - caracteres a serem mostrados
        posUltimoEspaco: 0, //6 - posicao do ultimo espaço no array
        pulouLinha: 0, //7 - não permite dois pulos consecutivos
        tamanhoLinha: 0,
        done: false,
      };
    }
    digitar() {
      this.memoria = digitar(
        this.texto,
        this.posicao,
        this.velocidade,
        this.largura,
        this.comSom,
        this.memoria
      );
    }
  }
  
  class controleDeslizeLateral {
    constructor() {
      this.size = 40;
      this.esquerda = [0, 0, this.size, height];
      this.direita = [width - this.size, 0, width, height];
    }
    show() {
      push();
      noStroke();
      fill(0, 0, 0, 50);
      rect(
        this.esquerda[0],
        this.esquerda[1],
        this.esquerda[2],
        this.esquerda[3]
      );
      rect(this.direita[0], this.direita[1], this.direita[2], this.direita[3]);
      pop();
    }
    checkMouse() {
      if (
        isMouseOver(
          this.esquerda[0],
          this.esquerda[1],
          this.esquerda[2],
          this.esquerda[3]
        )
      ) {
        return "esquerda";
      }
      if (
        isMouseOver(
          this.direita[0],
          this.direita[1],
          this.direita[2],
          this.direita[3]
        )
      ) {
        return "direita";
      }
      return null;
    }
  }
  
  class Sprite {
    constructor(_figura, pos) {
      this.fig = _figura;
      this.pos = pos;
    }
    draw(_frame) {
      if (_frame) {
        this.fig.setFrame(_frame);
      }
      if (_frame === 0) {
        this.fig.setFrame(0);
      }
      image(this.fig, this.pos[0], this.pos[1]);
    }
    resize(x, y) {
      this.fig.resize(x, y);
    }
  }
  class Ambiente {
    constructor() {
      this.itens ={
      };
      this.background = null;
    }
    preload() {
      for (let key in this.itens) {
        let item = this.itens[key];
        if (typeof item.preload === 'function') {
          item.preload(); 
        }else{
          debugLog("Item: ( "+item.name+" ) não tem preload");
        }
      }
    }
    draw() {
      background(this.background);
      this.drawItens();
    }
    att(deltaTime) {
      this.attItens(deltaTime);
    }
    drawItens() {
      for(var i in this.itens)
        this.itens[i].draw();
    }
    attItens(deltaTime) {
      for(var key in this.itens)
        this.itens[key].att(deltaTime);
    }
  }

  class Item {
    /**
     * Itens básicos, que permitem interação porém sem mudança de estado
     * @param {*} nome 
     * @param {*} _figura 
     * @param {*} _pos 
     * @param {*} _size 
     * @param {*} _ordem 
     */
    constructor(nome,_figura, _pos,_size, _ordem) {
      this.name = nome;
      this.sprite = new Sprite(_figura, _pos);
      this.ordem = _ordem||0;
      this.frame = null;
      this.size = _size||null;
      this.pos = _pos;
      this.can_press = 0;
      this.pressed = 0;
      this.sound=null;
      if(this.size){
        this.sprite.resize(this.size[0],this.size[1]);
        }
      this.observers=[];
    }
    draw() {
      this.sprite.draw(this.frame);
    }
    isMouseOver() {
      var pixel=this.sprite.fig.get(mouseX-this.pos[0],mouseY-this.pos[1]);
      return (pixel[3]===255);
    }
    checkIfCanPress() {
      if (this.isMouseOver() && !mouseIsPressed && !this.pressed) {
        this.can_press = 1;
      }
      if (!this.isMouseOver() && mouseIsPressed && !this.pressed) {
        this.can_press = 0;
      }
    }
    checkMousePress(){
      if (
        this.isMouseOver() &&
        mouseIsPressed &&
        !this.pressed &&
        this.can_press
      ) {
        this.pressed = true;
        Manager.sound.play(this.sound);
        this.estado = !this.estado;
        this.notificarObservers();
        debugLog("Notificar:  "+this.name+ "  mudou estado para:  "+this.estado);
      }
    }
    checkMouseRelease(){
      if (!mouseIsPressed && this.pressed) {
        this.pressed = false;
      }
    }
    att(){
      this.checkIfCanPress();
      this.checkMousePress();
      this.checkMouseRelease();
    }
    /**
     * Adiciona observer no objeto
     * @param {*} fn 
     */
    adicionarObserver(fn){
      this.observers.push(fn);
    }
    notificarObservers(){
      for(const fn of this.observers){
        fn(this);
      }
    }
  }
  class ItemClicavel extends Item {
    constructor(nome,_figura, _pos, _ordem) {
      super(nome,_figura,_pos,_ordem);
  
    }
  
    att() {
      this.checkIfCanPress();
      this.checkMousePress();
      this.checkMouseRelease();
      this.frame=0;
      if (this.estado){
        this.frame=1;
      }
    }
  }
  class Interruptor extends ItemClicavel{
    constructor(nome,_figura,_pos,_ordem){
      super(nome,_figura,_pos,_ordem);
      this.sprite = new Sprite(Manager.image.interruptor, _pos);;
      this.sprite.resize(70/4, 100/4);
   }
    draw() {
      this.sprite.fig.setFrame(1);
      if (this.estado) {
        this.sprite.fig.setFrame(0);
      }
      this.sprite.draw();
      if (!this.estado) {
        fill(0, 0, 10, 200);
        rect(0, 0, width, height);
      }
    }
  }





  class ItemArrastavel extends Item {
    constructor(nome,_figura, _pos, _ordem) {
      super(nome,_figura,_pos,_ordem);
      this.can_press = 0;
      this.pressed = 0;
      this.clickFlag=0;
      this.temp_pixelX=0;
      this.temp_pixelY=0;
      this.sound=null;
    }
    checkMouseRelease(){
      if (!mouseIsPressed && this.pressed) {
        this.pressed = false;
        this.clickFlag=0;
      }
    }
    att(){
      this.checkIfCanPress();
      this.checkMousePress();
      this.checkMouseRelease();
      if(mouseIsPressed&&this.isMouseOver()&&this.clickFlag===0&&this.can_press){
        this.clickFlag=1;
        this.can_press=0;
        this.temp_pixelX=mouseX-this.pos[0];
        this.temp_pixelY=mouseY-this.pos[1];
      }
      if(mouseIsPressed&&this.clickFlag){
        this.pos[0]=mouseX-this.temp_pixelX;
        this.pos[1]=mouseY-this.temp_pixelY;
      }
    }
  }
  
  class ItemInterativo extends Item {
    constructor(nome,_figura, _pos, _ordem){
      super(nome,_figura,_pos,_ordem);
      this.texto=new TextoDoObjeto("Clique para Acessar!",[this.pos[0]+50,this.pos[1]-10]);
    }
    checkMouseOver(){
      this.frame=0;
      if(this.isMouseOver()){
        this.frame=1;
        this.texto.show();
     
        return;
      }
      this.texto.hide();
    }
    att(){
    this.checkMouseOver();
    this.estado=0;
    if(!this.estado&&this.frame&&mouseIsPressed)
    if(this.estado){
      this.estado=1;
    }
    }
  }
  
  class TextoDoObjeto{
    constructor(texto,pos){
      this.string=texto||"";
      this.texto= new TextoDigitavel(this.string,pos);
      this.font=Manager.font.fonts[2];
      this.color=color('white');
      this.pos=pos||[0,0];
      this.size=8;
    }
    show(){
      push();
      textSize(this.size);
      fill(this.color);
      textFont(this.font);
      textAlign(CENTER,CENTER);
      this.texto.digitar();
      pop();
    }
    hide(){
      this.texto= new TextoDigitavel(this.string,this.pos);
    }
    
  }


class Transicao{
  constructor(){
    this.opacidade=0;
    this.direta=false;
  }
  fade(telaDestino,velocidade = 5) {
  background(0, this.opacidade);
  this.direta=false;
  if (this.opacidade > 254) {
    this.opacidade = 0;
    Manager.settings.tela = telaDestino;
    screen[Manager.settings.tela].teardown();
    return;
  }
  this.opacidade+=velocidade;
  return;
  }
  cut(telaDestino){
  this.direta=true;
  Manager.settings.tela = telaDestino;
  screen[Manager.settings.tela].teardown();
  return;
  }
  
}

class Screen {
  constructor() {
    this.setup = function () {};
    this.setupDone = false;
    this.loop = function () {};
    this.teardown = function () {this.setupDone=false};
    this.frame=0;
    this.transicao=new Transicao();
  }
  draw() {
    this.frameAtt();
    if (!this.setupDone) {
      this.setup();
      this.setupDone = true;
    }
    this.loop();
    if (this.frame > 50 || this.transicao.direta) return;
    return background(0, 255 - 5 * this.frame);
  }
  frameAtt(){
    this.frame++;
  }
  reset(){
    this.frame=0;
  }
}