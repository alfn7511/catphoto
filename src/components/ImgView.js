function ImgView({ $app, initialState }) {
  const img_url = `https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public`
  this.state = initialState
  this.$target = document.createElement('div')
  this.$target.className = 'Modal ImageViewer'
  $app.appendChild(this.$target)
  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }
  this.onClick = (e) => {
    const $img = this.$target.querySelector('img')
    // console.log(e.target, $img.contains(e.target))
    if (!$img.contains(e.target)) this.setState()
  }
  this.render = () => {
    this.$target.innerHTML = this.state ? `<div class="content"><img src="${img_url}${this.state}"></div>` : ''
    if (this.state) {
      this.$target.addEventListener('click', this.onClick)
    } else {
      this.$target.removeEventListener('click', this.onClick)
    }
    this.$target.style.display = this.state ? 'block' : 'none'
  }
}

export default ImgView
