## ♻️ Frontend Mobile

<div align=center>
  <img height="500" src="../.github/home-mobile.png">
<img height="500" src="../.github/detalhes-mobile.svg">
</div>

Assim como no frontend web, o React foi escolhido como a principal biblioteca do projeto. Ele foi utilizado em conjunto com a ferramenta Expo, para garantir a presença de um ambiente já configurado, para as plataformas android e ios. Além disso, foram acrescentadas algumas bibliotecas para o React Native, afim de integrar recursos mais avançados e garantir elegância ao resultado ; )

## Tecnologias
  + Expo
  + React
  + React Native
  + React Native Gesture Handler
  + axios
  + react-native-maps
  + expo-location
  + expo-mail-composer

## Rodando o projeto

Após fazer o download dos projetos, e se certificar de já possuir a plataforma nodejs instalada em sua máquina, basta digitar:

``` bash
# configurar o banco de dados (somente na primeira execução)

cd server
npm run knex:migrate
npm run knex:seed

#  para iniciar qualquer um dos três projetos

cd <nome-da-pasta>
npm install  #  (somente na primeira execução)
npm start
```

*obs: Para utilizar qualquer um dos frontends, é necessário manter a api rodando.*

*obs2: caso o app mobile não esteja se conectando á api, é possível que o ip atual seja diferente do configurado, para isso, basta verificar o console do terminal rodando a api para ver o ip atual e configurá-lo em **mobile/src/services/api.ts***

## 📝 Licença

Esse projeto encontra-se sob a licença MIT. Acesse o arquivo [LICENSE](../LICENSE) para mais informações. 

***

<p align=center>Feito com 💜 por <a href="https://www.linkedin.com/in/lucas-prazeres-781772182/">Lucas dos Prazeres</a><p>
