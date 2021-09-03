import Api from './api/index.js'
import Breadcrumb from './components/Breadcrumb.js'
import Nodes from './components/Nodes.js'
import Loading from './components/Loading.js'
import ImgView from './components/ImgView.js'

function App($app) {
  this.state = {
    isRoot: true,
    nodes: [],
    depth: [],
  }
  const api = new Api()
  const loading = new Loading({ $app, initialState: false })
  const imgview = new ImgView({ $app, initialState: '' })
  const breadcrumb = new Breadcrumb({ $app, initialState: this.state.depth })
  const nodes = new Nodes({
    $app,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: async (node) => {
      if (node.type === 'DIRECTORY') {
        try {
          loading.setState(true)
          const nextNodes = await api.getList(node.id)
          this.setState({
            ...this.state,
            nodes: nextNodes,
            depth: [...this.state.depth, node],
            isLoading: false,
            isRoot: false,
            selectedFilePath: '',
          })
        } catch (error) {
          throw new Error(error)
        }
      } else {
        // FILE 이미지 보기 처리
        this.setState({
          ...this.state,
          selectedFilePath: node.filePath,
        })
      }
    },
    onBackClick: async () => {
      const nextState = { ...this.state }
      nextState.depth.pop()
      const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length - 1].id
      console.log('nextState', nextState)
      console.log('prevNodeId', prevNodeId)
      loading.setState(true)
      if (prevNodeId === null) {
        const rootNodes = await api.getList()
        this.setState({
          ...nextState,
          isRoot: true,
          nodes: rootNodes,
          isLoading: false,
          selectedFilePath: '',
        })
      } else {
        const prevNodes = await api.getList(prevNodeId)
        this.setState({
          ...nextState,
          isRoot: false,
          nodes: prevNodes,
          isLoading: false,
          selectedFilePath: '',
        })
      }
    },
  })

  this.setState = (nextState) => {
    this.state = nextState
    console.log('this.state', this.state)
    nodes.setState({ isRoot: this.state.isRoot, nodes: this.state.nodes })
    breadcrumb.setState(this.state.depth)
    imgview.setState(this.state.selectedFilePath)
    loading.setState(false)
  }

  const init = async () => {
    try {
      loading.setState(true)
      const rootNodes = await api.getList()
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
        isLoading: false,
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  init()
}

export default App
