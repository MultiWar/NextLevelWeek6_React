# Let me Ask!

## O que é?
Let me Ask! é o projeto desenvolvido durante a Next Level Week/Together, a sexta edição do evento realizado pela [@Rocketseat](https://rocketseat.com.br/). Sua premissa é a de criar salas em que todos podem fazer perguntas para o criador. A intenção é fazer como se fosse um espaço de perguntas de uma conferência/livestream, onde o criador veria as perguntas mandadas por texto e responderia durante o evento em questão, apenas podendo destacar a pergunta ou marcá-la como respondida.

## Tecnologias
Para este projeto, foram utilizados React e Firebase para as funcionalidades, e sass para a estilização. O projeto React é apenas um CRA, e, do Firebase, foram utilizados o Realtime Database, a autenticação Google e o serviço de hosting (que pode ser acessado [clicando aqui](https://letmeask-e2811.web.app/).)

## Como eu aprimorei o projeto além do mostrado em aula?
- Adicionei 2 sorts, pra garantir que as perguntas marcadas como "respondidas" ficassem no fundo e as destacadas no topo;
- Adicionei Framer-Motion, principalmente para que a reordenação das perguntas seja animada;
- Tornei o site responsivo;
- Adicionei um botão pro usuário ver suas próprias informações e poder deslogar;
- Adicionei toasts com React-Toastify pra deixar o feedback que o site dá mais bonito;
- Adicionei o modal para o encerramento da sala, seguindo o design feito pela equipe da Rocketseat.

## Como testar a aplicação?
Você pode clonar o repositório e usar as próprias env variables do Firebase ou entrar [neste link](https://letmeask-e2811.web.app/) para mexer na aplicação que está hospedada pelo Firebase Hosting.

# Prints da aplicação

## Desktop

### Página inicial
![Screenshot_905](https://user-images.githubusercontent.com/54380823/123488649-be7d2900-d5e6-11eb-9bce-4cba11f29349.png)


### Página de uma sala pela visão de um não admin
![Screenshot_906_LI](https://user-images.githubusercontent.com/54380823/123489888-55e37b80-d5e9-11eb-9988-47e9b6abf355.jpg)


### Exemplo de toast (este após clicar no botão de copiar o código da sala)
![Screenshot_907](https://user-images.githubusercontent.com/54380823/123489177-d0130080-d5e7-11eb-8452-921ecf43f24e.png)


### Exemplo de toast de erro
![Screenshot_918](https://user-images.githubusercontent.com/54380823/123489196-d86b3b80-d5e7-11eb-8af2-d1ae4317c0d2.png)


### Botão do usuário
![Screenshot_908](https://user-images.githubusercontent.com/54380823/123489233-e620c100-d5e7-11eb-851a-4f587e549599.png)


### Página de uma sala pela visão de um admin
![Screenshot_909_LI](https://user-images.githubusercontent.com/54380823/123489916-68f64b80-d5e9-11eb-8df7-edd7ef2b965b.jpg)


### Modal de encerrar a sala
![Screenshot_910_LI](https://user-images.githubusercontent.com/54380823/123489937-76133a80-d5e9-11eb-8e23-97742f9ff28f.jpg)


### Exemplificando o sort por likes (é ordenado de mais likes pra menos likes)
![Screenshot_911_LI](https://user-images.githubusercontent.com/54380823/123489963-83302980-d5e9-11eb-8bd5-8ec12cb283c4.jpg)


### Mostrando que, mesmo não tendo nenhum like, esta questão fica em primeiro por ter sido destacada
![Screenshot_912_LI](https://user-images.githubusercontent.com/54380823/123490006-a35fe880-d5e9-11eb-88c2-bec64bcbb5f9.jpg)


## Mobile (todos os prints tirados usando o moto g4 de referência na ferramenta de responsividade do inspetor de elementos)

### Página inicial
![Screenshot_913](https://user-images.githubusercontent.com/54380823/123490084-c9858880-d5e9-11eb-9b6b-d694f190bcfe.png)


### A mesma sala mostrada anteriormente, visão de não admin
![Screenshot_914](https://user-images.githubusercontent.com/54380823/123490112-d609e100-d5e9-11eb-8fce-47ef27b30f30.png)


### Design das questões, visão de não admin
![Screenshot_915_LI](https://user-images.githubusercontent.com/54380823/123490164-f174ec00-d5e9-11eb-907d-fc61f4f58942.jpg)


### A mesma sala mostrada anteriormente, agora na visão de admin
![Screenshot_916_LI](https://user-images.githubusercontent.com/54380823/123490226-0c476080-d5ea-11eb-86ac-836c8a62ca87.jpg)


### Modal de encerrar sala
![Screenshot_917_LI](https://user-images.githubusercontent.com/54380823/123490262-179a8c00-d5ea-11eb-9c89-716c349c9476.jpg)
