const rakdb = require('rakdb-beta')
const data = rakdb.getir("oto-rol")

client.on('message', msg => {
    if (msg.content.startsWith("!oto-rol-ayarla")) {
        const kayıtrol = msg.mentions.roles.first().id
        if(data.icindemi("guild", msg.guild.id)){
            msg.reply('Bu sunucuda zaten aktif');
        }else{
            data.ekle({
                guild: msg.guild.id,
                rol: kayıtrol
            })
            msg.reply('Oto kayıt başarıyla kaydedildi');
        }
    }
});

client.on('message', msg => {
    if(msg.content.startsWith("!oto-rol-sıfırla")){
        const veri = data.bul({ guild: msg.guild.id })
        if(veri.veri){
            veri.sil()
            return msg.channel.send('Oto rol sıfırlandı')
        }else{
            msg.channel.send('zaten otorol yok bu sunucuda')
        }
    }
})

client.on("guildMemberAdd", member => {
    const sunucu = data.bul({ guild: member.guild.id })
    if(sunucu.veri) {
        client.guilds.fetch(sunucu.veri.guild).then(guild => {
            const role = guild.roles.cache.get(sunucu.veri.rol)
            member.roles.add(role).catch(console.error);
        })
    }
})

/*
Rakdbli otorol komudu kurmak için
oto-rol.json diye dosya oluşuturup içine []
bunu ekleyin. Kod botun main dosyasına atılacak.
Kullanım
!oto-rol-ayarla @rol
!oto-rol-sıfırla
*/
