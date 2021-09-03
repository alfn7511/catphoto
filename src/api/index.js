function Api() {
  const api = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/'
  this.getList = async (nodeid) => {
    try {
      const res = await fetch(`${api}${nodeid ? nodeid : ''}`)
      if (!res.ok) throw new Error('server error')
      return await res.json()
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

export default Api
