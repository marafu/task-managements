# Modelagem de Ameaças

## Componentes:

- Interface de autenticação (registro e login)
- Interface de gerenciamento de tarefas (criação, edição e exclusão)
- Banco de dados (para armazenar informações de usuários e tarefas)

## Fluxos Principais:

- Registro de usuário
- Login do usuário
- Criação de tarefa
- Edição de tarefa
- Exclusão de tarefa

## Possíveis ameaças:

### 1. Registro de usuário:

#### Ameaças

Exposição de Informações Sensíveis: Se o processo de registro não for seguro, informações sensíveis, como senhas, podem ser expostas.

Brute Force Attack: Atacantes podem tentar criar múltiplas contas de forma automatizada, possivelmente para usar em ataques posteriores.

Injeção: Se os dados inseridos durante o registro não forem validados, um atacante pode tentar inserir código malicioso.

#### Recomendações

- [ ] **Limitação de Taxa (Rate Limiting)**: Estabeleça um número máximo de solicitações permitidas por IP ou token de autenticação em um determinado período de tempo.

- [ ] **Políticas de Senha Forte**: Exija combinações de letras maiúsculas e minúsculas, números e caracteres especiais para senhas. Defina um comprimento mínimo para senhas.

- [ ] Janelas de Retentativa: Após um certo número de tentativas de login falhadas, force um atraso antes que a próxima tentativa possa ser feita.

- [ ] Confirmação de E-mail: Exija a verificação do endereço de e-mail fornecido pelo usuário enviando um link ou código de verificação. Esse passo garante que o e-mail está sob controle do usuário e ajuda a prevenir registros e alterações fraudulentas no perfil.

### 2. Login do usuário:

#### Ameaças

Injeção: Se os dados inseridos durante o registro não forem validados, um atacante pode tentar inserir código malicioso.

#### Recomendações

- [ ] **Autenticação de Dois Fatores (2FA)**: Adicione uma segunda camada de segurança exigindo uma segunda forma de verificação após o login inicial.
- [ ] **Limitação de Taxa**: Implemente um sistema que limite o número de tentativas de login em um determinado período para prevenir ataques de força bruta.

- [ ] **Bloqueio de Contas**: Bloqueie temporariamente contas após um certo número de tentativas de login mal-sucedidas.

- [ ] **Atraso de Login**: Introduza atrasos incrementais após tentativas consecutivas de login malsucedidas.

- [ ] **Logs de Auditoria**: Mantenha registros detalhados das tentativas de login, incluindo informações como horários e tentativas falhas.

- [ ] **Notificações de Login**: Envie notificações para os usuários quando houver uma tentativa de login a partir de um novo dispositivo ou localização.

- [x] **Sessões Expiráveis**: Faça com que as sessões do usuário expirem após um período de inatividade e exija reautenticação.

### 3. Criação de tarefa:

#### Ameaças

**Injeção**: Inserir dados maliciosos que podem ser interpretados e executados, por exemplo, se a tarefa for armazenada e posteriormente renderizada sem a devida validação ou sanitização.

#### Recomendações

- [x] **Validação de Entrada**: Garanta que todos os campos inseridos pelo usuário (como título, descrição, etc.) sejam validados para evitar injeção de SQL, scripts maliciosos (XSS) e outros ataques.

- [x] **Controle de Acesso**: Certifique-se de que apenas usuários autenticados e autorizados possam criar tarefas. Use tokens ou sessões para confirmar a identidade do usuário antes de permitir a criação.

- [ ] **Limitação de Taxa**: Implemente limites para quantas tarefas podem ser criadas por um usuário em um determinado período de tempo para evitar abusos.

- [ ] **Logs de Auditoria**: Mantenha registros de quando e por quem uma tarefa foi criada. Isso ajudará em investigações e monitoramento de atividades suspeitas.

- [x] **Tamanho Máximo da Tarefa**: Defina um tamanho máximo para os detalhes da tarefa (como título e descrição) para evitar sobrecargas e tentativas de ataques DoS.

- [ ] **Encriptação**: Se a tarefa contiver informações sensíveis, considere armazenar os dados de forma criptografada no banco de dados, prezando a LGPD.

### 4. Edição de Tarefa:

#### Ameaças

**Broken Object Level Authorization (BOLA)**: Tentativa de editar tarefas que não pertencem ao usuário, explorando possíveis falhas de autorização.

**Injeção**: Semelhante ao fluxo de criação, tentar inserir ou modificar dados maliciosos durante a edição.

#### Recomendações

- [ ] **Controle de Autorização Rigoroso**: Implemente verificações de autorização para assegurar que o usuário só possa editar tarefas que realmente lhe pertencem. Considere usar uma combinação de ID do usuário e ID da tarefa para determinar a permissão.

- [ ] **Validação de Entrada Robusta**: Use listas de permissões e técnicas de sanitização para evitar a injeção de comandos ou scripts maliciosos durante a edição.

### 5. Exclusão de tarefa:

#### Ameaças

**Broken Object Level Authorization (BOLA)**: Tentativa de excluir tarefas que não pertencem ao usuário.

**Sabotagem**: Um ator mal-intencionado pode tentar excluir tarefas valiosas, causando perda de dados.

#### Recomendações

- [ ] **Controle de Autorização Rigoroso**: Implemente verificações de autorização para assegurar que o usuário só possa editar tarefas que realmente lhe pertencem. Considere usar uma combinação de ID do usuário e ID da tarefa para determinar a permissão.

- [ ] **Validação de Entrada Robusta**: Use listas de permissões e técnicas de sanitização para evitar a injeção de comandos ou scripts maliciosos durante a edição.
