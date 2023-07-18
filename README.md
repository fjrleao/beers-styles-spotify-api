# beerStyles API 🍺

Esse projeto se trata de uma REST API para fazer o CRUD de estilos de cerveja e suas temperaturas ideais de consumo. A API também integra com o API do Spotify com o intuito de retornar playlists que tenham o nome parecido com o estilo de cerveja em uma das rotas de GET.

## Rotas da API

Acesse a documentação das rotas para saber como cada requisição deve ser feita e o que esperar de cada resposta. A documentação também poderá ser acessada através da rota **_/docs_** no execução local ou no deploy da aplicação.

## Executando o projeto 🚀

### Pré-requisitos

Para executar o projeto é necessário instalar o seguinte:

- [Node.js](https://nodejs.org/en)
- [Docker](https://www.docker.com/) (usado apenas para executar os testes localmente)

E criar conta nos serviços:

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- [Spotify API](https://developer.spotify.com/)

### Executando localmente

Comece fazendo o clone do repositório

```
git clone https://github.com/fjrleao/beers-styles-spotify-api.git
```

Acesse o diretório do repositório clonado:

```
cd beers-styles-spotify-api
```

Crie um arquivo **.env** e preencha ele com as variáveis de ambiente se baseando no arquivo **.env.example**:

- O preenchimento da **PORT** não é obrigatório, caso não preenchido a aplicação será executada por padrão na porta 3000.
- Para conseguir as credencias do spotify, basta [seguir o passo a passo](#spotifyapi).
- Para conseguir a URL de acesso ao MongoDB basta [seguir o passo a passo](#mongodb).
- O nome do banco de dados pode ser preenchido de acordo com a sua preferência, eu recomendo usar o nome _beers_.

Instale as dependências do projeto usando o **npm** ou seu gerenciador de pacotes do node preferido:

```
npm install
```

Execute o projeto com o script de dev:

```
npm run dev
```

### Executando os testes

A execução dos testes depende da execução do docker, isso acontece pois é necessário se conectar a um banco de dados MongoDB para manipulação dos dados.

Caso deseje executar os testes da aplicação, suba o container usado o compose:

```
docker-compose up
```

E execute os testes usando o script de teste:

```
npm run test
```

## Tecnologias uasadas no projeto

- [Node.js](https://nodejs.org/en)
- [Docker](https://www.docker.com/)

## Usando os serviços em cloud

### <a name="mongodb"></a>Acessando credenciais do MongoBD Atlas

1. Acesse a [página de organizações do MongoDB Atlas](https://cloud.mongodb.com/v2#/preferences/organizations), crie uma nova organização caso ainda não tenha uma, e acesse a organização criada.
2. No painel da organização crie um novo projeto e acesse ele, ou acesse um já existente.
3. Na página do projeto crie um novo banco de dados e lembre-se de escolher o plano free.
4. Na página de **Quickstart**, crie um username e uma password, e lembre-se anotar eles em um local seguro, role a página e inclua seu ip local na lista de ips permitidos.
5. Acesse a aba de **Database** e clique em **Connect**, selecione a opção **Drivers**, se abrirá uma nova página e nela você encontrará a URL de conexão, copie a URL para o **.env**, lembre-se de substituir a password criada no passo anterior.

### <a name="spotifyapi"></a>Acessando credencias do Spotify API

1. Acesse a **página da documentação de [getting started](https://developer.spotify.com/documentation/web-api/tutorials/getting-started)** e seguir o passo a passo até o passo 3 da sessão de **Request an access token**
