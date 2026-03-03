class VideoPlayer extends HTMLElement {
  internals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }
  
  connectedCallback() {

    const observer = new MutationObserver(() => {
      observer.disconnect();
      this.video = this.querySelector("[data-swift-video]");
      this.playBtn = this.querySelector("[data-swift-video-play-btn]");
      if (this.playBtn && this.video) {
        this.video.onloadeddata = () => this.playBtn.style.visibility = "visible";
        this.playBtn.addEventListener("click", () => this.playing = !this.playing);
      }
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
      } catch {
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
