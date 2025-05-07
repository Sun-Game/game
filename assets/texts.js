  // Author: Anderson Lot
// Year: 2022

// Os textos serão divididos em arrays que estaram em na
// array da tela respectiva. Dessa forma será mais fácil
// encontrar o texto que se deseja alterar ou utilizar.

texts=["pt","en"];
texts["pt"]=[];    // array das telas
texts["en"]=[];
for (let i=0;i<Manager.settings.numTelas;i++){
  texts["pt"][i]=[];
  texts["en"][i]=[];
}
{// MENUS
  texts["pt"]["menus"]=[];
  texts["en"]["menus"]=[];
  texts["pt"]["menus"]["start"]="JOGAR";
  texts["en"]["menus"]["start"]="START";
  texts["pt"]["menus"]["load"]="CARREGAR";
  texts["en"]["menus"]["load"]="LOAD";
  texts["pt"]["menus"]["skip"]="PULAR";
  texts["en"]["menus"]["skip"]="SKIP";
  texts["pt"]["menus"]["ok"]="OK";
  texts["en"]["menus"]["ok"]="OK";
}

{// TELA 0
  texts["pt"][0][0]="SUN - Glória e Paz";
  texts["en"][0][0]="SUN - Glory e Peace";
}
{// TELA 1
  texts["pt"][1][0]="Após a última GRANDE GUERRA MUNDIAL, todos os países que restaram se aliaram e formaram uma única nação, chamada de Strong United Nations, ou SUN.\n\nDessa forma o planeta permanecerá sempre em PAZ, já que não há mais conflitos e guerras por territórios ou riquezas. O mundo todo pertence à SUN.";
  texts["en"][1][0] = "After the last GREAT WORLD WAR, all the remaining countries joined forces and formed a single nation, called the Strong United Nations, or SUN.\n\nThis way, the planet will remain in PEACE forever, since there are no more conflicts or wars over territory or wealth. The entire world now belongs to SUN.";
}

{// TELA 2
  texts["pt"][2][0]="Você foi escolhido a servir e zelar pela SUN. É uma HONRA ser membro do partido e contribuir para PAZ e PROSPERIDADE do povo de SUN.\n\nSUN acima de tudo e GRANDE LÍDER acima de todos!";
  texts["en"][2][0] = "You have been chosen to serve and protect SUN. It is an HONOR to be a member of the Party and to contribute to the PEACE and PROSPERITY of the SUN people.\n\nSUN above all, and the GREAT LEADER above everyone!";
  
}
{// TELA 3
  texts["pt"][3][0]="Prepare-se para o treinamento das suas novas funções, importante estar atento, assim como nós estamos atentos a tudo que você estiver fazendo.";  
  texts["en"][3][0] = "Prepare yourself for training in your new duties. It is important to stay alert, just as we are watching everything you do.";
}

