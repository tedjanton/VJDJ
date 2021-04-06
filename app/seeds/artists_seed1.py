from app.models import db, Artist


def artists_seed1():
  lady_gaga = Artist(name="Lady Gaga",
                     bio="Academy Award, Golden Globe & Grammy-winner Lady Gaga is a one-of-a kind artist and performer. She has amassed over 35M global album sales & 32B streams, making her one of the best-selling musicians of all time. Her fifth studio album “Joanne” (Oct 2016) debuted at #1 on the Billboard Top 200, marking her 4th consecutive #1 album - the first female to do so in the 2010s. In 2018, Gaga reached her 5th consecutive #1 album on the Billboard Top 200 chart for the soundtrack of “A Star is Born.” In 2015, Gaga starred in the 5th installment of the FX drama, “American Horror Story: Hotel.” The role earned her a 2016 Golden Globe award for Best Actress in a Mini-Series. Gaga headlined the 2017 Pepsi Zero Sugar Super Bowl Half Time show. Her 13-minute solo performance amassed 117.5M viewers & was the most-watched Super Bowl halftime show of all time. Gaga most recently starred alongside Bradley Cooper, “A Star is Born” in a performance that led her to an Oscar Nomination for Best Actress, a Golden Globe nomination for Best Performance by an Actress in a Motion Picture, a Critics’ Choice Award & National Board of Review Award for Best Actress in a Motion Picture. In Dec 2018, Gaga launched her exclusive Las Vegas residency at the Park Theater. In Sept 2019, Gaga launched her beauty brand Haus Laboratories. In 2012, Lady Gaga launched Born This Way Foundation, a non-profit organization dedicated to empowering youth, embracing differences & inspiring kindness & bravery.",
                     image="/static/lady-gaga.jpeg")
  dua_lipa = Artist(name="Dua Lipa",
                    bio="Global pop superstar Dua Lipa released Future Nostalgia, her #1 UK sophomore album, this year to worldwide acclaim. It is one of the best reviewed albums of 2020 and debuted in the top 5 of the Billboard 200 Album Chart. Upon release, Future Nostalgia was the most streamed album in a day by a British female artist globally in Spotify history and has over 4.5 billion streams to date. Dua is the biggest female artist in the world on Spotify and is currently the third biggest artist overall with nearly 60 million monthly listeners. The album’s certified platinum lead single “Don’t Start Now” is a worldwide hit with one billion streams on Spotify alone, and a #2 spot on the Billboard Hot 100, a career high for the pop star. The track also broke her personal best record of weeks at #1 at US Top 40 radio. Dua followed the success of “Don’t Start Now” by releasing smash UK single “Physical,” and her US Top 40 #1 “Break My Heart.” Most recently, Future Nostalgia was shortlisted for UK’s prestigious Mercury Prize. Future Nostalgia is the follow up to Dua’s eponymous 2017 debut, which is certified platinum and spawned 6 platinum tracks. She made BRIT Award history in 2018 by becoming the first female artist to pick up five nominations, with two wins for British Breakthrough Act and British Female Solo Artist, and received two Grammy awards for Best New Artist and Best Dance Recording in early 2019.",
                    image="/static/dua-lipa.jpeg")
  lil_nas_x = Artist(name="Lil Nas X",
                     bio="Moseying onto the scene with a surprise breakthrough, Atlanta's Lil Nas X merged the pastoral tones of country music with hip-hop, putting his spin on a subgenre dubbed country-trap. Like similar experiments by  and Lil Tracy, the hybrid was an unexpected success for the rapper: his debut single, 'Old Town Road,' was a viral hit on social media and streaming, sending him toward the upper reaches of the Hot 100. By the summer of 2019, it was certified multi-platinum and number one across the globe. Born Montero Lamar Hill, he issued the 2018 mixtape Nasarati before releasing 'Old Town Road' at the end of the year. The track went viral on social media and, once it broke into the mainstream, it accumulated millions of plays on streaming services. Sampling instrumental '34 Ghosts IV,' 'Old Town Road' clocked in at just under two minutes but managed to climb into the Top 15 of the Hot 100. While the song could also have topped the Hot Country Songs chart, Billboard made the decision to remove it from the running for not containing enough country music elements. The controversy only helped boost plays, and 'Old Town Road' continued its climb up the main chart. In June 2019, his eight-track collection 7 was released. The eclectic EP included both versions of 'Old Town Road' and newer material that ranged from mainstream rap and pop styles to takes on alternative hard rock. The song 'Rodeo' revisited Lil Nas X's country-rap cowboy persona and included a cameo from, while second single 'Panini' became a Top Five hit with the help of rapper DaBaby. To cap his banner year, he was nominated for seven Grammy Awards, including Record of the Year for 'Old Town Road,' Album of the Year for 7, and Best New Artist.",
                     image="/static/lil-nas-x.jpeg")

  ariana_grande = Artist(name="Ariana Grande",
                         bio="Ariana Grande is perhaps the quintessential pop star of the last half of the 2010s, capturing the era's spirit and style. Emerging in 2013 with the hit single 'The Way,' Grande initially appeared to be the heir to the throne of , due in part to her powerhouse vocals. With its  production, her debut Yours Truly underscored her debt to '90s R&B, but Grande quickly incorporated hip-hop and EDM into her music. 'Problem,' a 2014 smash duet with , was the first indication of her development, an evolution underscored by the hits 'Bang Bang' and 'Love Me Harder,' which featured  &  and , respectively. Grande maintained her popularity with 2016's Dangerous Woman, then really hit her stride with 2018's Sweetener and its swift sequel Thank U, Next, whose title track became her first number one pop hit. That achievement was quickly equaled by '7 Rings,' a glitzy anthem for the Instagram age that consolidated her stardom and artistry, as well as 'Positions,' the lead single from 2020's R&B-heavy album of the same name.",
                         image="/static/ariana-grande.jpeg")
  db.session.add(lady_gaga)
  db.session.add(dua_lipa)
  db.session.add(lil_nas_x)
  db.session.add(ariana_grande)
  db.session.commit()

def undo_artists_seed1():
  db.session.execute('TRUNCATE artists CASCADE;')
  db.session.commit()
