# Challenges
Serviço que gerencia os desafios enviados pelos alunos

### Primeiros passos
- Rodar o docker para criação dos serviços e banco: `docker-compose up -d`
- Instalar as dependências: `yarn`
- (Opcional) Criar o arquivo `.env` com o mesmo conteúdo do `.env.example`, alterando apenas as configurações que julgar necessário
- Rodar o projeto em modo de desenvolvimento: `yarn dev`

### Decisões
No decorrer do desenvolvimento, optei por seguir alguns caminhos baseado no contexto e complexidade do projeto

<details>
  <summary><strong>ORM</strong></summary>

  ORMs facilitam o desenvolvimento (principalmente pela tipagem, criação de seeds ou até mesmo por abstraírem o uso do SQL caso o dev não esteja muito familiarizado) e arquitetura do banco (com o uso de migrations)

  #### Abordagem
  Poderia utilizar o TypeORM ou Drizzle, mas optei por seguir com o Prisma:
  - amplamente utilizado pela Rocketseat (nada mais justo que utilizar uma tech da empresa que criou o desafio)
  - acabou evoluindo muito, o que trouxe uma comunidade muito grande
  - tipagens e documentação muito boas (possui até uma página na própria documentação do Nest)
  - TypeORM acabou ficando meio parado no tempo (só agora estão [anunciando o futuro da lib](https://github.com/typeorm/typeorm/blob/master/docs/future-of-typeorm.md))
  - ainda não possuo muita familiaridade com o Drizzle, mas seu query builder é parecido com SQL, o que pode facilitar ou dificultar o uso pelos devs (o ideal seria validar com o time, mas não é esse o caso)
</details>

<details>
  <summary><strong>Code First</strong></summary>

</details>

<details>
  <summary><strong>Package manager + linter</strong></summary>

  Normalmente utilizo o PNPM (principalmente pela agilidade na hora de instalar as libs e o pouco espaço que ocupa depois da instalação delas) e o Biome (menos dependências e muito rápido) mas segui com o Yarn e ESLint + prettier apenas por já estarem integrados com o serviço de `corrections`
</details>

<details>
  <summary><strong>Compilador</strong></summary>

  Instalei o SWC pra fazer a compilação por causa da sua rapidez. Além disso, alterei algumas configs do `nest-cli.json` pra:
  - deletar a `/dist` ao realizar o build (evitando ter que instalar a lib `rimraf`);
  - realizar um check das tipagens do projeto com a prop `typeCheck`
</details>

<details>
  <summary><strong>Alterações nos arquivos já criados</strong></summary>

  Por ser praticamente um monorepo, aproveitei pra reutilizar alguns arquivos de configuração em ambos os serviços `challenges` e `corrections`

  #### Abordagem
  Decidi apenas mover alguns arquivos pra fora do `/packages/` ao invés de configurar o `workspaces` do Yarn ou usar o `lerna` ou alguma lib parecida:
  - é um caminho mais rápido e simples
  - evita algumas refatorações desnecessárias
</details>

<details>
  <summary><strong>Env</strong></summary>

  Prefiri deixar o projeto mais customizável em relação às configs básicas, mas utilizando valores padrão (pegos do `docker-compose.yml`) caso o dev queira rodar o projeto direto

  #### Abordagem
  Decidi criar o `/src/infra/config.ts` ao invés de utilizar a lib `@nestjs/config`:
  - é um caminho um pouco mais simples, já que não é preciso configurar nem importar nenhum módulo/serviço adicional;
  - o env não é acessado em nenhuma parte do projeto, somente no `/src/main.ts` e no `/src/infra/database/schema.prisma`;
  - é fácil visualizar os valores default de todas as envs
</details>

### Disclaimer

- Sempre opto por criar esse tipo de documentação em inglês, mas segui com o português apenas por ser um projeto desenvolvido para teste
- Mesmo sendo um teste, sugestões/dúvias são bem-vindas!
