# Kullanım
İndirip **library/modules/Application.config.js** dosyasında ki token kısmını değiştirin.
Sonrasında şu komutu dosya konumunda açtığınız CMD'ye yazın:

```
npm install && node index.js
```

# Bilgi
Altyapı sadece Slash komutlarını destekler ve dilerseniz SlashCommandBuilder kullanmadan komut dosyalarında data içerisine kendi değerlerinizi girebilirsiniz. Builder kullanmak bana daha kolay geldiği için öyle yaptım.

Altyapıda sadece iki komut var, biri sadece idsini girdiğiniz kişi tarafından çalıştırılabilir gelişmiş bir eval komutudur. Diğeri ise normal bir ping komutudur. Geri kalan her şey sizin elinizde. İstediğiniz şeyi ekleyip dilediğiniz gibi kullanabilirsiniz.

<img src='https://i.imgur.com/YZ259VE.png'/><br><img src='https://i.imgur.com/pQzNWfI.png'/>
