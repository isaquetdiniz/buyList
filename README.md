# Buy List
Repositório criado para o desafio técnico no estágio da Tracking Trade

## O Desafio
É construir uma API REST CRUD(Create, Read, Update, Delete) com JWT, utilizando Typescript, e POSTGRES como banco de dados, junto à uma integração com testes automatizados e uma interface para visualização dos mesmos.

## Minhas Escolhas
Para o desafio, escolhi construir o back utilizando Node (Express, Typescript, TypeORM), com o Banco de Dados rodando através do Docker (tanto o para teste, quando o de desenvolvimento), JEST como framework de testes, e ReactJS - com TypeScrip - no Front. 

## O Resultado
O projeto consegue realizar as operações básicas e dar o feedback para o usuário, mas possui alguns pontos de melhoria importantes:
* Melhoria na segurança do TOKEN de acesso
* Melhoria na autenticação do usuário
* Mensagens de Feedback
* Melhoria na quantidade e qualidade dos testes
* Melhoria no Design e Responsividade

## Como rodar o projeto?
É possível que você tenha uma melhor experiência caso esteja utilizando Linux.

### O primeiro passo é rodar o docker
1. Se você não tem o docker instalado, pode seguir a instalação por [aqui](https://docs.docker.com/get-docker/).
2. Agora, em seu terminal rode: ```sudo docker pull postgres``` para baixar uma nova imagem docker postgres.
3. Após isso, é possível iniciar o container com ```sudo docker run -p 5432:5432 -e POSTGRES_PASSWORD=docker postgres```
4. Com o container rodando, abra um novo terminal e digite ```sudo docker ps``` para listá-lo e copie o seu **CONTAINER ID**.
5. Agora, vamos acessá-lo usando ```sudo docker exec -it <CONTAINER ID> bash```
6. Dentro do nosso container, é só acessar o postgres com ```psql -U postgres```
7. Agora, criaremos nosso database com ```create database buylist;``` e apertar enter
8. Em seguida criaremos nosso database de teste com ```create database buytestlist;``` e apertar enter
9. Tudo certo! Podemos sair digitando ```exit``` para sair do postgres, e depois ```exit``` para sair do bash do container

### Com o docker e o banco de dados criado
1. Vamos configurar o **.env** para poder rodar o nosso server. 
2. Entre na pasta do **server** , e crie um arquivo .env com:
```
PORT=3001

SECRET=naruto

DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=docker
DATABASE_DB=buylist

DATABASE_DB_TEST=buytestlist
```
3. Agora instale as dependências com ```yarn install```
4. Agora podemos rodar nosso script de test com ```yarn test```, e aguardar os testes serem concluídos


### Após passar nos testes
1. Podemos iniciar a construção do nosso banco de dados de desenvolvimento, para isso rodamos ```yarn typeorm migration:run``` para rodar nossas migrations e criar nossas tabelas.
5. E agora, podemos iniciar o servidor com ```yarn dev```

### Com o servidor rodando
1. Podemos abrir o Postbird ou o Insominia para visualizar o funcionamento das rotas e realizar as requisições nas rotas.
2. Realize um post em ```localhost:3001/user``` e no body passe um JSON com (ou o seu usuário e senha): 
```
{
  "name": "trackingtrade",
  "password": "tracking"
}
```
### Após criar nosso usuário
1. Podemos rodar o nosso front, para isso navegue até o **client**
2. Instale as dependências com ```yarn```
3. Rode o projeto com ```yarn start```
4. Se ele não abrir automaticamente, estará rodando em ```localhost:3000```
5. Insira o usuário e senha que cadastrou e teste a interface

#### Se ocorrer erro por causa da versão do Node, é possível resolver com (e repetir o comando de instalação):
```
sudo npm i -g n
sudo n 14
```
