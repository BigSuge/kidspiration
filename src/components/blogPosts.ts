// Blog post data with full content
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  featured: boolean;
  content: {
    intro: string;
    sections: {
      heading?: string;
      text: string;
      image?: string;
    }[];
    conclusion: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Jesus Healed My Broken Arm!',
    excerpt: 'Little Emma shares how she prayed and Jesus healed her broken arm. Read her amazing testimony!',
    image: 'https://images.unsplash.com/photo-1612446485216-2dc52fc0bb05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwY2VsZWJyYXRpbmclMjBzdWNjZXNzfGVufDF8fHx8MTc2MjQ4MzU1NXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'testimonies',
    date: 'November 5, 2025',
    author: 'Emma, Age 8',
    readTime: '3 min',
    featured: true,
    content: {
      intro: 'Hi friends! My name is Emma and I\'m 8 years old. I want to tell you about something amazing that happened to me last month!',
      sections: [
        {
          heading: 'What Happened? 🤕',
          text: 'I was playing on the monkey bars at school during recess. I love swinging from bar to bar! But one day, I slipped and fell really hard on my arm. It hurt SO much! I started crying and my teacher came running over. My arm felt really wrong and I couldn\'t move it.',
        },
        {
          heading: 'Going to the Doctor 🏥',
          text: 'My mom came to pick me up and took me to the doctor. The doctor took some pictures of my arm called X-rays. He said my arm was broken! He wanted to put a big heavy cast on my arm that would stay on for 6 whole weeks! I was so sad because I wouldn\'t be able to play or draw.',
        },
        {
          heading: 'We Prayed Together 🙏',
          text: 'Before the doctor put the cast on, my mom said, "Emma, let\'s pray first!" We held hands and my mom prayed. She said, "Thank you Jesus for Emma\'s arm. We believe you can heal it right now!" Then I prayed too. I said, "Jesus, please make my arm better. I love you!"',
          image: 'https://images.unsplash.com/photo-1644822861244-1257985cbf0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHByYXlpbmclMjB0b2dldGhlcnxlbnwxfHx8fDE3NjI0ODM1NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          heading: 'The Amazing Miracle! ✨',
          text: 'When we finished praying, something wonderful happened! My arm started to feel better! The pain went away! I could move my arm again! The doctor was so surprised! He took more X-ray pictures and guess what? My arm wasn\'t broken anymore! The doctor said, "This is impossible! But your arm is completely healed!" My mom and I were so happy we started jumping up and down!',
        },
        {
          heading: 'What I Learned 💖',
          text: 'I learned that Jesus really listens to our prayers! He loves us so much and He can do anything! Now when something bad happens, I remember to pray right away. Jesus is my best friend and He\'s your best friend too!',
        },
      ],
      conclusion: 'If you\'re sick or hurt, remember to pray! Jesus loves you and He can help you too! Don\'t forget to thank Him for all the good things He does! 🌟',
    },
  },
  {
    id: 2,
    title: 'Amazing Kids Bible Camp 2025',
    excerpt: 'Join us for the most fun Bible camp ever! Games, stories, and so much more!',
    image: 'https://images.unsplash.com/photo-1602986572360-e66ab76b2bdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwb3V0ZG9vciUyMGFjdGl2aXRpZXN8ZW58MXx8fHwxNzYyNDY2NzU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'events',
    date: 'November 4, 2025',
    author: 'HTTN Team',
    readTime: '4 min',
    featured: false,
    content: {
      intro: 'Get ready for the most exciting Bible camp ever! We\'re planning something super special just for you!',
      sections: [
        {
          heading: 'When and Where? 📅',
          text: 'Our Amazing Kids Bible Camp will happen from December 20-24, 2025! That\'s right - five whole days of fun! We\'ll meet at Loveworld Church every day from 9:00 AM to 3:00 PM. Don\'t worry, we\'ll have yummy snacks and lunch!',
        },
        {
          heading: 'What Will We Do? 🎮',
          text: 'Every day will be packed with amazing activities! We\'ll play super fun games like treasure hunts, relay races, and team challenges. We\'ll learn cool Bible stories about heroes like David, Daniel, and Esther. We\'ll sing awesome songs and learn new praise dances. And guess what? We\'ll do fun crafts that you can take home!',
          image: 'https://images.unsplash.com/photo-1560774941-857a6042383e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwYmlibGUlMjBjYW1wfGVufDF8fHx8MTc2MjQ4NDAxOXww&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          heading: 'Special Themes Each Day! 🌈',
          text: 'Day 1: "Be Brave Like David!" - We\'ll learn about courage! Day 2: "Be Kind Like Jesus!" - We\'ll learn about helping others! Day 3: "Be Strong Like Samson!" - We\'ll learn about God\'s strength! Day 4: "Be Wise Like Solomon!" - We\'ll learn about making good choices! Day 5: "Be Joyful!" - We\'ll celebrate everything we learned with a big party!',
        },
        {
          heading: 'Amazing Prizes! 🏆',
          text: 'Everyone who comes to camp will get a special HTTN backpack with cool stuff inside! We\'ll have prizes for the best team players, the kindest campers, and everyone who memorizes their Bible verses. On the last day, we\'ll give out certificates and surprise gifts!',
        },
        {
          heading: 'How to Sign Up 📝',
          text: 'Ask your parents to register you at the church office or online at our website. The camp is FREE for all kids ages 5-12! Bring your friends - the more the merrier! Space is limited, so sign up soon!',
        },
      ],
      conclusion: 'We can\'t wait to see you at Bible Camp! It\'s going to be the best week ever! Get ready for fun, friends, and learning about Jesus! 🎉',
    },
  },
  {
    id: 3,
    title: 'David and Goliath: Be Brave!',
    excerpt: 'Learn how young David defeated the giant with God\'s help. You can be brave too!',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGxlYXJuaW5nJTIwYmlibGV8ZW58MXx8fHwxNzYyNDQ4NDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'bible',
    date: 'November 3, 2025',
    author: 'Pastor Joy',
    readTime: '5 min',
    featured: false,
    content: {
      intro: 'Today we\'re going to learn about one of the bravest boys in the Bible - David! His story teaches us that with God, we can do anything!',
      sections: [
        {
          heading: 'Who Was David? 🧒',
          text: 'David was a young shepherd boy. His job was to take care of sheep. He wasn\'t very big or strong, but he loved God very much! David would sing songs to God while watching the sheep. He knew God was always with him.',
        },
        {
          heading: 'The Giant Problem! 😱',
          text: 'One day, there was a HUGE problem! A giant soldier named Goliath was scaring everyone. Goliath was over 9 feet tall - that\'s taller than your ceiling! He had big armor and a giant sword. All the grown-up soldiers were afraid of him. Every day, Goliath would shout, "Send someone to fight me!" But nobody was brave enough.',
        },
        {
          heading: 'David Steps Up! 💪',
          text: 'When David heard about Goliath, he wasn\'t scared! He said, "I\'ll fight the giant!" Everyone laughed at him. "You\'re just a boy!" they said. But David remembered how God helped him protect his sheep from lions and bears. He knew God would help him again!',
        },
        {
          heading: 'The Big Fight! 🎯',
          text: 'David didn\'t use a sword or armor. He took 5 smooth stones and his slingshot. Goliath laughed when he saw little David. But David said, "You come with a sword, but I come in the name of the Lord!" Then David put a stone in his slingshot and threw it! WHOOSH! The stone hit Goliath right in the forehead! The giant fell down! David won!',
        },
        {
          heading: 'What Can We Learn? 🌟',
          text: 'David teaches us that: 1) Size doesn\'t matter when God is with you! 2) Being brave means trusting God even when you\'re scared! 3) God can use anyone - even kids - to do amazing things! 4) Prayer and faith are more powerful than any weapon!',
        },
      ],
      conclusion: 'Remember, you don\'t have to be big or strong to be brave! When you trust in God, you can face any problem - just like David! What "giants" (big problems) are you facing? Talk to God about them! 💖',
    },
  },
  {
    id: 4,
    title: 'Healthy Snacks Kids Love',
    excerpt: 'Yummy and healthy snacks that will make you strong! Try these tasty recipes.',
    image: 'https://images.unsplash.com/photo-1733162948632-4dd8610b4d5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwaGVscGluZyUyMG90aGVyc3xlbnwxfHx8fDE3NjI0ODM1NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'health',
    date: 'November 2, 2025',
    author: 'Nurse Sarah',
    readTime: '3 min',
    featured: false,
    content: {
      intro: 'Hi friends! Nurse Sarah here! Want to know a secret? Healthy food can taste AMAZING! Let me show you some super yummy snacks that are also good for you!',
      sections: [
        {
          heading: 'Rainbow Fruit Kabobs 🌈',
          text: 'These are so fun to make and eat! Ask a grown-up to help you cut up: strawberries (red), oranges (orange), pineapple (yellow), green grapes (green), blueberries (blue), and purple grapes (purple). Put them on a stick to make a rainbow! Fruit gives you energy to play and helps you grow strong!',
          image: 'https://images.unsplash.com/photo-1670607231914-605c7b94edd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZnJ1aXQlMjBzbmFja3N8ZW58MXx8fHwxNzYyNDg0MDE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          heading: 'Ants on a Log 🐜',
          text: 'This funny-named snack is delicious! Take a piece of celery, spread peanut butter (or almond butter) on it, and put raisins on top! The celery is the "log," the peanut butter is like "dirt," and the raisins are the "ants!" It\'s crunchy, creamy, and sweet all at once!',
        },
        {
          heading: 'Yogurt Parfait Party 🍨',
          text: 'In a cup, layer vanilla yogurt, granola, and your favorite berries. Keep adding layers until the cup is full! Top with a strawberry! Yogurt helps your tummy feel good and makes your bones strong. Plus, it tastes like dessert!',
        },
        {
          heading: 'Veggie Rainbow with Dip 🥕',
          text: 'Did you know vegetables can be fun? Cut up carrots, cucumbers, bell peppers (red, yellow, orange), and cherry tomatoes. Arrange them in a rainbow on your plate! Mix some ranch dressing or hummus for dipping. Crunch, crunch, crunch!',
        },
        {
          heading: 'Banana Sushi Rolls 🍌',
          text: 'Spread peanut butter on a tortilla, place a banana on it, and roll it up tight! Ask a grown-up to cut it into circles like sushi! You can roll them in crushed cereal or mini chocolate chips for extra fun!',
        },
      ],
      conclusion: 'Remember, eating healthy helps your body stay strong so you can play, learn, and do all the things you love! God made all these yummy foods to help you grow! What\'s your favorite healthy snack? 🥗',
    },
  },
  {
    id: 5,
    title: 'I Prayed and God Answered!',
    excerpt: 'Michael tells us how he prayed for his sick puppy and God answered his prayer.',
    image: 'https://images.unsplash.com/photo-1644822861244-1257985cbf0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHByYXlpbmclMjB0b2dldGhlcnxlbnwxfHx8fDE3NjI0ODM1NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'miracles',
    date: 'November 1, 2025',
    author: 'Michael, Age 7',
    readTime: '2 min',
    featured: false,
    content: {
      intro: 'Hi! I\'m Michael and I\'m 7 years old. I want to tell you about when God answered my prayer for my puppy, Buddy!',
      sections: [
        {
          heading: 'My Best Friend Buddy 🐶',
          text: 'Buddy is my golden puppy. He\'s so fluffy and fun! We play fetch together every day. He sleeps in my room and we\'re best friends!',
        },
        {
          heading: 'Buddy Got Sick 😢',
          text: 'One morning, Buddy wouldn\'t eat his breakfast. He just laid down and looked sad. His nose was warm and he didn\'t want to play. I was so worried! My dad said we needed to take him to the animal doctor.',
        },
        {
          heading: 'I Remembered to Pray 🙏',
          text: 'My mom taught me that we can pray about everything! So I closed my eyes and talked to Jesus. I said, "Dear Jesus, Buddy is sick. Please make him feel better. I love him so much. Thank you Jesus!" I really believed Jesus would help.',
        },
        {
          heading: 'God Answered Fast! ⚡',
          text: 'The next morning, I ran to check on Buddy. Guess what? He was wagging his tail! He ate all his food and wanted to play! The animal doctor said he was all better! God answered my prayer so fast!',
        },
      ],
      conclusion: 'I learned that God cares about everything we care about - even our pets! We can talk to God about anything and He listens! Now I pray about everything! 💕',
    },
  },
  {
    id: 6,
    title: 'Reading is Fun! Book Club',
    excerpt: 'Join our new kids book club where we read amazing Bible stories together!',
    image: 'https://images.unsplash.com/photo-1704241370920-e67ce744d8cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNoaWxkcmVuJTIwcmVhZGluZ3xlbnwxfHx8fDE3NjI0NzU0MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'events',
    date: 'October 31, 2025',
    author: 'HTTN Team',
    readTime: '3 min',
    featured: false,
    content: {
      intro: 'Do you love stories? We\'re starting a super fun Book Club just for kids! Come read, play, and make new friends!',
      sections: [
        {
          heading: 'What is Book Club? 📚',
          text: 'Book Club is where we meet to read amazing Bible stories together! We\'ll read about brave heroes, miracles, and how much God loves us. It\'s not boring - we make it super fun with games, snacks, and activities!',
        },
        {
          heading: 'When Do We Meet? ⏰',
          text: 'We meet every Saturday at 10:00 AM at Loveworld Church. Each meeting lasts one hour. That\'s enough time to read a story, play a game, do a craft, and have a snack!',
        },
        {
          heading: 'This Month\'s Book 📖',
          text: 'This month, we\'re reading "The Story of Noah\'s Ark!" We\'ll learn about Noah, the big boat, and all the animals. Each week we\'ll read a different part of the story. We\'ll even build our own mini arks!',
        },
        {
          heading: 'Fun Activities! 🎨',
          text: 'Week 1: We\'ll make animal masks! Week 2: We\'ll build mini arks with craft sticks! Week 3: We\'ll learn a Noah\'s Ark song and dance! Week 4: We\'ll have a rainbow party to celebrate the end of the story!',
        },
      ],
      conclusion: 'Book Club is FREE and everyone is welcome! Bring your friends and let\'s have fun reading together! See you on Saturday! 📚✨',
    },
  },
  {
    id: 7,
    title: 'My Friend Got Healed at Church!',
    excerpt: 'Sophia shares her friend\'s miracle healing story from last Sunday\'s service.',
    image: 'https://images.unsplash.com/photo-1612446485216-2dc52fc0bb05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwY2VsZWJyYXRpbmclMjBzdWNjZXNzfGVufDF8fHx8MTc2MjQ4MzU1NXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'testimonies',
    date: 'October 30, 2025',
    author: 'Sophia, Age 9',
    readTime: '4 min',
    featured: false,
    content: {
      intro: 'Hi everyone! My name is Sophia and I saw something amazing happen at church last Sunday!',
      sections: [
        {
          heading: 'My Friend Lily 👧',
          text: 'Lily is my best friend. We sit together at church every Sunday. We love singing the worship songs and learning about Jesus together!',
        },
        {
          heading: 'Lily Couldn\'t Hear 👂',
          text: 'Lily had trouble hearing from her left ear since she was born. She had to turn her head to hear people talk. Sometimes at school, she would miss what the teacher said. It made her sad. The doctors said they couldn\'t fix it.',
        },
        {
          heading: 'The Pastor Prayed ⛪',
          text: 'Last Sunday, our pastor asked if anyone needed healing. Lily raised her hand! She walked to the front of the church. I went with her to hold her hand. The pastor put his hand on her ear and prayed. He said, "Be healed in Jesus\' name!"',
        },
        {
          heading: 'The Miracle Happened! ✨',
          text: 'Right away, Lily\'s eyes got big! She said, "I can hear! I can hear!" The pastor whispered in her left ear and she heard every word! Everyone in church started clapping and praising God! Lily was crying happy tears! I was crying too!',
        },
        {
          heading: 'Now Lily is Different! 😊',
          text: 'Now at school, Lily can hear everything! She doesn\'t have to turn her head anymore. She\'s so happy! Every day she thanks God for healing her ear. Her mom took her to the doctor and the doctor was so surprised! He said her ear is perfect now!',
        },
      ],
      conclusion: 'I learned that miracles really happen! God can do anything! If you need healing or if you know someone who does, don\'t give up! Pray and believe! God loves us so much! 💖',
    },
  },
  {
    id: 8,
    title: 'The Good Samaritan Story',
    excerpt: 'Learn how to be kind to everyone, just like the Good Samaritan in this Bible story!',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGxlYXJuaW5nJTIwYmlibGV8ZW58MXx8fHwxNzYyNDQ4NDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'bible',
    date: 'October 29, 2025',
    author: 'Pastor Joy',
    readTime: '5 min',
    featured: false,
    content: {
      intro: 'Jesus told this story to teach us about being kind. It\'s called "The Good Samaritan" and it\'s one of my favorite stories!',
      sections: [
        {
          heading: 'The Man Who Got Hurt 🤕',
          text: 'One day, a man was walking on a road. Suddenly, some bad people came and hurt him! They took his money and left him on the ground. The poor man was hurt really badly and couldn\'t get up. He needed help!',
        },
        {
          heading: 'The People Who Walked By 🚶',
          text: 'First, a priest walked by. You\'d think a priest would help, right? But he just looked at the hurt man and walked to the other side of the road! Then another religious man came. He peeked at the hurt man but kept walking! Nobody was helping!',
        },
        {
          heading: 'The Good Samaritan Helps! ❤️',
          text: 'Then a Samaritan man came. Now, here\'s the thing - most people didn\'t like Samaritans. But this man had a kind heart! When he saw the hurt man, he stopped right away! He cleaned the man\'s wounds and put bandages on them. He put the hurt man on his own donkey and took him to a hotel.',
        },
        {
          heading: 'Going the Extra Mile! ⭐',
          text: 'The Samaritan didn\'t just drop the man off - he stayed to take care of him! The next day, he gave the hotel owner money and said, "Take care of this man. If it costs more, I\'ll pay you when I come back!" Wow! That\'s really being kind!',
        },
        {
          heading: 'What Jesus Wants Us to Learn 🌟',
          text: 'Jesus told this story to teach us: 1) Be kind to EVERYONE, even people who are different from you! 2) Don\'t just feel sorry for people - actually help them! 3) Sometimes helping means giving your time or money! 4) It doesn\'t matter who someone is - everyone deserves kindness!',
        },
      ],
      conclusion: 'You can be a "Good Samaritan" too! When you see someone who needs help - like a kid who dropped their books, or someone sitting alone at lunch - be kind and help them! That\'s what Jesus wants us to do! 💝',
    },
  },
  {
    id: 9,
    title: 'Exercise Games for Kids',
    excerpt: 'Fun exercises that will help you stay strong and healthy! Let\'s play and move!',
    image: 'https://images.unsplash.com/photo-1602986572360-e66ab76b2bdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwb3V0ZG9vciUyMGFjdGl2aXRpZXN8ZW58MXx8fHwxNzYyNDY2NzU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'health',
    date: 'October 28, 2025',
    author: 'Coach Tony',
    readTime: '4 min',
    featured: false,
    content: {
      intro: 'Hey kids! Coach Tony here! Did you know that exercising can be super fun? Let me show you some games that will make you strong and healthy!',
      sections: [
        {
          heading: 'Animal Walks! 🦁',
          text: 'Let\'s pretend to be different animals! Bear Walk: Walk on your hands and feet with your bottom up high! Crab Walk: Sit down, put your hands behind you, lift your bottom up, and walk backwards! Frog Jumps: Squat down and jump forward like a frog! Do each animal walk for 1 minute. It\'s so funny and it makes your muscles strong!',
        },
        {
          heading: 'Freeze Dance Party! 💃',
          text: 'Put on your favorite music and dance like crazy! But here\'s the rule - when the music stops, you have to FREEZE like a statue! Hold your pose until the music starts again! This game helps you with balance and it\'s really fun with friends!',
        },
        {
          heading: 'Simon Says Exercise! 🎮',
          text: 'Play Simon Says but with exercises! "Simon says do 5 jumping jacks!" "Simon says touch your toes!" "Simon says run in place!" Remember, only do it if Simon says! This helps you listen AND exercise at the same time!',
        },
        {
          heading: 'Treasure Hunt Race! 🏃',
          text: 'Hide toys or small objects around your yard or house. Set a timer for 5 minutes. Run and find as many "treasures" as you can! The person who finds the most wins! This gets your heart pumping and is so exciting!',
        },
        {
          heading: 'Balloon Keep-Up! 🎈',
          text: 'Blow up a balloon and don\'t let it touch the ground! You can hit it with your hands, head, knees, or feet! Count how many times you can hit it before it touches the ground. Try to beat your record! This helps with hand-eye coordination!',
        },
      ],
      conclusion: 'Remember, exercising should be FUN! Try to play and move for at least 30 minutes every day. It will help you grow strong, sleep better, and feel happy! What\'s your favorite exercise game? 🌟',
    },
  },
];
