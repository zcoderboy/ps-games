
var data = [
  {
    name: "Spider-man : Miles Morales",
    bg: "#141b2d",
    textColor: "#fff",
    image: "https://www.psu.com/wp/wp-content/uploads/2020/10/marvel-spider-man-miles-morales-ps4-ps5-wallpapers-06.jpg",
    description: "Miles Morales, having gained spider-like powers himself at the end of Marvel's Spider-Man, looks to become the newest web-slinger of New York City under the guidance of his mentor, Peter Parker. Parker tells Miles that he has to be like his late father and walk on the path to becoming a hero for the city of New York."
  },
  {
    name: "Cyberpunk 2077",
    bg: "#efe700",
    textColor: "#000",
    image: "https://images.pushsquare.com/c1143ad56a9e2/cyberpunk-2077-reversible-cover.original.jpg",
    description: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.You can customize your character's cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you."
  },
  {
    name: 'Ghost of Tsushima',
    bg: '#2c2928',
    textColor: '#fff',
    image: 'https://blog.playstation.com/tachyon/2020/07/ghost-ost-featured.jpg?resize=1088,612&crop_strategy=smart',
    description: 'Ghost of Tsushima is an action-adventure stealth game played from a third-person perspective. Featuring a large open world, there are no waypoints and can be explored without guidance. Players can travel to different parts of the world on horseback.'
  },
  {
    name: 'FIFA 21',
    bg: '#7642f6',
    textColor: '#fff',
    image: 'https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-21/global_assets/common/featured_images/fifa-21-grid-tile-generic-16x9.jpg.adapt.crop191x100.1200w.jpg',
    description: 'FIFA 21 is a football simulation video game published by Electronic Arts as part of the FIFA series. It is the 28th installment in the FIFA series, and was released 9 October 2020 for Microsoft Windows, Nintendo Switch, PlayStation 4 and Xbox One.',
  },
  {
    name: 'Call of Duty Black Ops : Cold War',
    bg: '#9c2527',
    textColor: '#fff',
    description: 'Black Ops Cold War is set during the early 1980s of the Cold War. Its campaign follows CIA officer Russell Adler as he pursues Perseus, an alleged Soviet spy, whose stated goal is to subvert the United States and tilt the balance of power toward the Soviet Union.',
    image: 'https://assets1.ignimgs.com/2020/08/20/cod-black-ops-cold-war-cover-1597947738556.jpg'
  },
  {
    name: "Assassin's Creed Valhalla",
    bg: '#313a57',
    textColor: '#fff',
    description: "In Assassin's Creed Valhalla, become Eivor, a legendary Viking raider on a quest for glory. Explore a dynamic and beautiful open world set against the brutal backdrop of England's Dark Ages. Raid your enemies, grow your settlement, and build your political power in the quest to earn a place among the gods in Valhalla.",
    image: 'https://be-gaming.com/wp-content/uploads/2020/11/ACV.jpg'
  }
]

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getMarkup(game,index) {
  return `
    <div class="game-card" data-index="${index}" data-bg="${game.bg}" data-name="${game.name}" data-color="${game.textColor}">
      <img class="game-card-img" src="${game.image}"/>
      <div class="game-card-icon browse" data-opened="0">
        <i class="fa fa-arrow-right"></i>
      </div>
      <div class="game-card-desc">
        <p>${game.description.substring(0, 150) + " ..."}</p>
      <div>
    </div>
  `
}

!function($,data){ 
  let fragment = $.createDocumentFragment();
  data.forEach(function(game,index){
    let div = $.createElement('div')
    div.innerHTML = getMarkup(game,index) 
    fragment.append(div)
  })
  $.getElementById('game-browse').appendChild(fragment);
  $.querySelectorAll('.game-card-icon').forEach((node)=>{
    let rect = {}
    node.addEventListener('click',async function(){
      if(this.dataset.opened == false){
        // Creating different timelines for the animations
        let timeline = gsap.timeline();
        let iconTimeline = gsap.timeline()
        // Getting data attribute values and initial positions
        let img = this.previousElementSibling
        let bg = this.parentNode.dataset.bg
        let index = this.parentNode.dataset.index
        let textColor = this.parentNode.dataset.color
        let name = this.parentNode.dataset.name
        let newRect = {} = this.getBoundingClientRect();
        let rect1 = img.getBoundingClientRect();
        let descNode = $.querySelector('.game-reveal-desc')

        descNode.querySelector('h1').textContent = name
        descNode.querySelector('p').textContent = data[index].description

        // Animating elements that are not part of any timeline
        gsap.to(document.body,{backgroundColor: bg, duration: 1})
        document.getElementById('game-reveal').style.display = "grid"
        timeline.to('#game-browse',{display:'none',duration:0})

        // Moving elements and adding classes before image and text animation
        img.classList.remove('game-card-img')
        img.classList.add('game-reveal-img')
        this.classList.remove('browse')
        this.classList.add('reveal')

        $.getElementById('game-reveal').dataset.game = name
        $.getElementById('game-reveal').insertAdjacentElement('beforeend',this)
        $.getElementById('game-reveal').insertAdjacentElement('afterbegin',img)
        newRect = img.getBoundingClientRect()

        // Moving nav icon button
        iconTimeline.from(this,0.5,{
          x: rect.left - this.getBoundingClientRect().left,
          y: rect.top - this.getBoundingClientRect().top,
          ease: Power4.easeOut,
        })
        iconTimeline.to(this.querySelector('i'),{
          rotate: 180,
          duration: 0.3
        })

        // Moving image and description
        timeline.from(img,1.2,{
          x: rect1.left - newRect.left,
          y: rect1.top - newRect.top,
          ease: Elastic.easeOut,
        })
        timeline.to(descNode,{opacity:1,color: textColor, duration:0.3})

        document.getElementById('game-reveal').style.display = "grid"
        this.dataset.opened = "1"
      }else{
        // Creating different timelines for the animations
        let timeline = gsap.timeline();
        let iconTimeline = gsap.timeline()

        let targetCard = $.querySelector(`.game-card[data-name="${this.parentNode.dataset.game}"]`)
        let image = this.parentNode.firstElementChild
        let descNode = this.parentNode.children[1]

        gsap.to(document.body,{backgroundColor: '#ffffff', duration: 1})
        this.classList.remove('reveal')
        this.classList.add('browse')
        targetCard.insertBefore(this,targetCard.firstElementChild)

        iconTimeline.from(this,0.5,{
          x: this.getBoundingClientRect().left - rect.left,
          y: this.getBoundingClientRect().top - rect.top,
          ease: Power4.easeIn,
        })
        iconTimeline.to(this.querySelector('i'),{
          rotate: 0,
          duration: 0.3
        })
        // Moving image and description
        timeline.to(descNode,{opacity:0, duration:0.3})
        await sleep(300)
        gsap.to('#game-reveal',{position: 'absolute'})
        targetCard.insertAdjacentElement('afterbegin',image)
        image.classList.add('game-card-img')
        image.classList.remove('game-reveal-img')
        timeline.to('#game-browse',{display:'grid',duration:0})
        timeline.to(image,0.5,{
          opacity: 1,
          ease: Elastic.easeIn,
        })
        // Show browse div when animation is over
        gsap.to('#game-reveal',{position: 'relative'})
        gsap.to('#game-reveal',{display: 'none',duration: 0})
        this.dataset.opened = "0"
      }
    })
  })
}(document,data)