# Challenges
Serviço que gerencia os desafios enviados pelos alunos

### Primeiros passos
1. Rodar o docker para criação dos serviços e banco: `docker-compose up -d`
2. Instalar as dependências: `yarn`
3. Criar o arquivo `.env` com o mesmo conteúdo do `.env.example`, alterando apenas as configurações que julgar necessário
4. Gerar as tipagens do Prisma: `yarn prisma:generate`
5. Rodar as migrations: `yarn prisma:migrations:run`
6. Rodar o projeto em modo de desenvolvimento: `yarn dev`

### Decisões
No decorrer do desenvolvimento, optei por seguir alguns caminhos baseado no contexto e complexidade do projeto

<details>
  <summary><strong>Arquitetura</strong></summary>

  É um ponto que varia muito dependendo do projeto e do time envolvido. No fim, existem diversas arquiteturas e devemos sempre lembrar que os princípios da arquitetura de software não estão escritos em pedra. Mesmo que uma arquitetura X seja escolhida, não precisamos seguir 100% dos princípios que ela trás. Podemos nos basear nessa arquitetura pra criarmos uma que se encaixe melhor no contexto do projeto (seja simplificando ela ou unindo ela com uma arquitetura Y)

  #### Abordagem
  Utilizei DDD e optei por criar uma estrutura mais simplista, mas ainda seguindo os princípios do DDD:
  - `application/`: serve para fazer a validação dos inputs do usuário e criar os contratos de request/response, além de unir os serviços do core e infra nos respectivos arquivos `.module`
  - `core/`: centralização das models, contratos dos repositories e serviços contendo as regras de negócio. Basicamente aqui só existem regras de negócio e chamadas pros serviços da infra
  - `infra/`: códigos de implementação dos repositories (interação com db) e integração com libs externas (nesse projeto, Kafka)
  - `shared/`: utilitários globais que podem ser chamados pelos outros módulos (application, core, e infra) e que podem facilmente ser extraídos para outros projetos. Eles não possuem acoplamento, então **não podem** importar código de outros módulos
</details>

<details>
  <summary><strong>ORM</strong></summary>

  ORMs facilitam o desenvolvimento (principalmente pela tipagem, criação de seeds ou até mesmo por abstraírem o uso do SQL caso o dev não esteja muito familiarizado) e arquitetura do banco (com o uso de migrations)

  #### Abordagem
  Poderia utilizar o TypeORM ou Drizzle, mas optei por seguir com o Prisma:
  - amplamente utilizado pela Rocketseat (nada mais justo que utilizar uma tech da empresa que criou o desafio);
  - acabou evoluindo muito, o que trouxe uma comunidade muito grande;
  - tipagens e documentação muito boas (possui até uma página na própria documentação do Nest);
  - TypeORM acabou ficando meio parado no tempo (só agora estão [anunciando o futuro da lib](https://github.com/typeorm/typeorm/blob/master/docs/future-of-typeorm.md));
  - ainda não possuo muita familiaridade com o Drizzle, mas seu query builder é parecido com SQL, o que pode facilitar ou dificultar o uso pelos devs (o ideal seria validar com o time, mas não é esse o caso)
</details>

<details>
  <summary><strong>Testes</strong></summary>

  #### Abordagem
  - testes unitários: apenas services da pasta core (é onde ficam as regras de negócio, então vi sentido em criar testes apenas pra esses caras)
  - [TODO] testes E2E: fluxo completo, desde a requisição de uma query até a validação do retorno da API
</details>

<details>
  <summary><strong>Paginação</strong></summary>

  A abordagem da paginação depende do projeto. Podemos seguir com a mais conhecida (usando offset e limit) ou com cursores (que é um caso de uso bem diferente, sendo ideal pra infinite scroll mas impossibilitando o usuário de pular da página 2 pra 10 por não sabermos o valor do cursor da página 10)

  #### Abordagem
  Acabei seguindo com offset e limit:
  - mais simples e rápido de ser criado;
  - o ideal seria poder ordenar nossos resultados (pelo menos `createdAt ASC|DESC`), mas acabei não investindo tanto tempo nessa questão
</details>

<details>
  <summary><strong>Code First</strong></summary>

  A ideia de seguir com o Code First foi de que acaba sendo mais legível para devs que não possuem muita familiaridade com GraphQL (ou pelo menos tentar trazer mais agilidade no desenvolvimento). Pessoalmente também prefiro essa abordagem porque gosto de lidar com decorators e classes
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
  - é um caminho mais rápido e simples;
  - evita algumas refatorações desnecessárias
</details>

<details>
  <summary><strong>Env</strong></summary>

  É desnecessário ter um env nesse projeto, mas ainda assim achei melhor criar pra deixar como referência

  #### Abordagem
  Decidi criar o `/src/shared/config/env.config.ts` ao invés de utilizar a lib `@nestjs/config`:
  - além de evitar mais uma dependência com uma lib, é um caminho um pouco mais simples porque não é preciso configurar nem importar nenhum módulo/serviço;
  - o env não é acessado em nenhuma parte do projeto, somente no `/src/main.ts`;
  - é fácil visualizar os valores default de todas as envs
</details>

### Disclaimer

- Sempre opto por criar esse tipo de documentação em inglês, mas segui com o português apenas por ser um projeto desenvolvido para teste
- Acabei fazendo commits com o escopo "challenge" (no caso, o serviço de challenges), mas decidi parar depois. Por ser um "monorepo", a ideia era explicitar a relação do commit com o serviço alterado, mas por ser um teste eu deveria apenas ter referenciado a entidade (challenge ou answer) que eu estava lidando (`fix(answers): answer challenge logic` ao invés de `fix(challenge): answer challenge logic`)
- Mesmo sendo um teste, sugestões/dúvias são bem-vindas!
