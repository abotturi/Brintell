# Brintell

## Iniciar 

## Back-end
 - Entrar na pasta ```./api```

#### Com Docker
 - Instalar o docker desktop e iniciar
 - Checar se o dokcer-compose esta instalado ```docker-compose -v```
    > Se caso não estiver, instalar
 - Liberar a porta **8080** e **3306** do computador
 - Entrar na raiz da pasta e dar o comando ```docker-compose up --build```
    > Pode demorar um pouco para iniciar (5 min se for a primeira vez)<br />
    > Esse comando iniciara o servidor e criara o banco de dados ja com as tabelas necessárias <br/>
    > Ao iniciar ira aparecer no terminal **Servidor aberto na porta 8080**

#### Manual
 - Iniciar o MySql
 - Criar o banco de dados chamado brintell
 - Colocar suas credenciais na pasta ```./src/database/data-source.ts```
 - Dar o comando ```npm i```
 - Dar o compando ```npm run build```
 - Depois dar o comando ```npm run start```

## Front-end
 - Entrar na pasta ```./web```
 - Dar o comando ```npm i```
 - Dar o comando ```npm start```
