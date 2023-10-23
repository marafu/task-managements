<h1 align="center">Task Management</h1>

## Descrição

<p>O task management uma API de gerenciamento de tarefas simples. Utilizando os princípios da arquitetura REST em compliance com o OWASP Top 10 API 2021.</p>

## Fluxos Principais:

- Registro de usuário
- Login do usuário
- Criação de tarefa
- Mudança de status da tarefa
- Cancelamento da tarefa

Foi utilizado o NodeJS para criar o sistema pois é uma tecnologia, amplamente utilizada além de permitir o desenvolvimento com maior liberdado comparado a outras stacks.

![](https://img.shields.io/static/v1?label=License&message=MIT&color=blue&style=flat)
![Docker Image Version (tag latest semver)](https://img.shields.io/docker/v/hefis/task-managements/latest)

## Decisões da Modelagem de ameaças

Não foquei necessáriamente em nenhuma metodologia utilizada utilizada pelo mercado (STRIDE, DREAD, PASTA, etc...),
eu fiz uma modelagem de ameaças de forma manual e não foquei em diagramas de fluxos, matriz de rastrabilidade, pois isso demanda muito tempo, também não foquei em ameaças de infra e redes, pois existem ferramentas que podem fazer esse trabalho com muito mais rapidez. Por motivo de tempo, o foco maior da modelagem de ameaças foi no dominio e nos casos de usos da API.

## Decisões de Design

Utilizei DDD, SOLID e Clean Arch para facilitar a segregação de camadas e consequentemente de validações e controles de vulnerabilidades sem perde a manutenabilidade do sistema. Permitindo o aumento do projeto sem perder a qualidade do código e facilitando a refatoração no futuro.
