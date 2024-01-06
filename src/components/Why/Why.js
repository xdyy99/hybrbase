import React, { useEffect, useState } from 'react';
// import VirtualScroll from 'virtual-scroll'
import gsap from 'gsap'

const list = [
  {
    id: 1,
    title: 'Craftmanship',
    description: 'Get best-in-class content and digital experiences from our craft, we value each process carefully and focus on details more than anyone else.',
    type: 'video',
    image: '',
    video: 'Light_Make_Loop.mp4',
    url: '/#1',
  },
  {
    id: 2,
    title: 'Craftmanship',
    description: 'Get best-in-class content and digital experiences from our craft, we value each process carefully and focus on details more than anyone else.',
    type: 'video',
    image: '',
    video: 'Light_Make_Loop.mp4',
    url: '/#2',
  },
  {
    id: 3,
    title: 'Craftmanship',
    description: 'Get best-in-class content and digital experiences from our craft, we value each process carefully and focus on details more than anyone else.',
    type: 'video',
    image: '',
    video: 'Light_Make_Loop.mp4',
    url: '/#3',
  },
  {
    id: 4,
    title: 'Craftmanship',
    description: 'Get best-in-class content and digital experiences from our craft, we value each process carefully and focus on details more than anyone else.',
    type: 'video',
    image: '',
    video: 'Light_Make_Loop.mp4',
    url: '/#4',
  },
  {
    id: 5,
    title: 'Craftmanship',
    description: 'Get best-in-class content and digital experiences from our craft, we value each process carefully and focus on details more than anyone else.',
    type: 'video',
    image: '',
    video: 'Light_Make_Loop.mp4',
    url: '/#5',
  },
];

const content = {
  title: 'Why people love to \n work with us ',
  btn: 'Read more',
  url: '/about',
} 

const control = {
  position: 0,
  max: 0,
  min:0,
  drag: 0,
  dragged: false,
  dragging: false,
  start: 0,
  X: 0,
  Y: 0,
  url : '',
}

export default function Why() {
  return (
    <div className="why">
      <h1 className="why-title">{content.title}</h1>

      <a className='why-btn' href={content.url}> {content.btn} </a>

      <Slider />
    </div>
  );
}

function Slider() {

  const [count, setCount] = React.useState(0)
  
  useAnimationFrame(deltaTime => {
    // Pass on a function to the setter of the state
    // to make sure we always have the latest state
    setCount(prevCount => (prevCount + deltaTime * 0.01) % 100)

    control.min = window.innerWidth - document.querySelector('.slider-wrapper').offsetWidth;
    control.max = 0;

    limit();
    gsap.to('.slider-wrapper', {
      x: control.position,
      duration: 1,
    })
  })

  // Scroll Wheel 
  // Disabled because of conflict with native scroll
  // Can use this with fullpage 
  //
  // const scroller = new VirtualScroll()
  // scroller.on((event) => {
  //   control.position += event.deltaY * 0.5;
  //   limit();
  // })

  const limit = () => {
    control.position = Math.min(control.max, Math.max(control.min, control.position));
  }

  // Mouse
  const handleMouseDown = (e) => {
    e.preventDefault()

    e.target.closest('.slide') ? control.url = e.target.closest('.slide').href : control.url = ''
  
    control.dragged = false
  
    control.dragging = true
    control.start = control.X
  
    document.querySelector('.slider').style.cursor = `grabbing`
  }
  const handleMouseMove = (e) => {
    control.X = e.clientX
    control.Y = e.clientY

    if(control.dragging && Math.abs(control.X - control.start) > 2 ) control.dragged = true

    if (control.dragging) {
      control.position += control.X - control.start
      control.start = control.X
    }
  }
  const handleMouseUp = (e) => {
    if (!control.dragged && control.url !== '') window.open(control.url)
  
    document.querySelector('.slider').style.cursor = `unset`
    control.dragging = false
  }
  const handleMouseLeave = (e) => {
    // sliderWrap.style.cursor = `grab`
    control.dragging = false
  }

  // Touch
  const handleTouchStart = (e) => {
    e.target.closest('.slide') ? control.url = e.target.closest('.slide').href : control.url = ''
    
    control.dragged = false
    control.dragging = true

    control.X = e.touches[0].clientX
    control.Y = e.touches[0].clientY 
  
    control.start = e.touches[0].clientX
  }
  const handleTouchMove = (e) => {
    control.X = e.touches[0].clientX
    control.Y = e.touches[0].clientY
    
    if(control.dragging && Math.abs(control.X - control.start) > 2 ) control.dragged = true

    if (control.dragging) {
      control.position += (control.X - control.start) * 1.5
      control.start = control.X
    }
  }
  const handleTouchEnd = (e) => {
    if (!control.dragged && control.url !== '') window.open(control.url)

    control.dragging = false
  }


  return (
    <div className="slider" 
      onClick={(e) => {e.preventDefault()}}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseUp={(e) => handleMouseUp(e)}
      onMouseLeave={(e) => handleMouseLeave(e)}

      onTouchStart={(e) => handleTouchStart(e)}
      onTouchMove={(e) => handleTouchMove(e)}
      onTouchEnd={(e) => handleTouchEnd(e)}
    >
      <div className="slider-wrapper">
        {list.map((item) => (
          <div className="slider-item" key={item.id}>
            <Slide {...item}/>
          </div>
        ))}
      </div>
    </div>
  )
}

function Slide({...slide}) {
  return (
    <a href={slide.url} className='slide'>
      <div className="slide-inner" key={slide.id}>
        <div className="slide-media">
          <Media {...slide} />
        </div>
        <div className="slide-info">
          <div className="slide-title">{slide.title}</div>

          <div className="slide-desc">{slide.description}</div>
        </div>
      </div>
    </a>
  )

} 

function Media({...media}) {
  const [playing, setPlaying] = useState(null);
  const videoRef = React.useRef(null);

  useEffect(() => {
    if (playing) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [playing]);

  if (media.type === 'image') return <img className="media-image" src={media.image} alt={media.title} />

  if (media.type !== 'video') return null;

  return (
    <video 
      ref={videoRef}
      className="media-video" 
      loop 
      muted 
      onMouseEnter={() => setPlaying(true)}
      onMouseLeave={() => setPlaying(false)}
      >
      <source src={media.video} type="video/mp4" />
    </video>
  )

  
}

const useAnimationFrame = callback => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();
  
  const animate = time => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime)
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }
  
  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once
}