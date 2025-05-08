
[Português](README.md) | [English](README.en.md)
# Como rodar o projeto com Docker

Siga os passos abaixo para rodar o frontend utilizando Docker e Nginx:

## Pré-requisitos

- [Docker](https://www.docker.com/) instalado na sua máquina

## Passos

1. **Build da aplicação Docker**

   Com o Dockerfile já existente na raiz do projeto, basta executar:
   ```sh
   docker build -t app-monitor-frontend .
   ```

2. **Execute o container**

   ```sh
   docker run -d -p 80:80 --name app-monitor-frontend app-monitor-frontend
   ```

   O app estará disponível em [http://localhost](http://localhost).

3. **Configuração da API**

   Certifique-se de que o endereço da API backend está correto na linha `proxy_pass` do arquivo `nginx.conf`.
