//chave API
const apiKey = 'a76c937c44f64af6bb775e85ac179c2b';

//referencias
const inputCidade = document.getElementById('cidade-input');
const botaoPesquisar = document.getElementById('btn-pesquisar');
const nomeCidade = document.getElementById('nome-cidade');
const temperatura = document.getElementById('temperatura');
const descricao = document.getElementById('descricao');

//dados do clima
async function getWeather(cidade) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if(data.cod === '404') {
            alert('Cidade não encontrada');
            return;
        }

        if (data.main && data.main.temp !== undefined) {
            nomeCidade.textContent = `Cidade de: ${data.name}, ${data.sys.country}`;
            temperatura.textContent = `Temperatura: ${data.main.temp}°C`;
            descricao.textContent = `Descrição: ${data.weather[0].description}`;
        } else {
            alert('Erro ao obter dados do clima');
        }

        /*
        //atualizar elementos com os dados
        nomeCidade.textContent = `Clima em ${data.name}, ${data.sys.country}`;
        temperatura.textContent = `Temperatura: ${data.main.temp}°C`;
        descricao.textContent = `Descrição: ${data.weather[0].description}`*/
    } 
    
    catch (error) {
        console.error('Erro ao buscar clima:', error);
        alert('Ocorreu um erro ao buscar o clima. Verifique a cidade e tente novamente.')
    }
}

//botao pesquisa
botaoPesquisar.addEventListener('click', () => {

    const cidade = inputCidade.value.trim();
    console.log(`Cidade digitada: ${cidade}`);

    if(cidade) {
        getWeather(cidade);
    } else {
        alert('Digite o nome de uma cidade');
    }
});