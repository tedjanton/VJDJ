from app.models import db, Artist


def artists_seed2():
  lizzo = Artist(name="Lizzo",
                     bio="Combining her roots in Houston rap, gospel soul, and classical flute as confidently as she addresses issues of race, sexuality, and body positivity, singer/rapper Lizzo's music abounds with humor and charisma. Her 2013 debut, Lizzobangers, reflected her years in Minneapolis' hip-hop and indie music scenes ('s  was one of its producers), and as time went on, her style became more wide-ranging and melodic. On 2015's self-released Big Grrrl Small World, she added more R&B and gospel to her sound, a trend that continued on her brash major-label debut and breakthrough album, 2019's Cuz I Love You.",
                     image="/static/lizzo.jpeg")
  the_weeknd = Artist(name="The Weeknd",
                    bio="The Weeknd took over pop music & culture on his own terms filtering R&B, Pop,& hip-hop through an ambitious widescreen lens. The multi-platinum 3X GRAMMY Award winner has emerged as one of the most successful & significant artists of the modern era. 2012’s 3X platinum collated 3 breakout mixtapes—House of Balloons, Thursday & Echoes of Silence—into his 1st chart-topping collection followed by his debut LP in 2013. Two years later, “Earned It (Fifty Shades of Grey)” won “Best R&B Performance” & received an Academy Award nod for “Best Original Song” & 4X Platinum  won a GRAMMY for “Best Urban Contemporary Album.” In 2018,  won the same award, making him the 1st artist ever to win twice. His 6-track project My Dear Melancholy marked his 3rd consecutive #1 bow on the Billboard Top 200, & “Pray For Me” with Kendrick Lamar was featured in the trailer for the Academy Award winning Marvel film Black Panther. In 2020 the 80’s-nostalgic track  became a worldwide sensation, igniting viral dance challenges across social media, peaking at #1 in 30+ countries & headlining Mercedes Benz EQC campaign.  held the #1 spot on Billboard 200 for 4 consecutive weeks, marking his 4th #1 album & becoming the first to ever rank #1 on the Billboard 200, Hot 100, and Artist 100 simultaneously.  is the #1 R&B streaming album of all time (followed by  at #2).",
                    image="/static/the-weeknd.jpeg")
  miley_cyrus = Artist(name="Miley Cyrus",
                     bio="Miley Cyrus is one of the most influential artists in pop culture with over 125 million Instagram followers. She has five #1 albums including her 2013 GRAMMY-nominated album Bangerz, also certified 3x platinum in the U.S. In addition, she has had an impressive five sold-out world tours throughout her career. In 2015 she released her free, surprise experimental album, Miley Cyrus and Her Dead Petz, co-produced by Wayne Coyne and other Flaming Lips members. Her sixth album, Younger Now, released in 2017, exceeded 2.2 billion streams. In June of 2019 she starred in an episode of Netflix Black Mirror. The standout role had Cyrus playing popstar Ashley O and featured the track “On A Roll,” which earned 168 million streams, topping the TV Songs chart. Cyrus joins a short list of singers who have charted under three separate names, but is especially rare as she has had two of these chart positions with acting roles.   This summer, Miley released her first single, “Midnight Sky,” from her seventh studio album Plastic Hearts. The song went #1 on iTunes in 68 countries, and the self-directed video has amassed 122 million views leaving fans to witness Miley as the ever-evolving artist that she is. The album features the likes of Billy Idol and Joan Jett. The second single released from the album, “Prisoner,” had massive fan reactions and features Dua Lipa on the track and in the video. Miley also teamed up with Stevie Nicks for the “Edge of Midnight (Midnight Sky Remix).",
                     image="/static/miley-cyrus.jpeg")

  cardi_b = Artist(name="Cardi B",
                         bio="Rapper and entertainer Cardi B made her debut in the late 2010s with a quick ascent to the top of the rap and pop charts. After an initial run of singles that crowned her the first female rapper in nearly two decades to top the Billboard Hot 100 with the hit 'Bodak Yellow,' she issued her Grammy-nominated, critically acclaimed debut album, 2018's Invasion of Privacy, which reached number one and broke additional records with the summer smash 'I Like It.' Capping off her whirlwind breakthrough era, she became the first solo female rapper to win a Grammy for Best Rap Album.",
                         image="/static/cardi-b.jpeg")
  db.session.add(lizzo)
  db.session.add(the_weeknd)
  db.session.add(miley_cyrus)
  db.session.add(cardi_b)
  db.session.commit()

def undo_artists_seed2():
  db.session.execute('TRUNCATE artists CASCADE;')
  db.session.commit()
