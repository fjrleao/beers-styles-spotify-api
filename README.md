# beerStyles API 🍺

Este projeto consiste em uma API REST para realizar as operações CRUD de estilos de cerveja e suas temperaturas ideais de consumo. A API também integra com a API do Spotify, permitindo que, em uma das rotas de requisição GET, sejam retornadas playlists cujos nomes sejam similares aos estilos de cerveja.

### Rotas da API

Acesse a **[documentação das rotas](https://fjrleao.github.io/beers-styles-spotify-api/public/docs/)** para obter informações detalhadas sobre como fazer cada requisição e entender o que esperar em cada resposta.

## Executando o projeto 🚀

### Pré-requisitos

Para executar o projeto é necessário instalar o seguinte:

- [Node.js](https://nodejs.org/en)
- [Docker](https://www.docker.com/) (usado apenas para executar os testes localmente)

E criar conta nos serviços:

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- [Spotify API](https://developer.spotify.com/)
- [AWS](https://aws.amazon.com/pt/) (caso queira fazer o deploy)

Obs: O tutorial de execução considera o uso do MongoDB Atlas, porém, é igualmente possível instalar o MongoDB localmente para executar o projeto.

### Executando localmente

Comece fazendo o clone do repositório e acessando o diretório:

```bash
git clone https://github.com/fjrleao/beers-styles-spotify-api.git
```

```bash
cd beers-styles-spotify-api
```

Crie um arquivo **.env** e preencha ele com as informações necessárias, tomando como base o conteúdo do arquivo **.env.example** fornecido:

- O preenchimento da **PORT** não é obrigatório, caso não preenchido a aplicação será executada por padrão na porta 3000.
- Para conseguir as credencias do spotify, basta [seguir o passo a passo](#spotifyapi).
- Para conseguir a URL de acesso ao MongoDB basta [seguir o passo a passo](#mongodb).
- O nome do banco de dados pode ser preenchido de acordo com a sua preferência, eu recomendo usar o nome _beers_.

Instale as dependências do projeto usando o **npm**, ou seu gerenciador de pacotes para o node preferido:

```bash
npm install
```

Execute o projeto com o script de dev:

```bash
npm run dev
```

Agora você pode acessar a aplicação através do localhost usando um client API: `http://localhost:<PORT>/beers`

### Executando os testes

A execução dos testes depende da execução do docker, isso acontece pois é necessário se conectar a um banco de dados MongoDB para manipulação dos dados.

Caso deseje executar os testes da aplicação, suba o container usado o compose:

```bash
docker-compose up
```

E execute os testes usando o script de teste:

```bash
npm run test
```

### Fazendo deploy na AWS

Acesse o console da AWS, **[crie uma instância do EC2](https://docs.aws.amazon.com/pt_br/codedeploy/latest/userguide/instances-ec2-create.html)** e acesse ela usando o ssh via terminal. Lembre-se que é necessário a key gerada pela AWS na criação da instância para acessá-la:

```bash
ssh -i <key-file>.pem <username>@<ip-instancia>
```

Instale o Node.js no servidor:

- [Tutorial de instalação](https://docs.aws.amazon.com/pt_br/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html)

Clone o projeto e acesse o diretório clonado:

```bash
git clone https://github.com/fjrleao/beers-styles-spotify-api.git
```

```bash
cd beers-styles-spotify-api
```

Crie um arquivo **.env** e preencha ele com as informações necessárias, tomando como base o conteúdo do arquivo **.env.example** fornecido:

Como o servidor possivelmente será uma máquina linux, recomendo o uso do [editor de texto nano](https://terminalroot.com.br/2015/10/o-editor-de-texto-nano.html), que já vem instalado por padrão.

- O preenchimento da **PORT** não é obrigatório, caso não preenchido a aplicação será executada por padrão na porta 3000.
- Para conseguir as credencias do spotify, basta [seguir o passo a passo](#spotifyapi).
- Para conseguir a URL de acesso ao MongoDB basta [seguir o passo a passo](#mongodb).
  - Como essa etapa é de deploy da aplicação em um servidor de produção, é necessário passar o IP da instância da AWS nas regras de permissão do MongoDB Atlas. Você pode fazer isso através do console do database criado no Atlas.
- O nome do banco de dados pode ser preenchido de acordo com a sua preferência, eu recomendo usar o nome _beers_.

Instale as dependências e faça o build da aplicação. O build é necessário para transpilar o código TS em JS:

```bash
npm install
```

```bash
npm run build
```

Execute o projeto em segundo plano e libere o terminal, iremos precisar dele para mais algumas configurações:

```bash
node dist/src/server.js &
```

```bash
crtl + c //comando para liberar o terminal
```

Instale o nginx, e abra os arquivos de configuração usando o editor nano:

```bash
sudo apt install nginx
```

```bash
sudo nano /etc/nginx/sites-available/default
```

Dentro do nano, vá até a sessão **location /** e coloque as seguintes configurações:

```nginx
location / {
    proxy_pass http://localhost:3000; # 3000 ou a porta colocado no .env
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

Reinicie o nginx e sua aplicação já estará no ar:

```bash
sudo service nginx restart
```

Agora você pode acessar a aplicação passando o IP da instância AWS na URL no seu client API: `http://<ip-aws>/beers`

## Tecnologias usadas no projeto

- [Node.js](https://nodejs.org/en)
- [Docker](https://www.docker.com/)
- [AWS](https://aws.amazon.com/pt/)

## Usando os serviços em cloud

### <a name="mongodb"></a>Acessando credenciais do MongoBD Atlas

1. Acesse a [página de organizações do MongoDB Atlas](https://cloud.mongodb.com/v2#/preferences/organizations), crie uma nova organização caso ainda não tenha uma, e acesse a organização criada.
2. No painel da organização crie um novo projeto e acesse ele, ou acesse um já existente.
3. Na página do projeto crie um novo banco de dados e lembre-se de escolher o plano free.
4. Na página de **Quickstart**, crie um username e uma password, e lembre-se anotar eles em um local seguro, role a página e inclua seu IP local na lista de IPs permitidos.
5. Acesse a aba de **Database** e clique em **Connect**, selecione a opção **Drivers**, se abrirá uma nova página e nela você encontrará a URL de conexão, copie a URL para o **.env**, lembre-se de substituir a password criada no passo anterior.

### <a name="spotifyapi"></a>Acessando credencias do Spotify API

1. Acesse a **página da documentação de [getting started](https://developer.spotify.com/documentation/web-api/tutorials/getting-started)** e seguir o passo a passo até o passo 3 da sessão de **Request an access token**
