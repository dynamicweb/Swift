class VideoPlayer extends HTMLElement {
  internals;
  
  constructor() {
    super();
    this.internals = this.attachInternals();
  }
  
  connectedCallback() { 
        
    const observer = new MutationObserver(() => {
      observer.disconnect();
      this.video = this.querySelector("[swift-video]");
      this.playBtn = this.querySelector("[swift-video-play-btn]");
  
      this.video.onloadeddata = () => this.playBtn.style.visibility = "visible";
      this.playBtn.addEventListener("click", () => this.playing = !this.playing );
    });

    observer.observe(this, { childList: true, subtree: true });
  }

  get playing() {
    return this.internals.states.has('playing') || this.internals.states.has('--playing');
  }

  set playing(isPlaying) {

    if (isPlaying) {
      try {
        this.internals.states.add("playing");
        this.internals.states.add("controls");
      } catch (e) {
        this.internals.states.add('--playing');
        this.internals.states.add('--controls');
      }
      
      this.video.play();
    } else {
      this.internals.states.delete("playing");
      this.internals.states.delete("--playing");
      this.video.pause();
    }
  }
}

window.customElements.define("swift-video-player", VideoPlayer);
