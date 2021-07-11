// colocar na tag html antes de finalizar o jogo : oncontextmenu="return false" onkeydown="return false"

   
class Pokemon {
    #nome;
    #foto;
    #respostaCerta;

    constructor(nome, foto, resposta){
        this.#nome = nome;
        this.#foto = foto;
        this.#respostaCerta = resposta;
    }

    getNome(){
        return this.#nome;
    }
    getFoto(){
        return this.#foto;
    }
    getrespostaCerta(){
        return this.#respostaCerta;
    }

    setRespostaCerta(bool){
        this.#respostaCerta = bool;
    }


}

function sorteiaEExibe() {
    var pokemonEscolhido;
    var listaIdPokemons = [];
    var listaDadosPokemons = [];
    var auxiliar = 0;
    var pokemonNaLista = false;
    
    
    var nomePokemon;
    var fotoPokemon;

    
        
    while (auxiliar < 4){
        pokemonEscolhido = sorteiaUmaID();
        for(i = 0; i <= listaIdPokemons.length; i++){
            if(pokemonEscolhido == listaIdPokemons[i]){
                pokemonNaLista = true;
            }
            else{

            }

        }

        if(pokemonNaLista == false){
            listaIdPokemons[auxiliar] = pokemonEscolhido;
            auxiliar++;            
        }
        else{
            pokemonNaLista = false;
            
        }
        
    }
    // Aqui a lista com as ids já foi definida!

    retornaPokemon(listaIdPokemons);
       
/*
    for(i = 0; i < listaIdPokemons.length;i++){
        listaDadosPokemons[i] = retornaPokemon(listaIdPokemons[i]);
        if(i == 0){
            //listaDadosPokemons[0].setRespostaCerta = true;
        }
        window.alert(i);
    }*/
}

function sorteiaUmaID(){
    var id = Math.floor(Math.random() * 151) + 1;
    return id;
}

//Função para embaralahr um array, pega em: https://pt.stackoverflow.com/questions/94646/como-misturar-um-array-em-javascript
function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }

function retornaPokemon(lista) {
    var objPokemon;
    var listaDadosPokemons = [];
    var divOpcoes = document.getElementById("opcoes");
    var divPontos = document.getElementById("divPontos");
    var botaoComecar = document.getElementById("botaoComecar");
    var botaoResponder = document.getElementById("botaoResponder");

    var lblopcao1 = document.getElementById("lblOpcao1");
    var valorOpcao1 = document.getElementById("opcao1");

    var lblopcao2 = document.getElementById("lblOpcao2");
    var valorOpcao2 = document.getElementById("opcao2");

    var lblopcao3 = document.getElementById("lblOpcao3");
    var valorOpcao3 = document.getElementById("opcao3");

    var lblopcao4 = document.getElementById("lblOpcao4");
    var valorOpcao4 = document.getElementById("opcao4");

    var fotoMostrada = document.getElementById("foto");

    
    botaoComecar.style.display = "none";

    for(i = 0; i < lista.length;i++){
        fetch("https://pokeapi.co/api/v2/pokemon/" + lista[i])
            .then(function (response) {
                return response.json();
            })
            .then(function (pokemon) {
                nomePokemon = pokemon.name;
                fotoPokemon = pokemon.sprites.front_default;
                objPokemon = new Pokemon(nomePokemon, fotoPokemon, false);
                listaDadosPokemons.push(objPokemon);
                
                if (listaDadosPokemons.length == 4){
                    divOpcoes.style.display = "";
                    divPontos.style.display = "";
                    botaoResponder.style.display = "";
                    //divBotao.innerHTML = "Responder";

                    listaDadosPokemons[0].setRespostaCerta(true);
                    fotoMostrada.setAttribute("src", listaDadosPokemons[0].getFoto());

                    shuffle(listaDadosPokemons);

                    valorOpcao1.value = listaDadosPokemons[0].getrespostaCerta();
                    lblopcao1.innerHTML = listaDadosPokemons[0].getNome();
                    
                    valorOpcao2.value = listaDadosPokemons[1].getrespostaCerta();
                    lblopcao2.innerHTML = listaDadosPokemons[1].getNome();

                    valorOpcao3.value = listaDadosPokemons[2].getrespostaCerta();
                    lblopcao3.innerHTML = listaDadosPokemons[2].getNome();

                    valorOpcao4.value = listaDadosPokemons[3].getrespostaCerta();
                    lblopcao4.innerHTML = listaDadosPokemons[3].getNome();
                }

                
                return objPokemon;
            });
    }

}

function validarEscolha(){
    var opcoes = document.getElementsByName("opcoesPokemon");
    var opcaoMarcada;

    for(i = 0; i < opcoes.length; i++){
        if(opcoes[i].checked){
            opcaoMarcada = opcoes[i];            
        }        

    }

    if(opcaoMarcada.value == "true"){
        //window.alert("Acertou!");
        somaPontos();
        sorteiaEExibe();
    }
    else{
        window.alert("Errou! Você fez "+lblPontos.textContent+" pontos!");
        reiniciarJogo();
        zeraPontos();
    }
    
}

function somaPontos() {
    var lblPontos = document.getElementById("lblPontos");
    var divPontos = document.getElementById("divPontos");
    var pontoAtual = parseInt(lblPontos.textContent);

    pontoAtual += 1;
    
    lblPontos.innerHTML = pontoAtual;
}

function zeraPontos() {
    var lblPontos = document.getElementById("lblPontos");
    lblPontos.innerHTML = "0";
}

function reiniciarJogo() {
    var divOpcoes = document.getElementById("opcoes");
    var divPontos = document.getElementById("divPontos");
    var botaoComecar = document.getElementById("botaoComecar");
    var botaoResponder = document.getElementById("botaoResponder");
    

    divOpcoes.style.display = "none";
    divPontos.style.display = "none";
    botaoResponder.style.display = "none";
    
    botaoComecar.style.display = "";
    
}