
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
    tela: 4,
    numTelas: 10,
    start: 0,
  };

  const ImageManager ={
    sprites:[],
    interruptor:[],
    salacomputador:[],
    preload(){
        this.sprites[0]=loadImage("assets/images/image1.png");
        this.sprites[1]=loadImage("assets/images/image2.gif");
        this.interruptor= loadImage("assets/images/interruptor.gif");
        this.salacomputador={
        background:loadImage("assets/images/image3.png"),
        computador:loadImage("assets/images/image4.gif"),
        relogio:loadImage("assets/images/image7.gif"),
        cadeira:loadImage("assets/images/image5.png"),
        broche:loadImage("assets/images/image6.png"),
        };
    },
  };

  const FontsManager ={
    fonts:[],
    preload(){
      this.fonts[0]=loadFont("assets/fonts/font1.ttf");
      this.fonts[1]=loadFont("assets/fonts/font2.ttf");
      this.fonts[2]=loadFont("assets/fonts/font3.ttf");
    }
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
    }
  };
  