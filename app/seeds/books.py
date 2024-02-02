from app.models import db, Book, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice, sample, randint


def seed_books(all_users):
    book1 = Book(
        title='The Lord of the Rings',
        author='J.R.R. Tolkien',
        page_num='1178',
        yr_published='1955',
        genre='classics',
        description="In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others. But the One Ring was taken from him, and though he sought it throughout Middle-earth, it remained lost to him. After many ages it fell by chance into the hands of the hobbit Bilbo Baggins.From Sauron's fastness in the Dark Tower of Mordor, his power spread far and wide. Sauron gathered all the Great Rings to him, but always he searched for the One Ring that would complete his dominion. When Bilbo reached his eleventy-first birthday he disappeared, bequeathing to his young cousin Frodo the Ruling Ring and a perilous quest: to journey across Middle-earth, deep into the shadow of the Dark Lord, and destroy the Ring by casting it into the Cracks of Doom. The Lord of the Rings tells of the great quest undertaken by Frodo and the Fellowship of the Ring: Gandalf the Wizard; the hobbits Merry, Pippin, and Sam; Gimli the Dwarf; Legolas the Elf; Boromir of Gondor; and a tall, mysterious stranger called Strider.",
        picture='https://porchstorybucket.s3.amazonaws.com/book+covers/book1.jpeg',
        user_id=1,
        # book_read=sample(all_users, randint(0, len(all_users)))
        )
    book2 = Book(
        title='In the Realm of Hungry Ghosts: Close Encounters with Addiction',
        author='Gabor Maté',
        page_num='480',
        yr_published='2007',
        genre='nonfiction',
        description="He would probably dispute it, but Gabor Maté is something of a compassion machine. Diligently treating the drug addicts of Vancouver's notorious Downtown Eastside with sympathy in his heart and legislative reform in mind can't be easy. But Maté never judges. His book is a powerful call-to-arms, both for the decriminalization of drugs and for a more sympathetic and informed view of addiction. As Maté observes, 'Those whom we dismiss as 'junkies' are not creatures from a different world, only men and women mired at the extreme end of a continuum on which, here or there, all of us might well locate ourselves.' In the Realm of Hungry Ghosts begins by introducing us to many of Dr. Maté's most dire patients who steal, cheat, sell sex, and otherwise harm themselves for their next hit. Maté looks to the root causes of addiction, applying a clinical and psychological view to the physical manifestation and offering some enlightening answers for why people inflict such catastrophe on themselves. Finally, he takes aim at the hugely ineffectual, largely U.S.-led War on Drugs (and its worldwide followers), challenging the wisdom of fighting drugs instead of aiding the addicts, and showing how controversial measures such as safe injection sites are measurably more successful at reducing drug-related crime and the spread of disease than anything most major governments have going. It's not easy reading, but we ignore his arguments at our peril. When it comes to combating the drug trade and the ravages of addiction, society can use all the help it can get.",
        picture='https://porchstorybucket.s3.amazonaws.com/book+covers/book2.jpg',
        user_id=2,
        # book_read=sample(all_users, randint(0, len(all_users)))
        )
    book3 = Book(
        title='Tattoos on the Heart: The Power of Boundless Compassion',
        author='Gregory Boyle',
        page_num='217',
        yr_published='2009',
        genre='nonfiction',
        description="Father Gregory Boyle's sparkling parables about kinship and the sacredness of life are drawn from twenty years working with gangs in LA. How do you fight despair and learn to meet the world with a loving heart? How do you overcome shame? Stay faithful in spite of failure? No matter where people live or what their circumstances may be, everyone needs boundless, restorative love. Gorgeous and uplifting, Tattoos on the Heart amply demonstrates the impact unconditional love can have on your life. As a pastor working in a neighborhood with the highest concentration of murderous gang activity in Los Angeles, Gregory Boyle created an organization to provide jobs, job training, and encouragement so that young people could work together and learn the mutual respect that comes from collaboration. Tattoos on the Heart is a breathtaking series of parables distilled from his twenty years in the barrio. Arranged by theme and filled with sparkling humor and glowing generosity, these essays offer a stirring look at how full our lives could be if we could find the joy in loving others and in being loved unconditionally. From giant, tattooed Cesar, shopping at JCPenney fresh out of prison, we learn how to feel worthy of God's love. From ten-year-old Lula we learn the importance of being known and acknowledged. From Pedro we understand the kind of patience necessary to rescue someone from the darkness. In each chapter we benefit from Boyle's wonderful, hard-earned wisdom. Inspired by faith but applicable to anyone trying to be good, these personal, unflinching stories are full of surprising revelations and observations of the community in which Boyle works and of the many lives he has helped save. Erudite, down-to-earth, and utterly heartening, these essays about universal kinship and redemption are moving examples of the power of unconditional love in difficult times and the importance of fighting despair. With Gregory Boyle's guidance, we can recognize our own wounds in the broken lives and daunting struggles of the men and women in these parables and learn to find joy in all of the people around us. Tattoos on the Heart reminds us that no life is less valuable than another.",
        picture='https://porchstorybucket.s3.amazonaws.com/book+covers/book3.jpg',
        user_id=3,
        # book_read=sample(all_users, randint(0, len(all_users)))
        )
    book4 = Book(
        title='Dopesick: Dealers, Doctors, and the Drug Company That Addicted America',
        author='Beth Macy',
        page_num='560',
        yr_published='2018',
        genre='nonfiction',
        description="In this extraordinary work, Beth Macy takes us into the epicenter of a national drama that has unfolded over two decades. From the labs and marketing departments of big pharma to local doctor's offices; wealthy suburbs to distressed small communities in Central Appalachia; from distant cities to once-idyllic farm towns; the spread of opioid addiction follows a tortuous trajectory that illustrates how this crisis has persisted for so long and become so firmly entrenched. Beginning with a single dealer who lands in a small Virginia town and sets about turning high school football stars into heroin overdose statistics, Macy sets out to answer a grieving mother's question-why her only son died-and comes away with a gripping, unputdownable story of greed and need. From the introduction of OxyContin in 1996, Macy investigates the powerful forces that led America's doctors and patients to embrace a medical culture where overtreatment with painkillers became the norm. In some of the same communities featured in her bestselling book Factory Man, the unemployed use painkillers both to numb the pain of joblessness and pay their bills, while privileged teens trade pills in cul-de-sacs, and even high school standouts fall prey to prostitution, jail, and death. Through unsparing, compelling, and unforgettably humane portraits of families and first responders determined to ameliorate this epidemic, each facet of the crisis comes into focus. In these politically fragmented times, Beth Macy shows that one thing uniting Americans across geographic, partisan, and class lines is opioid drug abuse. But even in the midst of twin crises in drug abuse and healthcare, Macy finds reason to hope and ample signs of the spirit and tenacity that are helping the countless ordinary people ensnared by addiction build a better future for themselves, their families, and their communities.",
        picture='https://porchstorybucket.s3.amazonaws.com/book+covers/book4.jpg',
        user_id=1,
        # book_read=sample(all_users, randint(0, len(all_users)))
        )
    book5 = Book(
        title="Dreamland: The True Tale of America's Opiate Epidemic",
        author='Sam Quinones',
        page_num='384',
        yr_published='2015',
        genre='nonfiction',
        description="As an adult book, Sam Quinones's Dreamland took the world by storm, winning the NBCC Award for General Nonfiction and hitting at least a dozen Best Book of the Year lists. Now, adapted for the first time for a young adult audience, this compelling reporting explains the roots of the current opiate crisis. In 1929, in the blue-collar city of Portsmouth, Ohio, a company built a swimming pool the size of a football field; named Dreamland, it became the vital center of the community. Now, addiction has devastated Portsmouth, as it has hundreds of small rural towns and suburbs across America. How that happened is the riveting story of Dreamland. Quinones explains how the rise of the prescription drug OxyContin, a miraculous and extremely addictive painkiller pushed by pharmaceutical companies, paralleled the massive influx of black tar heroin--cheap, potent, and originating from one small county on Mexico's west coast, independent of any drug cartel. Introducing a memorable cast of characters--pharmaceutical pioneers, young Mexican entrepreneurs, narcotics investigators, survivors, teens, and parents--Dreamland is a revelatory account of the massive threat facing America and its heartland.",
        picture='https://porchstorybucket.s3.amazonaws.com/book+covers/book5.jpeg',
        user_id=2,
        # book_read=sample(all_users, randint(0, len(all_users)))
        )
    book6 = Book(
        title='Tattoos: Telling the Secrets of the Soul',
        author='Allan Dayhoff',
        page_num='249',
        yr_published='2018',
        genre='nonfiction',
        description="The souls of men and women have chosen this season in history to speak in a unique and special way. The soul is writing its secrets on the live canvas of the skin with permanent ink... with tattoos. Many see a person covered in tattoos walk by and harbor a snarky and judgmental response, when in fact the tattoos just told a very personal story. The stories of pain, loss, hope, and other sentiments of great importance are revealed on the skin of the wearer. And those without tattoos may very well have missed a loud, yet intimately revealing, message. The previous edition, God and Tattoos: Why Are People Writing on Themselves? and this current version takes a go at the WHY. After over 1000 tattoo interviews and in tattoo parlors and convention across the nation, Allan Dayhoff shares his research, and his love for his many new tattooed friends.",
        picture='https://porchstorybucket.s3.amazonaws.com/book+covers/book6.jpg',
        user_id=3,
        book_read=sample(all_users, randint(0, len(all_users)))
        )
    book7 = Book(
        title="The Genius In Your Wound: Life's Worst Can Reveal Your Best",
        author='Allan Dayhoff',
        page_num='258',
        yr_published='2019',
        genre='nonfiction',
        description="Hearing firsthand accounts with people, I began to see a relationship between a kind of unexplained insight into the experiences of others and the previously hidden, unseen effects of my own life story. Like the early morning sunrise after agonizingly long, cold, and dark wintry days, I began to warm to the idea that the chaos and cruelty that scars our lives is not the beginning nor the end of the story for any of us. Listening to these wounded souls I was amazed to discover that I already knew what they would say. I began to realize that the wounds of my own life might have given birth to a Genius ability to connect with others who suffer like I have. Genius may be the other side of our wound!",
        picture='https://porchstorybucket.s3.amazonaws.com/book+covers/book7.jpg',
        user_id=1,
        # book_read=sample(all_users, randint(0, len(all_users)))
        )
    book8 = Book(
        title='Never Split the Difference: Negotiating as If Your Life Depended on It',
        author='Chris Voss',
        page_num='274',
        yr_published='2016',
        genre='nonfiction',
        description="After a stint policing the rough streets of Kansas City, Missouri, Chris Voss joined the FBI, where his career as a hostage negotiator brought him face-to-face with a range of criminals, including bank robbers and terrorists. Reaching the pinnacle of his profession, he became the FBI’s lead international kidnapping negotiator. Never Split the Difference takes you inside the world of high-stakes negotiations and into Voss’s head, revealing the skills that helped him and his colleagues succeed where it mattered most: saving lives. In this practical guide, he shares the nine effective principles—counterintuitive tactics and strategies—you too can use to become more persuasive in both your professional and personal life. Life is a series of negotiations you should be prepared for: buying a car, negotiating a salary, buying a home, renegotiating rent, deliberating with your partner. Taking emotional intelligence and intuition to the next level, Never Split the Difference gives you the competitive edge in any discussion.",
        picture='https://porchstorybucket.s3.amazonaws.com/book+covers/book8.jpg',
        user_id=2,
        # book_read=sample(all_users, randint(0, len(all_users)))
        )
    book9 = Book(
        title='Lonesome Dove',
        author='Larry McMurtry',
        page_num='960',
        yr_published='1985',
        genre='fiction',
        description="A love story, an adventure, and an epic of the frontier, Larry McMurtry's Pulitzer Prize- winning classic, Lonesome Dove, the third book in the Lonesome Dove tetralogy, is the grandest novel ever written about the last defiant wilderness of America. Journey to the dusty little Texas town of Lonesome Dove and meet an unforgettable assortment of heroes and outlaws, whores and ladies, Indians and settlers. Richly authentic, beautifully written, always dramatic, Lonesome Dove will make listeners laugh, weep, dream, and remember.",
        picture='https://porchstorybucket.s3.amazonaws.com/book+covers/book9.jpeg',
        user_id=3,
        # book_read=sample(all_users, randint(0, len(all_users)))
        )
    book10 = Book(
        title='Just Mercy: A Story of Justice and Redemption',
        author='Bryan Stevenson',
        page_num='336',
        yr_published='2014',
        genre='nonfiction',
        description="Bryan Stevenson was a young lawyer when he founded the Equal Justice Initiative, a legal practice dedicated to defending those most desperate and in need: the poor, the wrongly condemned, and women and children trapped in the farthest reaches of our criminal justice system. One of his first cases was that of Walter McMillian, a young man who was sentenced to die for a notorious murder he insisted he didn't commit. The case drew Bryan into a tangle of conspiracy, political machination, and legal brinksmanship--and transformed his understanding of mercy and justice forever. Just Mercy is at once an unforgettable account of an idealistic, gifted young lawyer's coming of age, a moving window into the lives of those he has defended, and an inspiring argument for compassion in the pursuit of true justice.",
        picture='https://porchstorybucket.s3.amazonaws.com/book+covers/book10.jpg',
        user_id=1,
        # book_read=sample(all_users, randint(0, len(all_users)))
        )
    book11 = Book(
        title='The Myth of Normal: Trauma, Illness & Healing in a Toxic Culture',
        author='Gabor Maté',
        page_num='562',
        yr_published='2022',
        genre='psychology',
        description="In his new masterpiece, renowned physician, addiction expert and author Gabor Maté dissects the underlying causes of this malaise - physical and emotional, and connects the dots between our personal suffering and the pressures of modern-day living. Over four decades of clinical experience, Dr Maté has found that the common definition of 'normal' is false: virtually all disease is actually a natural reflection of life in an abnormal culture, as we grow further and further apart from our true selves. But he also shows us the pathway to reconnection and healing. Filled with stories of people in the grip of illness or in the triumphant wake of recovery, this life-affirming book shows how true health is possible - if we are willing to embrace authenticity above social expectations. The Myth of Normal is Gabor Maté's most ambitious, compassionate and urgent book yet. Mental illness is on an unstoppable rise. Some 45% of Europeans suffer high blood pressure, and nearly 70% of Americans take at least one prescription drug. Illness and trauma are defining how we live.",
        picture='https://porchstorybucket.s3.amazonaws.com/morebooks/book11.jpeg',
        user_id=3,
        # book_read=sample(all_users, randint(0, len(all_users)))
        )
    


    all_books = [book1, book2, book3, book4, book5, book6, book7, book8, book9, book10, book11]
    add_books = [db.session.add(book) for book in all_books]
    db.session.commit()
    return all_books


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM books"))

    db.session.commit()