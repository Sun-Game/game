// TODO: Criar uma forma de salvar o progresso no navegador

const textManager={
  lang:"pt",
  setLang(NewLang){
    this.lang=NewLang;
  },
  getText(tela,texto){
    return texts[this.lang][tela][texto];
  },
};

let uiMensagem = {
  texto: "",
  visivel: false,
  tempoRestante: 0,

  exibir(texto, duracao = 3000) {
    this.texto = texto;
    this.tempoRestante = duracao;
    this.visivel = true;
  },

  atualizar(delta) {
    if (this.visivel) {
      this.tempoRestante -= delta;
      if (this.tempoRestante <= 0) {
        this.ocultar();
      }
    }
  },

  ocultar() {
    this.visivel = false;
    this.texto = "";
  },

  desenhar() {
    if (this.visivel) {
      fill(0, 180);
      noStroke();
      rect(20, height - 70, width - 40, 50, 10);

      fill(255);
      textAlign(LEFT, CENTER);
      textSize(18);
      text(this.texto, 30, height - 45);
    }
  }
};


const gameSettings = {
    tela: 0,
    numTelas: 10,
    start: false,
    /**
     * Função que define a tela do jogo
     * @param {inteiro} - numero da tela
     */
    setScreen(screen=0){
      this.tela=screen;
    },
    /**
     * Retorna número da tela atual
     * @returns {int} - numero da tela
     */
    getScreen(){
      return this.tela;
    },
    setStartState(state){
      this.start=state;
    }
  };

  const ImageManager ={
    salacomputador:[],
    preload(){
        this.brasaoSUN=loadImage("assets/images/image1.png");
        this.botaoMenu=loadImage("assets/images/image2.gif");
        this.interruptor= loadImage("assets/images/interruptor.gif");
        this.salacomputador={
        background:loadImage("assets/images/image3.png"),
        computador:loadImage("assets/images/image4.gif"),
        relogio:loadImage("assets/images/image7.gif"),
        cadeira:loadImage("assets/images/image5.png"),
        broche:loadImage("assets/images/image6.png"),
        };
    },
    drawSprite(sprite,frame,x1,y1,opacidade){
      this.botaoMenu.setFrame(frame);
      tint(255, opacidade);
      image(this.botaoMenu,x1,y1);

    },
    
  };

  const FontsManager ={
    pixelBold:[],
    pixelHB:[],
    pixelLigth:[],
    preload(){
      this.pixelBold=loadFont("assets/fonts/bold.ttf");
      this.pixelHB=loadFont("assets/fonts/hb.ttf");
      this.pixelLigth=loadFont("assets/fonts/light.ttf");
    },
    getFont(nome) {
      const permitidas = ["pixelBold", "pixelHB", "pixelLigth"];
      if (permitidas.includes(nome)) {
        return this[nome];
      }
      console.error(`Fonte "${nome}" não encontrada. Retornando pixelLigth.`);
      return this.pixelLigth;
    },
    applyFont(fonte){
      textFont(this[fonte]);
    },
    

  };

  const SoundManager = {
    sounds: {},
    preload(){
      this.sounds ={
        hinoSUN: loadSound("assets/sounds/hino-sun.mp3"),
        digito: loadSound("assets/sounds/sound1.mp3"),
        efeitoComputador: loadSound("assets/sounds/sound1.mp3"),
        efeitoBotao: loadSound("assets/sounds/sound2.mp3"),
        efeitoInterruptorLigado: loadSound("assets/sounds/sound2.mp3"),
        efeitoInterruptorDesligado: loadSound("assets/sounds/sound2.mp3"),
      };
      this.setVolume(0.95);
    },
    setup(){
      this.sounds.efeitoInterruptorLigado.rate(1.05);
      this.sounds.efeitoInterruptorDesligado.rate(0.92);
      this.sounds.digito.rate(0.8);
    },
    setVolume(volume){
      for (let key in this.sounds){
        this.sounds[key].amp(volume)
      }
    },
    play(name,loop=false){
      const sound = this.sounds[name];
      if (sound && !sound.isPlaying()){
        sound.setLoop(loop);
        sound.play();
      }
    },
    stop(name){
      const sound = this.sounds[name];
      if(sound && sound.isPlaying()){
        sound.stop();
      }
    },
    stopAll(){
      for(let key in this.sounds){
        this.stop(key);
      }
    },
  };
  
  const Manager={
    text: textManager,
    sound: SoundManager,
    image: ImageManager,
    font: FontsManager,
    settings: gameSettings,
    paleta:[
      [0, 0, 0],
      [255, 255, 255],
      [180, 0, 0],
    ],
    preload(){
      this.sound.preload();
      this.image.preload();
      this.font.preload();
    },
    setScreen(screen){
      this.settings.setScreen(screen);
    },
    getScreen(){
      return this.settings.getScreen();
    },
    getFont(fonte){
      return this.font.getFont(fonte);
    },
    getText(tela,texto){
      return this.text.getText(tela, texto);
    },
    applyFont(fonte){
      this.font.applyFont(fonte);
    },
    drawSprite(sprite,frame,x1,y1,opacidade){
    this.image.drawSprite(sprite,frame,x1,y1,opacidade);

    },
  };
  