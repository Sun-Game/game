// Author: Anderson Lot
// Year: 2022
// Este arquivo contem OBJETOS
// ORDEM DE EXECUÇÃO : 3  

const sala_computador=new Ambiente();
sala_computador.setup=function(){
  this.background=Manager.image.salacomputador.background;
  this.itens={
    // ======= Aqui vai os itens que farão parte do ambiente SALA COMPUTADOR ====
    computador: new ItemInterativo("computador",Manager.image.salacomputador.computador,[121, 190],[45 * 3, 29 * 3]),
    cadeira: new Item("cadeira",Manager.image.salacomputador.cadeira,[0,0]),
    broche: new ItemArrastavel("broche",Manager.image.salacomputador.broche,[265,18],[70,100]),
    relogio: new Item("relogio",Manager.image.salacomputador.relogio,[150,20]),
    interruptor: new Interruptor("interruptor_sala_computador",null,[550,100]),
  };
  // === Atualizando alguns parametros dos itens 
  // --- Interruptor
  Object.assign(this.itens.interruptor,{
    estado:false,
  });
  // --- Computador
  Object.assign(this.itens.computador,{
    frame:0,
    sound:"efeitoComputador",
  });
  // --- Relógio
  Object.assign(this.itens.relogio,{
    frame:7,
    timer:0,
    intervalo:1000,
  });
  // Adicionando o comportamento de atualizar os frames para o ponteiro girar
  adicionarComportamentoExtra(this.itens.relogio,function(deltaTime) {
    if(deltaTime>100){deltaTime=100};
    this.timer+=deltaTime;
      if(this.timer>=this.intervalo){
        this.frame++;
        this.timer=this.timer-this.intervalo;
        if(this.frame>11){
          this.frame=0;
        };
      };
    },)
    
    const observerCliquesRelogio = criaContadorDeCliques(5,20000,"Não adianta, o tempo não vai passar mais rápido.");
    this.itens.relogio.adicionarObserver(observerCliquesRelogio);
    const observerCliquesCadeira = criaContadorDeCliques(2,5000,"A cadeira não vai sair do lugar.",true);
    this.itens.cadeira.adicionarObserver(observerCliquesCadeira);
  
};

  
  
  
  
  