class Funcoes{
    registroBusca = Array();
    registrosGerais = Array();
    registrosNomes = Array();
    registrosFiltrados = Array();

    pesquisar(filtro, usuarios) {
        this.registrosGerais = this.retornaDados(chaveStorage)
        let busca = this.nomeFormatado(filtro);

        for(let i = 0; i < this.registrosGerais.length; i++) {
            this.registrosNomes.push(this.registrosGerais[i].nome);
            this.registrosGerais[i].nome = this.fomartarNome(this.registrosNomes[i]);
            this.registrosGerais[i].nome.push(this.registrosNomes[i]);
        }

        for(let i = 0; i < busca.length; i++) {
            this.registrosFiltrados = this.registrosGerais.filter(function(registros) {return registros.nome[i] == busca[i]});
        }
        
        return this.registrosFiltrados;
    }

    fomartarNome(nome) {
        let nomeBusca = nome.split(" ").join("");
        nomeBusca = nomeBusca.toLowerCase();
        nomeBusca = nomeBusca.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, '');
        
        this.registroBusca = Array.from(nomeBusca);
        return this.registroBusca;
    }
}

let funcao = new Funcoes()


const url = 'https://randomuser.me/api';
const table = document.getElementById('table')
let usuarios = Array();

async function consultar(){
    const dados = await fetch(url);
    const resultado = await dados.json();
    const infos = await resultado.results;
    
    infos.map(info => usuarios.push(info));

    showTable()
}

function showTable() {
    let tr = "";
    console.log(usuarios);
    for(let i = 0;i < usuarios.length; i++) {
        tr = `<tr>`;
        tr += `<td>${i+1}</td>`;
        tr += `<td>${usuarios[i].gender == 'male' ? usuarios[i].gender = '<img width="30" src="imgs/Male-icon.png">' : usuarios[i].gender = '<img width="30" src="imgs/femea.png">'}</td>`
        tr += `<td>${usuarios[i].name.first + ' ' + usuarios[i].name.last}</td>`
        tr += `<td>${usuarios[i].dob.age}</td>`
        tr += `<td>${usuarios[i].email}</td>`
    }
    table.innerHTML += tr;
}