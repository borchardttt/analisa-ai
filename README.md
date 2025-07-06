# 📊 Analisa Aí - API para Gestão de Times de Futebol

## Sobre o Projeto

O **Analisa Aí** é uma API desenvolvida com NestJS para auxiliar analistas de futebol no gerenciamento de times e estatísticas de jogadores.  
O objetivo é facilitar a organização de informações essenciais sobre equipes, desempenho individual e coletivo, permitindo consultas rápidas e gestão eficiente de dados.

---

## Temas Abordados na API

- **Gerenciamento de Times**  
  - Cadastro de novos times
  - Edição e exclusão de times existentes
  - Listagem de todos os times cadastrados

- **Gerenciamento de Jogadores**  
  - Associação de jogadores a times
  - Cadastro de novos jogadores
  - Edição e exclusão de jogadores
  - Consulta de jogadores por time

- **Estatísticas dos Jogadores**  
  - Registro de estatísticas individuais:
    - Gols
    - Assistências
    - Partidas jogadas
    - Cartões amarelos/vermelhos (extensível)
  - Atualização e visualização de estatísticas

- **Filtros e Relatórios**  
  - Filtragem de jogadores por desempenho (ex: maiores goleadores, mais assistências)
  - Relatórios simples de desempenho por time

---

## Tecnologias Utilizadas

- **NestJS** (Framework principal)
- **TypeScript** (Linguagem principal)
- **GitHub Copilot** (Auxílio na escrita de código e comentários)
- **Node.js** (Ambiente de execução)

---

## Estrutura Inicial do Projeto

- `AppModule`
- `CoreModule`
- `SharedModule`

Organizados para garantir a modularidade e escalabilidade do projeto desde o início.

---

## Checklist 

## Checklist 

🎯 RA1 – Projetar e desenvolver uma API funcional utilizando o framework NestJS

[x] ID1: Configuração correta do ambiente e criação da API com NestJS (rotas + arquitetura modular)

[x] ID2: Aplicação de boas práticas na separação de responsabilidades (services e controllers)

[x] ID3: Uso de providers e injeção de dependência com NestJS

[x] ID4: Manipulação adequada de rotas HTTP (params, query, body)

[x] ID5: Tratamento de erros com filtros globais e mensagens personalizadas

[x] ID6: Criação e uso de DTOs para validação e consistência de dados

[] ID7: Aplicação correta de pipes de validação no NestJS

💾 RA2 – Implementar persistência de dados com banco de dados relacional (Prisma ou TypeORM)

[x] ID8: Modelagem de dados com entidades, campos e relacionamentos (ERD)

[x] ID9: Conexão da API com banco de dados relacional (PostgreSQL, MySQL etc.)

[x] ID10: Criação e aplicação de migrações no banco

[x] ID11: Implementação de operações CRUD completas para ao menos uma entidade

🧪 RA3 – Realizar testes automatizados para garantir a qualidade da API

[x] ID12: Implementação de testes (unitários/integrados) com Jest

[x] ID13: Cobertura de testes para rotas e serviços principais (incluindo CRUD)

🌐 RA4 – Gerar documentação da API e realizar o deploy

[] ID14: Integração do Swagger com documentação interativa da API

[] ID15: Deploy funcional da API em nuvem (ex.: Render, Heroku, Vercel)

[] ID16: Verificação do funcionamento da API em produção (incluindo Swagger e banco)

[] ID17: Uso correto de variáveis de ambiente com ConfigModule

[]  ID18: Implementação de versionamento de API REST

🔐 RA5 – Implementar autenticação, autorização e segurança

[x] ID19: Configuração de autenticação com JWT

[x] ID20: Controle de acesso por roles e permissões com Guards

[x] ID21: Uso de Middleware para autenticação, logging ou CORS

[x] ID22: Uso de Interceptadores para logging ou modificação de respostas